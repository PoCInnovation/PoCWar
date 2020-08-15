import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { User as UserModel, Role as RoleType } from '@prisma/client';
import {
  ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/role.decorator';
import { AuthUser } from '../../common/decorators/auth-user.decorator';
import { AuthUserDto } from '../../common/dto/auth-user.dto';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: 'Get user by id.' })
  @ApiOkResponse()
  @Roles(RoleType.admin)
  @Get('user/:id')
  async getUserById(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user({ id });
  }

  @Roles(RoleType.admin)
  @ApiOperation({ summary: 'Delete user by id.' })
  @ApiOkResponse({ description: 'User successfully deleted.' })
  @Delete('user/:id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id });
  }

  @ApiOperation({ summary: 'Delete connected user.' })
  @ApiCreatedResponse()
  @Delete('user')
  async delete(@AuthUser() user: AuthUserDto): Promise<UserModel> {
    return this.userService.deleteUser({ id: user.id });
  }
}
