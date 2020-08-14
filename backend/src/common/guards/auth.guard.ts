import {
  applyDecorators, SetMetadata, UseGuards,
} from '@nestjs/common';
import { RolesGuard } from './roles.guard';
import { JwtAuthGuard } from '../../modules/auth/jwt-auth.guard';
import {Role } from '@prisma/client'

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
}
