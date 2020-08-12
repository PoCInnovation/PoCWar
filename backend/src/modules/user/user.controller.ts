import {
  Controller,
  Get,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/role.decorator';
import { RoleType } from '../../common/constants/role-type';

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
}
