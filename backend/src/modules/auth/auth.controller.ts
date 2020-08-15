import {
  Controller, Get, Request, Post, UseGuards, Body, ForbiddenException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../../common/dto/create-user.dto';
import { LoginResponseDto } from '../../common/dto/response/login-response.dto';
import { AuthUserDto } from '../../common/dto/auth-user.dto';
import { ProfileResponseDto } from '../../common/dto/response/profile-response.dto';
import { AuthUser } from '../../common/decorators/auth-user.decorator';

@ApiTags('User')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Log in a user.' })
  @ApiBearerAuth()
  @ApiBody({ type: [CreateUserDto] })
  @ApiCreatedResponse({ description: 'Successfully logged in.', type: LoginResponseDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<LoginResponseDto> {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Register a new user.' })
  @ApiCreatedResponse({ description: 'User has been successfully created.', type: String })
  @ApiForbiddenResponse({ description: 'Email already exists.' })
  @Post('register')
  async register(
    @Body() userData: CreateUserDto,
  ): Promise<string> {
    return this.authService.register(userData)
      .then(() => 'User has been successfully created')
      .catch(() => {
        throw new ForbiddenException('Email already exists');
      });
  }

  @ApiOperation({ summary: 'Get user\'s profile.' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: ProfileResponseDto })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  // eslint-disable-next-line class-methods-use-this
  profile(@AuthUser() { id, email, role }: AuthUserDto): ProfileResponseDto {
    return { id, email, role };
  }
}
