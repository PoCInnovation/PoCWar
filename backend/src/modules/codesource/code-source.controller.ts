import {
  Controller, Post, Body, UseGuards,
} from '@nestjs/common';
import { CodeSourceService } from './code-source.service';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { SubmitCodeSourceDto } from '../../dto/submit-code-source.dto';
import execLang from '../../execution/exec-lang';
import { lang } from '../../common/constants/supported-lang';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TestService } from '../test/test.service';

@Controller()
export class CodeSourceController {
  constructor(
    private readonly codeSourceService: CodeSourceService,
    private readonly testService: TestService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('code')
  async submitCodeSource(
    @AuthUser() user: any, @Body() codeSource: SubmitCodeSourceDto,
  ): Promise<any> {
    await this.codeSourceService.submitCodeSource(user.id, codeSource);
    const tests = await this.testService.tests({ where: { challengeId: codeSource.challengeId } });
    const result: {execution: {out: string, err: string, ret: number}[]} = await execLang(
      lang[codeSource.lang], codeSource.code, tests,
    );
    return result.execution.map((test, index) => ({
      name: tests[index].name,
      pass: tests[index].out === test.out
          && tests[index].err === test.err
          && tests[index].ret === test.ret,
    }));
  }
}
