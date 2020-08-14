import {
  Controller, Get, Request, Post, UseGuards, Body, ForbiddenException,
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiBody, ApiResponse, ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../../common/dto/create-user.dto';

@ApiTags('User')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBearerAuth()
  @ApiBody({ type: [CreateUserDto] })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiResponse({
    description: 'Register a new user.',
    type: 'stringsrc/modules/codesource/code-source.service.ts',
  })
  @ApiResponse({
    description: 'Forbidden. Email already exists.',
    status: 403,
  })
  async register(
    @Body() userData: CreateUserDto,
  ): Promise<string> {
    return this.authService.register(userData)
      .then(() => 'User created')
      .catch(() => {
        throw new ForbiddenException('Email already exists');
      });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  // eslint-disable-next-line class-methods-use-this
  profile(@Request() req) {
    return req.user;
  }
}
