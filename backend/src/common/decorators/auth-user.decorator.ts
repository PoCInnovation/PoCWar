import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUserInterface } from '../interface/auth-user.interface';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return <AuthUserInterface>request.user;
  },
);
