import {
  Controller, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TestService } from './test.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Test')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class TestController {
  constructor(
    private readonly testService: TestService,
  ) {}
}
