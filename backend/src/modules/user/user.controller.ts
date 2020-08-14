import {
  Controller,
  Get,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { User as UserModel, Role as RoleType } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/role.decorator';
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

  @Roles(RoleType.admin)
  @Get('user/:id')
  async getUserById(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user({ id });
  }

  @Roles(RoleType.admin)
  @Delete('user/:id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id });
  }

  @Delete('user')
  async delete(@AuthUser() user: AuthUserInterface): Promise<UserModel> {
    return this.userService.deleteUser({ id: user.id });
  }
}
