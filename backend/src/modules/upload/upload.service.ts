import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as crypto from 'crypto';
import * as path from 'path';

// ──────────────────────────────────────────────────────────────────────────────
// Constants
// ──────────────────────────────────────────────────────────────────────────────

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
] as const;

export const ALLOWED_AUDIO_TYPES = [
  'audio/mpeg',
  'audio/mp3',
  'audio/wav',
  'audio/ogg',
  'audio/webm',
  'audio/m4a',
  'audio/aac',
] as const;

export const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'video/x-msvideo',
] as const;

export const FILE_SIZE_LIMITS = {
  image: 5 * 1024 * 1024,   // 5 MB
  audio: 50 * 1024 * 1024,  // 50 MB
  video: 500 * 1024 * 1024, // 500 MB
} as const;

type UploadCategory = 'image' | 'audio' | 'video';

export interface UploadResult {
  key: string;
  url: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  bucket: string;
}

export interface PresignedUrlResult {
  uploadUrl: string;
  key: string;
  expiresIn: number;
}

// ──────────────────────────────────────────────────────────────────────────────
// Service
// ──────────────────────────────────────────────────────────────────────────────

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);
  private readonly s3Client: S3Client;
  private readonly bucket: string;
  private readonly region: string;

  constructor(private readonly config: ConfigService) {
    this.region = this.config.getOrThrow<string>('AWS_REGION');
    this.bucket = this.config.getOrThrow<string>('AWS_S3_BUCKET');

    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.config.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.config.getOrThrow<string>('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  // ──────────────────────────────────────────────────────────────────────────
  // PUBLIC: Upload Image
  // ──────────────────────────────────────────────────────────────────────────

  async uploadImage(
    file: Express.Multer.File,
    userId: string,
  ): Promise<UploadResult> {
    this.validateFile(file, 'image', ALLOWED_IMAGE_TYPES as unknown as string[]);
    return this.uploadToS3(file, userId, 'images');
  }

  // ──────────────────────────────────────────────────────────────────────────
  // PUBLIC: Upload Audio
  // ──────────────────────────────────────────────────────────────────────────

  async uploadAudio(
    file: Express.Multer.File,
    userId: string,
  ): Promise<UploadResult> {
    this.validateFile(file, 'audio', ALLOWED_AUDIO_TYPES as unknown as string[]);
    return this.uploadToS3(file, userId, 'audio');
  }

  // ──────────────────────────────────────────────────────────────────────────
  // PUBLIC: Upload Video
  // ──────────────────────────────────────────────────────────────────────────

  async uploadVideo(
    file: Express.Multer.File,
    userId: string,
  ): Promise<UploadResult> {
    this.validateFile(file, 'video', ALLOWED_VIDEO_TYPES as unknown as string[]);
    return this.uploadToS3(file, userId, 'videos');
  }

  // ──────────────────────────────────────────────────────────────────────────
  // PUBLIC: Generate Presigned Upload URL (for large files / client-side upload)
  // ──────────────────────────────────────────────────────────────────────────

  async generatePresignedUploadUrl(
    fileName: string,
    mimeType: string,
    folder: string,
    userId: string,
    expiresInSeconds: number = 300,
  ): Promise<PresignedUrlResult> {
    const key = this.buildKey(folder, userId, fileName);

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: mimeType,
    });

    try {
      const uploadUrl = await getSignedUrl(this.s3Client, command, {
        expiresIn: expiresInSeconds,
      });

      return { uploadUrl, key, expiresIn: expiresInSeconds };
    } catch (err) {
      this.logger.error('Failed to generate presigned URL', err);
      throw new InternalServerErrorException(
        'Failed to generate upload URL. Please try again.',
      );
    }
  }

  // ──────────────────────────────────────────────────────────────────────────
  // PUBLIC: Generate Presigned Download URL
  // ──────────────────────────────────────────────────────────────────────────

  async generatePresignedDownloadUrl(
    key: string,
    expiresInSeconds: number = 3600,
  ): Promise<string> {
    const command = new GetObjectCommand({ Bucket: this.bucket, Key: key });

    try {
      return await getSignedUrl(this.s3Client, command, {
        expiresIn: expiresInSeconds,
      });
    } catch (err) {
      this.logger.error('Failed to generate presigned download URL', err);
      throw new InternalServerErrorException('Failed to generate download URL');
    }
  }

  // ──────────────────────────────────────────────────────────────────────────
  // PUBLIC: Delete Object
  // ──────────────────────────────────────────────────────────────────────────

  async deleteObject(key: string): Promise<void> {
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({ Bucket: this.bucket, Key: key }),
      );
      this.logger.log(`Deleted S3 object: ${key}`);
    } catch (err) {
      this.logger.error(`Failed to delete S3 object: ${key}`, err);
      throw new InternalServerErrorException('Failed to delete file');
    }
  }

  // ──────────────────────────────────────────────────────────────────────────
  // PRIVATE: Core upload logic
  // ──────────────────────────────────────────────────────────────────────────

  private async uploadToS3(
    file: Express.Multer.File,
    userId: string,
    folder: string,
  ): Promise<UploadResult> {
    const key = this.buildKey(folder, userId, file.originalname);

    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
          ContentLength: file.size,
          Metadata: {
            uploadedBy: userId,
            originalName: encodeURIComponent(file.originalname),
          },
        }),
      );

      const url = `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;

      this.logger.log(`Uploaded file: ${key} (${file.size} bytes)`);

      return {
        key,
        url,
        fileName: file.originalname,
        mimeType: file.mimetype,
        sizeBytes: file.size,
        bucket: this.bucket,
      };
    } catch (err) {
      this.logger.error(`S3 upload failed for key: ${key}`, err);
      throw new InternalServerErrorException(
        'File upload failed. Please try again.',
      );
    }
  }

  // ──────────────────────────────────────────────────────────────────────────
  // PRIVATE: Validation
  // ──────────────────────────────────────────────────────────────────────────

  private validateFile(
    file: Express.Multer.File,
    category: UploadCategory,
    allowedTypes: string[],
  ): void {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type: ${file.mimetype}. Allowed types: ${allowedTypes.join(', ')}`,
      );
    }

    const sizeLimit = FILE_SIZE_LIMITS[category];
    if (file.size > sizeLimit) {
      const limitMB = Math.round(sizeLimit / 1024 / 1024);
      throw new BadRequestException(
        `File too large. Maximum allowed size for ${category} is ${limitMB}MB`,
      );
    }
  }

  // ──────────────────────────────────────────────────────────────────────────
  // PRIVATE: Key builder
  // ──────────────────────────────────────────────────────────────────────────

  private buildKey(folder: string, userId: string, originalName: string): string {
    const ext = path.extname(originalName).toLowerCase();
    const uniqueId = crypto.randomBytes(16).toString('hex');
    const timestamp = Date.now();
    return `${folder}/${userId}/${timestamp}-${uniqueId}${ext}`;
  }
}
