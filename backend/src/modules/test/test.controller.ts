import {
  Controller, Post, Body, Get, Param,
} from '@nestjs/common';
import { Test as TestModel } from '@prisma/client';
import { TestService } from './test.service';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { CreateTestDto } from '../../dto/create-test.dto';

@Controller()
export class TestController {
  constructor(
    private readonly testService: TestService,
  ) {}

  @Post('test')
  async createTest(
    @AuthUser() user: any, @Body() test: CreateTestDto,
  ): Promise<TestModel> {
    return this.testService.createTest(user, test);
  }
}
