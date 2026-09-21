import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtPayload } from '../interfaces/request-with-user.interface';
import * as bcrypt from 'bcryptjs';

export interface RefreshTokenPayload extends JwtPayload {
  refreshToken: string;
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload: JwtPayload,
  ): Promise<RefreshTokenPayload> {
    const body = req.body as { refreshToken?: string };
    const refreshToken = body.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not provided');
    }

    // Find active refresh tokens for this user
    const storedTokens = await this.prisma.refreshToken.findMany({
      where: {
        userId: payload.sub,
        isRevoked: false,
        expiresAt: { gt: new Date() },
      },
    });

    // Verify the provided token against stored hashes (token rotation security)
    let tokenMatch = false;
    for (const stored of storedTokens) {
      if (await bcrypt.compare(refreshToken, stored.tokenHash)) {
        tokenMatch = true;
        break;
      }
    }

    if (!tokenMatch) {
      // Possible token reuse — revoke all tokens for this user (breach detection)
      await this.prisma.refreshToken.updateMany({
        where: { userId: payload.sub },
        data: { isRevoked: true },
      });
      throw new UnauthorizedException(
        'Invalid refresh token. All sessions have been invalidated for security.',
      );
    }

    return { ...payload, refreshToken };
  }
}
