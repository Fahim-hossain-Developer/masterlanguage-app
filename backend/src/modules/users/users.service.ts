import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // ──────────────────────────────────────────────────────────────────────────
  // GET PROFILE
  // ──────────────────────────────────────────────────────────────────────────

  async getProfile(userId: string) {
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
        profile: true,
        subscription: {
          select: {
            status: true,
            startsAt: true,
            expiresAt: true,
            autoRenew: true,
            plan: {
              select: {
                name: true,
                slug: true,
                features: true,
              },
            },
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
  // UPDATE PROFILE
  // ──────────────────────────────────────────────────────────────────────────

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    // Ensure user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { name, avatarUrl, bio, targetTrack, currentCEFR, targetBand, examDate, nationality, timezone, nativeLanguage, studyGoalMinutesPerDay } = dto;

    const updatedProfile = await this.prisma.profile.upsert({
      where: { userId },
      update: {
        ...(name !== undefined && { name }),
        ...(avatarUrl !== undefined && { avatarUrl }),
        ...(bio !== undefined && { bio }),
        ...(targetTrack !== undefined && { targetTrack }),
        ...(currentCEFR !== undefined && { currentCEFR }),
        ...(targetBand !== undefined && { targetBand }),
        ...(examDate !== undefined && { examDate: new Date(examDate) }),
        ...(nationality !== undefined && { nationality }),
        ...(timezone !== undefined && { timezone }),
        ...(nativeLanguage !== undefined && { nativeLanguage }),
        ...(studyGoalMinutesPerDay !== undefined && { studyGoalMinutesPerDay }),
      },
      create: {
        userId,
        name: name ?? 'User',
        avatarUrl,
        bio,
        targetTrack,
        currentCEFR,
        targetBand,
        examDate: examDate ? new Date(examDate) : undefined,
        nationality,
        timezone: timezone ?? 'Asia/Dhaka',
        nativeLanguage,
        studyGoalMinutesPerDay: studyGoalMinutesPerDay ?? 30,
      },
    });

    return updatedProfile;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // DASHBOARD STATS
  // ──────────────────────────────────────────────────────────────────────────

  async getDashboardStats(userId: string) {
    const [
      user,
      totalTestAttempts,
      completedLessons,
      streak,
      totalXP,
      recentAttempts,
      unreadNotifications,
      srsCardsDue,
    ] = await Promise.all([
      this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          profile: {
            select: {
              name: true,
              avatarUrl: true,
              targetTrack: true,
              targetBand: true,
              currentCEFR: true,
              examDate: true,
              studyGoalMinutesPerDay: true,
            },
          },
          subscription: {
            select: {
              status: true,
              expiresAt: true,
              plan: { select: { name: true } },
            },
          },
        },
      }),
      this.prisma.testAttempt.count({ where: { userId } }),
      this.prisma.lessonProgress.count({ where: { userId, isCompleted: true } }),
      this.prisma.studyStreak.findUnique({
        where: { userId },
        select: { currentStreak: true, longestStreak: true, lastStudyDate: true },
      }),
      this.prisma.xPLedger.aggregate({
        where: { userId },
        _sum: { amount: true },
      }),
      this.prisma.testAttempt.findMany({
        where: { userId },
        orderBy: { startedAt: 'desc' },
        take: 5,
        select: {
          id: true,
          status: true,
          bandScore: true,
          startedAt: true,
          submittedAt: true,
          test: {
            select: { title: true, skill: true, trackType: true },
          },
        },
      }),
      this.prisma.notification.count({ where: { userId, isRead: false } }),
      this.prisma.sRSCard.count({
        where: { userId, dueAt: { lte: new Date() } },
      }),
    ]);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Compute latest band score
    const latestAttempt = recentAttempts.find((a) => a.bandScore !== null);

    return {
      user,
      stats: {
        totalTestAttempts,
        completedLessons,
        currentStreak: streak?.currentStreak ?? 0,
        longestStreak: streak?.longestStreak ?? 0,
        lastStudyDate: streak?.lastStudyDate ?? null,
        totalXP: totalXP._sum.amount ?? 0,
        latestBandScore: latestAttempt?.bandScore ?? null,
        unreadNotifications,
        srsCardsDue,
      },
      recentAttempts,
    };
  }
}
