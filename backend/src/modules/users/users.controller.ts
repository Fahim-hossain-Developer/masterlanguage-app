import {
  Controller,
  Get,
  Patch,
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
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('users')
@Version('1')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ──────────────────────────────────────────────────────────────────────────
  // GET /users/profile
  // ──────────────────────────────────────────────────────────────────────────

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get authenticated user\'s full profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@Req() req: RequestWithUser) {
    const data = await this.usersService.getProfile(req.user.id);
    return { message: 'Profile retrieved successfully', data };
  }

  // ──────────────────────────────────────────────────────────────────────────
  // PATCH /users/profile
  // ──────────────────────────────────────────────────────────────────────────

  @Patch('profile')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update authenticated user\'s profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateProfile(
    @Req() req: RequestWithUser,
    @Body() dto: UpdateProfileDto,
  ) {
    const data = await this.usersService.updateProfile(req.user.id, dto);
    return { message: 'Profile updated successfully', data };
  }

  // ──────────────────────────────────────────────────────────────────────────
  // GET /users/dashboard-stats
  // ──────────────────────────────────────────────────────────────────────────

  @Get('dashboard-stats')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get dashboard statistics',
    description:
      'Returns aggregated stats: XP, streaks, test attempts, SRS cards due, notifications, and recent activity',
  })
  @ApiResponse({ status: 200, description: 'Dashboard stats retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getDashboardStats(@Req() req: RequestWithUser) {
    const data = await this.usersService.getDashboardStats(req.user.id);
    return { message: 'Dashboard stats retrieved successfully', data };
  }
}
