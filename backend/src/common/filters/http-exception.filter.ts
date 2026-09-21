import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

interface ErrorResponse {
  success: false;
  statusCode: number;
  message: string | string[];
  error: string;
  timestamp: string;
  path: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';
    let error = 'Internal Server Error';

    // ── Handle NestJS HttpExceptions ─────────────────────────────────────
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const resp = exceptionResponse as Record<string, unknown>;
        message = (resp['message'] as string | string[]) ?? exception.message;
        error = (resp['error'] as string) ?? exception.name;
      }
    }

    // ── Handle Prisma Known Request Errors ───────────────────────────────
    else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002': {
          // Unique constraint violation
          statusCode = HttpStatus.CONFLICT;
          const fields = (
            (exception.meta as Record<string, unknown>)?.target as string[]
          )?.join(', ');
          message = `A record with this ${fields ?? 'field'} already exists`;
          error = 'Conflict';
          break;
        }
        case 'P2025':
          statusCode = HttpStatus.NOT_FOUND;
          message = 'The requested record was not found';
          error = 'Not Found';
          break;
        case 'P2003':
          statusCode = HttpStatus.BAD_REQUEST;
          message = 'Foreign key constraint violation';
          error = 'Bad Request';
          break;
        default:
          statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          message = 'A database error occurred';
          error = 'Database Error';
      }
    }

    // ── Handle Prisma Validation Errors ──────────────────────────────────
    else if (exception instanceof Prisma.PrismaClientValidationError) {
      statusCode = HttpStatus.BAD_REQUEST;
      message = 'Invalid data provided to the database';
      error = 'Validation Error';
    }

    // ── Log unexpected errors ────────────────────────────────────────────
    if (statusCode >= 500) {
      this.logger.error(
        `[${request.method}] ${request.url} — ${statusCode}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    } else {
      this.logger.warn(
        `[${request.method}] ${request.url} — ${statusCode}: ${JSON.stringify(message)}`,
      );
    }

    const errorResponse: ErrorResponse = {
      success: false,
      statusCode,
      message,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(statusCode).json(errorResponse);
  }
}
