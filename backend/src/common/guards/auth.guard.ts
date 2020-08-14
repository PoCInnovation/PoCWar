import {
  applyDecorators, SetMetadata, UseGuards,
} from '@nestjs/common';
import { RolesGuard } from './roles.guard';
import { JwtAuthGuard } from '../../modules/auth/jwt-auth.guard';
import { RoleType } from '../constants/role-type';

export function Auth(...roles: RoleType[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
}