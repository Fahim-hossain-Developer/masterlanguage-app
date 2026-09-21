import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const ROLES_KEY = 'roles';

/**
 * Decorator to restrict an endpoint to specific roles.
 * Usage: @Roles(Role.ADMIN, Role.TEACHER)
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
