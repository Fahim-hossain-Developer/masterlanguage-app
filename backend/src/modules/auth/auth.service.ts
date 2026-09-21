import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/request-with-user.interface';
import { RefreshTokenPayload } from './strategies/jwt-refresh.strategy';
import { Role, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    role: Role;
    status: UserStatus;
    profile: {
      name: string;
      avatarUrl: string | null;
      targetExam: string | null;
    } | null;
  };
  tokens: AuthTokens;
}

const BCRYPT_ROUNDS = 12;

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  // ──────────────────────────────────────────────────────────────────────────
  // REGISTER
  // ──────────────────────────────────────────────────────────────────────────

  async register(dto: RegisterDto, ipAddress?: string): Promise<LoginResponse> {
    // 1. Check for existing email
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (existingUser) {
      throw new ConflictException('An account with this email already exists');
    }

    // 2. Check phone uniqueness if provided
    if (dto.phone) {
      const existingPhone = await this.prisma.user.findUnique({
        where: { phone: dto.phone },
      });
      if (existingPhone) {
        throw new ConflictException(
          'An account with this phone number already exists',
        );
      }
    }

    // 3. Hash password
    const passwordHash = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);

    // 4. Create user + profile in a transaction
    const user = await this.prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email: dto.email.toLowerCase(),
          phone: dto.phone ?? null,
          passwordHash,
          role: Role.STUDENT,
          status: UserStatus.PENDING_VERIFICATION,
          profile: {
            create: {
              name: dto.name,
              targetExam: dto.targetExam ?? null,
            },
          },
        },
        include: { profile: true },
      });

      // Audit log
      await tx.auditLog.create({
        data: {
          userId: newUser.id,
          action: 'USER_REGISTERED',
          resource: 'users',
          resourceId: newUser.id,
          ipAddress,
        },
      });

      return newUser;
    });

    this.logger.log(`New user registered: ${user.email}`);

    // 5. Issue tokens
    const tokens = await this.issueTokens(user.id, user.email, user.role, ipAddress);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status,
        profile: user.profile
          ? {
              name: user.profile.name,
              avatarUrl: user.profile.avatarUrl,
              targetExam: user.profile.targetExam,
            }
          : null,
      },
      tokens,
    };
  }

  // ──────────────────────────────────────────────────────────────────────────
  // LOGIN
  // ──────────────────────────────────────────────────────────────────────────

  async login(dto: LoginDto, ipAddress?: string): Promise<LoginResponse> {
    // 1. Find user
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
      include: {
        profile: {
          select: { name: true, avatarUrl: true, targetExam: true },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 2. Check account status
    if (user.status === UserStatus.BANNED) {
      throw new UnauthorizedException(
        'Your account has been banned. Please contact support.',
      );
    }

    // 3. Verify password
    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 4. Issue tokens
    const tokens = await this.issueTokens(user.id, user.email, user.role, ipAddress);

    // 5. Audit log
    await this.prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'USER_LOGIN',
        resource: 'auth',
        ipAddress,
      },
    });

    this.logger.log(`User logged in: ${user.email}`);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status,
        profile: user.profile
          ? {
              name: user.profile.name,
              avatarUrl: user.profile.avatarUrl,
              targetExam: user.profile.targetExam,
            }
          : null,
      },
      tokens,
    };
  }

  // ──────────────────────────────────────────────────────────────────────────
  // REFRESH TOKEN ROTATION
  // ──────────────────────────────────────────────────────────────────────────

  async refresh(
    payload: RefreshTokenPayload,
    incomingRefreshToken: string,
    ipAddress?: string,
  ): Promise<AuthTokens> {
    // 1. Find and revoke the used refresh token
    const storedTokens = await this.prisma.refreshToken.findMany({
      where: {
        userId: payload.sub,
        isRevoked: false,
        expiresAt: { gt: new Date() },
      },
    });

    let usedTokenId: string | null = null;

    for (const stored of storedTokens) {
      if (await bcrypt.compare(incomingRefreshToken, stored.tokenHash)) {
        usedTokenId = stored.id;
        break;
      }
    }

    if (!usedTokenId) {
      throw new UnauthorizedException('Refresh token is invalid or expired');
    }

    // 2. Revoke the used token (rotation)
    await this.prisma.refreshToken.update({
      where: { id: usedTokenId },
      data: { isRevoked: true },
    });

    // 3. Verify user still exists and is active
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, role: true, status: true },
    });

    if (!user || user.status === UserStatus.BANNED || user.status === UserStatus.INACTIVE) {
      throw new UnauthorizedException('Account is no longer active');
    }

    // 4. Issue new tokens
    return this.issueTokens(user.id, user.email, user.role, ipAddress);
  }

  // ──────────────────────────────────────────────────────────────────────────
  // LOGOUT
  // ──────────────────────────────────────────────────────────────────────────

  async logout(userId: string, refreshToken: string): Promise<void> {
    // Find and revoke the specific refresh token
    const storedTokens = await this.prisma.refreshToken.findMany({
      where: { userId, isRevoked: false },
    });

    for (const stored of storedTokens) {
      if (await bcrypt.compare(refreshToken, stored.tokenHash)) {
        await this.prisma.refreshToken.update({
          where: { id: stored.id },
          data: { isRevoked: true },
        });
        break;
      }
    }

    await this.prisma.auditLog.create({
      data: {
        userId,
        action: 'USER_LOGOUT',
        resource: 'auth',
      },
    });
  }

  // ──────────────────────────────────────────────────────────────────────────
  // GET ME
  // ──────────────────────────────────────────────────────────────────────────

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        emailVerifiedAt: true,
        createdAt: true,
        profile: {
          select: {
            name: true,
            avatarUrl: true,
            bio: true,
            targetExam: true,
            targetScore: true,
            examDate: true,
            nationality: true,
            timezone: true,
            nativeLanguage: true,
            studyGoalMinutesPerDay: true,
          },
        },
        subscription: {
          select: {
            status: true,
            expiresAt: true,
            plan: { select: { name: true, slug: true } },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // PRIVATE HELPERS
  // ──────────────────────────────────────────────────────────────────────────

  private async issueTokens(
    userId: string,
    email: string,
    role: Role,
    ipAddress?: string,
  ): Promise<AuthTokens> {
    const payload: JwtPayload = { sub: userId, email, role };

    const jwtExpiresIn = this.config.getOrThrow<string>('JWT_EXPIRES_IN');
    const refreshExpiresIn = this.config.getOrThrow<string>('JWT_REFRESH_EXPIRES_IN');

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.config.getOrThrow<string>('JWT_SECRET'),
        expiresIn: jwtExpiresIn,
      }),
      // Generate a cryptographically secure random refresh token
      Promise.resolve(crypto.randomBytes(64).toString('hex')),
    ]);

    // Hash the refresh token before storing
    const tokenHash = await bcrypt.hash(refreshToken, BCRYPT_ROUNDS);
    const expiresAt = this.parseExpiry(refreshExpiresIn);

    await this.prisma.refreshToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
        ipAddress,
      },
    });

    return { accessToken, refreshToken, expiresIn: jwtExpiresIn };
  }

  private parseExpiry(expiry: string): Date {
    const now = new Date();
    const match = /^(\d+)([smhd])$/.exec(expiry);

    if (!match) {
      throw new BadRequestException(`Invalid expiry format: ${expiry}`);
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
      case 's':
        now.setSeconds(now.getSeconds() + value);
        break;
      case 'm':
        now.setMinutes(now.getMinutes() + value);
        break;
      case 'h':
        now.setHours(now.getHours() + value);
        break;
      case 'd':
        now.setDate(now.getDate() + value);
        break;
    }

    return now;
  }
}
