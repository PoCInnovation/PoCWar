import {
  Controller, Post, Body, UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CodeSourceService } from './code-source.service';
import { AuthUser } from '../../common/decorators/auth-user.decorator';
import { SubmitCodeSourceDto } from '../../common/dto/submit-code-source.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TestService } from '../test/test.service';
import { AuthUserInterface } from '../../common/interface/auth-user.interface';

@ApiTags('CodeSource')
@Controller()
export class CodeSourceController {
  constructor(
    private readonly codeSourceService: CodeSourceService,
    private readonly testService: TestService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('code')
  async submitCodeSource(
    @AuthUser() user: AuthUserInterface, @Body() codeSourceDto: SubmitCodeSourceDto,
  ): Promise<any> {
    const codeSource = await this.codeSourceService.submitCodeSource(user.id, codeSourceDto);
    const tests = await this.testService.tests({
      where: { challengeId: codeSourceDto.challengeId },
    });
    return this.codeSourceService.executeTests(codeSource, tests);
  }
}
