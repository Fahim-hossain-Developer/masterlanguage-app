import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ExamType } from '@prisma/client';

export class RegisterDto {
  @ApiProperty({ example: 'Fahim Hossain', description: 'Full name' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'fahim@masterlanguage.io' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Str0ng@Pass!',
    description:
      'Min 8 chars, at least one uppercase, one lowercase, one number, one special char',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#\-_+=])[A-Za-z\d@$!%*?&^#\-_+=]{8,}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  )
  password: string;

  @ApiPropertyOptional({ example: '+8801712345678' })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiPropertyOptional({
    enum: ExamType,
    example: ExamType.IELTS_ACADEMIC,
    description: 'Target exam the student is preparing for',
  })
  @IsOptional()
  @IsEnum(ExamType)
  targetExam?: ExamType;
}
