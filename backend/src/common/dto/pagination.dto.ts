import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'Page number (1-indexed)',
    minimum: 1,
    default: 1,
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    minimum: 1,
    maximum: 100,
    default: 20,
    example: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 20;

  @ApiPropertyOptional({
    description: 'Search query string',
    example: 'IELTS reading',
  })
  @IsOptional()
  @IsString()
  search?: string;

  /** Zero-based offset computed from page & limit */
  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export function paginate<T>(
  items: T[],
  total: number,
  dto: PaginationDto,
): PaginatedResult<T> {
  const totalPages = Math.ceil(total / dto.limit);
  return {
    items,
    total,
    page: dto.page,
    limit: dto.limit,
    totalPages,
    hasNextPage: dto.page < totalPages,
    hasPrevPage: dto.page > 1,
  };
}
