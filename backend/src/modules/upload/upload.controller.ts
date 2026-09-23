import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
  HttpCode,
  HttpStatus,
  ParseFilePipe,
  Version,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { memoryStorage } from 'multer';

import { UploadService, ALLOWED_IMAGE_TYPES, ALLOWED_AUDIO_TYPES, ALLOWED_VIDEO_TYPES } from './upload.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface';

const imageMemoryStorage = memoryStorage();
const audioMemoryStorage = memoryStorage();
const videoMemoryStorage = memoryStorage();

@ApiTags('Upload')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // ──────────────────────────────────────────────────────────────────────────
  // POST /upload/image
  // ──────────────────────────────────────────────────────────────────────────

  @Post('image')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: imageMemoryStorage,
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB guard at multer level
    }),
  )
  @ApiOperation({ summary: 'Upload an image (max 5 MB)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Image file (JPEG, PNG, WebP, GIF)',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Image uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Invalid file type or size' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async uploadImage(
    @UploadedFile(new ParseFilePipe({ fileIsRequired: true }))
    file: Express.Multer.File,
    @Req() req: RequestWithUser,
  ) {
    if (!(ALLOWED_IMAGE_TYPES as readonly string[]).includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid image type: ${file.mimetype}. Allowed: ${ALLOWED_IMAGE_TYPES.join(', ')}`,
      );
    }

    const data = await this.uploadService.uploadImage(file, req.user.id);
    return { message: 'Image uploaded successfully', data };
  }

  // ──────────────────────────────────────────────────────────────────────────
  // POST /upload/audio
  // ──────────────────────────────────────────────────────────────────────────

  @Post('audio')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: audioMemoryStorage,
      limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
    }),
  )
  @ApiOperation({ summary: 'Upload an audio file (max 50 MB)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Audio file (MP3, WAV, OGG, M4A, AAC)',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Audio uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Invalid file type or size' })
  async uploadAudio(
    @UploadedFile(new ParseFilePipe({ fileIsRequired: true }))
    file: Express.Multer.File,
    @Req() req: RequestWithUser,
  ) {
    if (!(ALLOWED_AUDIO_TYPES as readonly string[]).includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid audio type: ${file.mimetype}. Allowed: ${ALLOWED_AUDIO_TYPES.join(', ')}`,
      );
    }

    const data = await this.uploadService.uploadAudio(file, req.user.id);
    return { message: 'Audio uploaded successfully', data };
  }

  // ──────────────────────────────────────────────────────────────────────────
  // POST /upload/video
  // ──────────────────────────────────────────────────────────────────────────

  @Post('video')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: videoMemoryStorage,
      limits: { fileSize: 500 * 1024 * 1024 }, // 500 MB
    }),
  )
  @ApiOperation({ summary: 'Upload a video file (max 500 MB)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Video file (MP4, WebM, MOV, AVI)',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Video uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Invalid file type or size' })
  async uploadVideo(
    @UploadedFile(new ParseFilePipe({ fileIsRequired: true }))
    file: Express.Multer.File,
    @Req() req: RequestWithUser,
  ) {
    if (!(ALLOWED_VIDEO_TYPES as readonly string[]).includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid video type: ${file.mimetype}. Allowed: ${ALLOWED_VIDEO_TYPES.join(', ')}`,
      );
    }

    const data = await this.uploadService.uploadVideo(file, req.user.id);
    return { message: 'Video uploaded successfully', data };
  }
}
