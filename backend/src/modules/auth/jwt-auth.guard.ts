import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('optional-jwt') {
  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  handleRequest(err, user, info) {
    return user;
  }
}
