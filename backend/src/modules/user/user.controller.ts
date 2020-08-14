import {
  Controller,
  Get,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/role.decorator';
import { RoleType } from '../../common/constants/role-type';
import { AuthUser } from '../../common/decorators/auth-user.decorator';
import { AuthUserInterface } from '../../common/interface/auth-user.interface';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Roles(RoleType.ADMIN)
  @Get('user/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    return this.userService.user({ id });
  }

  @Roles(RoleType.ADMIN)
  @Delete('user/:id')
  async deleteUser(@Param('id') id: number): Promise<UserModel> {
    return this.userService.deleteUser({ id });
  }

  @Delete('user')
  async delete(@AuthUser() user: AuthUserInterface): Promise<UserModel> {
    return this.userService.deleteUser({ id: user.id });
  }
}
