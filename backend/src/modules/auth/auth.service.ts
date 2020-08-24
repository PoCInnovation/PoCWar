import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../../common/dto/create-user.dto';
import { AuthUserDto } from '../../common/dto/auth-user.dto';
import { LoginResponseDto } from '../../common/dto/response/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<AuthUserDto> {
    const user: AuthUserDto = await this.userService.user({ email });
    if (user && await bcrypt.compare(pass, user.password)) {
      return user;
    }
    return null;
  }

  login(payload: AuthUserDto): LoginResponseDto {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userData: CreateUserDto): Promise<User> {
    return this.userService.createUser(userData);
  }
}
