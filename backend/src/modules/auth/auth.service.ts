import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, Role } from '@prisma/client';
import { UserService } from '../user/user.service';
import { JwtPayloadInterface } from '../../common/interface/jwt-payload.interface';
import { CreateUserDto } from '../../common/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.user({ email });
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(payload: JwtPayloadInterface): { access_token: string } {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userData: CreateUserDto): Promise<User> {
    return this.userService.createUser({ ...userData, role: Role.user });
  }
}
