import { Request } from 'express';
import { Role, UserStatus } from '@prisma/client';

export interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: Role;
  status: UserStatus;
}

export interface RequestWithUser extends Request {
  user: AuthenticatedUser;
}
