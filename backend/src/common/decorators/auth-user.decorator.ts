import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUserDto } from '../dto/auth-user.dto';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthUserDto => ctx.switchToHttp().getRequest().user,
);
