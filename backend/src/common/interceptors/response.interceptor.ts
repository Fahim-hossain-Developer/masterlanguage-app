import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';

export interface StandardResponse<T> {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
  path: string;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, StandardResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<StandardResponse<T>> {
    const request = context.switchToHttp().getRequest<Request>();

    return next.handle().pipe(
      map((data) => {
        // Allow handlers to return an already-wrapped response
        if (data && typeof data === 'object' && 'success' in data) {
          return data as unknown as StandardResponse<T>;
        }

        // Extract optional message if the handler returns { message, data }
        let message = 'Request successful';
        let responseData: T = data;

        if (
          data &&
          typeof data === 'object' &&
          'message' in data &&
          'data' in data
        ) {
          const typed = data as { message: string; data: T };
          message = typed.message ?? message;
          responseData = typed.data;
        }

        return {
          success: true,
          data: responseData,
          message,
          timestamp: new Date().toISOString(),
          path: request.url,
        };
      }),
    );
  }
}
