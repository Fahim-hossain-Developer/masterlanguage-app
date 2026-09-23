import {
  IsEnum,
  IsISO8601,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { TrackType, CEFRLevel } from '@prisma/client';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Fahim Hossain' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/avatar.jpg' })
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;

  @ApiPropertyOptional({ example: 'IELTS aspirant, targeting 8.0 band.' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  bio?: string;

  @ApiPropertyOptional({ enum: TrackType, example: TrackType.IELTS_ACADEMIC })
  @IsOptional()
  @IsEnum(TrackType)
  targetTrack?: TrackType;

  @ApiPropertyOptional({ enum: CEFRLevel, example: CEFRLevel.B1 })
  @IsOptional()
  @IsEnum(CEFRLevel)
  currentCEFR?: CEFRLevel;

  @ApiPropertyOptional({ example: 7.5, description: 'Target IELTS band score' })
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  @Max(9)
  targetBand?: number;

  @ApiPropertyOptional({ example: '2025-06-15', description: 'Target exam date (ISO 8601)' })
  @IsOptional()
  @IsISO8601()
  examDate?: string;

  @ApiPropertyOptional({ example: 'Bangladesh' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nationality?: string;

  @ApiPropertyOptional({ example: 'Asia/Dhaka' })
  @IsOptional()
  @IsString()
  timezone?: string;

  @ApiPropertyOptional({ example: 'Bengali' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  nativeLanguage?: string;

  @ApiPropertyOptional({ example: 60, description: 'Daily study goal in minutes' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(5)
  @Max(480)
  studyGoalMinutesPerDay?: number;
}
