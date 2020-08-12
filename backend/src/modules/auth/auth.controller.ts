import {
  Controller, Get, Request, Post, UseGuards, Body,
} from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../../dto/create-user.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(
    @Body() userData: CreateUserDto,
  ): Promise<string> {
    return this.authService.register(userData)
      .then(() => 'User created')
      .catch((err) => {
        console.log(err);
        return 'Email is already taken';
      });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Request() req) {
    return req.user;
  }
}
