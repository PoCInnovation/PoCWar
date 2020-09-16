import {
  Body,
  Controller, Param, Put, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Test as TestModel } from '@prisma/client';
import { TestService } from './test.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PutTestAdminDto } from '../../common/dto/put-test.dto';
import { AuthUser } from '../../common/decorators/auth-user.decorator';
import { AuthUserDto } from '../../common/dto/auth-user.dto';

@ApiTags('Test')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class TestController {
  constructor(
    private readonly testService: TestService,
  ) {}

  @Put('challenge/:slug/tests')
  async putTests(@AuthUser() { id }: AuthUserDto, @Param('slug') slug: string, @Body() tests: PutTestAdminDto[]): Promise<TestModel[]> {
    return this.testService.putTests(id, slug, tests);
  }
}
