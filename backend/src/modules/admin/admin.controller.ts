import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards, Patch, Body, Put, Query, ParseIntPipe,
} from '@nestjs/common';
import {
  User as UserModel, Role as RoleType, Challenge as ChallengeModel, Test as TestModel,
} from '@prisma/client';
import {
  ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags,
} from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard, OptionalJwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/role.decorator';
import { PatchUserAdminDto } from '../../common/dto/patch-user.dto';
import { PatchChallengeAdminDto } from '../../common/dto/patch-challenge.dto';
import { PutTestAdminDto } from '../../common/dto/put-test.dto';
import { GetChallengesDto } from '../../common/dto/response/get-challenge-response.dto';
import { AuthUser } from '../../common/decorators/auth-user.decorator';
import { AuthUserDto } from '../../common/dto/auth-user.dto';
import { GetUsersResponseDto } from '../../common/dto/response/get-users-response.dto';

@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleType.admin)
@Controller()
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
  ) {}

  @ApiOperation({ summary: 'Get a paginated array of user.' })
  @Get('admin/users')
  async getChallenges(
    @Query('page', ParseIntPipe) page: number,
      @Query('pageSize', ParseIntPipe) pageSize: number,
  ): Promise<GetUsersResponseDto> {
    return this.adminService.paginateUser(page, pageSize);
  }

  @ApiOperation({ summary: 'Get user by id.' })
  @ApiOkResponse({})
  @ApiNotFoundResponse({ description: 'User not found.' })
  @Get('admin/users/:id')
  async getUserById(@Param('id') id: string): Promise<UserModel> {
    return this.adminService.user({ id });
  }

  @ApiOperation({ summary: 'Get user by id.' })
  @ApiOkResponse({})
  @ApiNotFoundResponse({ description: 'User not found.' })
  @Patch('admin/users/:id')
  async patchUserById(@Param('id') id: string, @Body() user: PatchUserAdminDto): Promise<UserModel> {
    return this.adminService.patchUser(id, user);
  }

  @ApiOperation({ summary: 'Delete user by id.' })
  @ApiOkResponse({ description: 'User successfully deleted.' })
  @Delete('admin/users/:id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.adminService.deleteUser({ id });
  }

  @Patch('admin/challenge/:slug')
  async patchChallenge(@Param('slug') slug: string, @Body() challenge: PatchChallengeAdminDto): Promise<ChallengeModel> {
    return this.adminService.patchChallenge(slug, challenge);
  }

  @Put('admin/challenge/:slug/tests')
  async putTests(@Param('slug') slug: string, @Body() tests: PutTestAdminDto[]): Promise<TestModel[]> {
    return this.adminService.putTests(slug, tests);
  }
}
