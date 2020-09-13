import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { AdminService } from '../admin/admin.service';
import { CreateUserDto } from '../../common/dto/create-user.dto';
import { AuthUserDto } from '../../common/dto/auth-user.dto';
import { LoginResponseDto } from '../../common/dto/response/login-response.dto';
import { ProfileResponseDto } from '../../common/dto/response/profile-response.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PatchUserDto } from '../../common/dto/patch-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: AdminService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(email: string, pass: string): Promise<AuthUserDto> {
    const user: AuthUserDto = await this.userService.user({ email });
    if (user && await bcrypt.compare(pass, user.password)) {
      return user;
    }
    return null;
  }

  login(payload: AuthUserDto): LoginResponseDto {
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(userData: CreateUserDto): Promise<User> {
    return this.userService.createUser(userData);
  }

  async deleteUser(userId: string): Promise<User> {
    return this.userService.deleteUser({ id: userId });
  }

  async getProfile(userId: string): Promise<ProfileResponseDto> {
    const [{ codeSources, ...user }] = await this.prisma.user.findMany({
      select: {
        name: true,
        email: true,
        role: true,
        codeSources: {
          where: { authorId: userId },
          select: {
            challenge: {
              select: {
                name: true,
                slug: true,
              },
            },
            passAllTests: true,
          },
        },
      },
      where: { id: userId },
      take: 1,
    });
    return {
      ...user,
      challenges: codeSources.map((codeSource) => ({
        name: codeSource.challenge.name,
        slug: codeSource.challenge.slug,
        solved: codeSource.passAllTests,
      })),
    };
  }

  async patchProfile(
    userId: string, encryptedUserPassword: string, user: PatchUserDto,
  ): Promise<User> {
    let password;
    if (
      user.oldPassword
      && user.password
      && await bcrypt.compare(user.oldPassword, encryptedUserPassword)
    ) {
      password = await bcrypt.hash(user.password, 10);
    }
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        name: user.name || undefined,
        email: user.email || undefined,
        password: password || undefined,
      },
    });
  }
}
