import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  HttpCode,
  HttpStatus,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ThrottlerGuard } from '@nestjs/throttler';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import {
  AuthenticatedUser,
  RequestWithUser,
} from './interfaces/request-with-user.interface';
import { RefreshTokenPayload } from './strategies/jwt-refresh.strategy';
import { Request } from 'express';

interface RequestWithRefreshUser extends Request {
  user: RefreshTokenPayload;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ──────────────────────────────────────────────────────────────────────────
  // POST /auth/register
  // ──────────────────────────────────────────────────────────────────────────

  @Post('register')
  @UseGuards(ThrottlerGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new student account' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'Account created successfully' })
  @ApiResponse({ status: 409, description: 'Email or phone already in use' })
  @ApiResponse({ status: 422, description: 'Validation failed' })
  async register(@Body() dto: RegisterDto, @Req() req: Request) {
    const ipAddress = req.ip ?? req.socket.remoteAddress;
    const result = await this.authService.register(dto, ipAddress);
    return { message: 'Account created successfully', data: result };
  }

  // ──────────────────────────────────────────────────────────────────────────
  // POST /auth/login
  // ──────────────────────────────────────────────────────────────────────────

  @Post('login')
  @UseGuards(ThrottlerGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate and receive JWT tokens' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() dto: LoginDto, @Req() req: Request) {
    const ipAddress = req.ip ?? req.socket.remoteAddress;
    const result = await this.authService.login(dto, ipAddress);
    return { message: 'Login successful', data: result };
  }

  // ──────────────────────────────────────────────────────────────────────────
  // POST /auth/refresh
  // ──────────────────────────────────────────────────────────────────────────

  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rotate refresh token and get a new access token' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({ status: 200, description: 'Tokens refreshed successfully' })
  @ApiResponse({ status: 401, description: 'Invalid or expired refresh token' })
  async refresh(
    @Req() req: RequestWithRefreshUser,
    @Body() dto: RefreshTokenDto,
  ) {
    const ipAddress = req.ip ?? req.socket.remoteAddress;
    const tokens = await this.authService.refresh(
      req.user,
      dto.refreshToken,
      ipAddress,
    );
    return { message: 'Tokens refreshed successfully', data: tokens };
  }

  // ──────────────────────────────────────────────────────────────────────────
  // POST /auth/logout
  // ──────────────────────────────────────────────────────────────────────────

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Revoke refresh token and log out' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({ status: 200, description: 'Logged out successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async logout(
    @Req() req: RequestWithUser,
    @Body() dto: RefreshTokenDto,
  ) {
    await this.authService.logout(req.user.id, dto.refreshToken);
    return { message: 'Logged out successfully', data: null };
  }

  // ──────────────────────────────────────────────────────────────────────────
  // GET /auth/me
  // ──────────────────────────────────────────────────────────────────────────

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get the authenticated user\'s full profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getMe(@Req() req: RequestWithUser) {
    const data = await this.authService.getMe(req.user.id);
    return { message: 'Profile retrieved successfully', data };
  }
}
