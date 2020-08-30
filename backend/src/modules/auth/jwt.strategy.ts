import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthUserDto } from '../../common/dto/auth-user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: AuthUserDto): Promise<AuthUserDto> {
    try {
      const user = await this.userService.user({ id: payload.id });
      if (user
        && user.email === payload.email
        && user.password === payload.password
        && user.role === payload.role
      ) {
        return payload;
      }
    } catch (e) {
      throw new UnauthorizedException();
    }
    throw new UnauthorizedException();
  }
}
