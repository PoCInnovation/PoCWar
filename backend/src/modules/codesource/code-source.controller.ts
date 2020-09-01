import {
  Controller, Post, Body, UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags,
} from '@nestjs/swagger';
import { CodeSourceService } from './code-source.service';
import { AuthUser } from '../../common/decorators/auth-user.decorator';
import { SubmitCodeSourceDto } from '../../common/dto/submit-code-source.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TestService } from '../test/test.service';
import { AuthUserDto } from '../../common/dto/auth-user.dto';
import { ChallengeResultResponse } from '../../common/dto/challenge-result.dto';

@ApiTags('CodeSource')
@Controller()
export class CodeSourceController {
  constructor(
    private readonly codeSourceService: CodeSourceService,
    private readonly testService: TestService,
  ) {}

  @ApiOperation({ summary: 'Execute tests from challenge to submitted code source.' })
  @ApiCreatedResponse({ description: 'Tests successfully executed.', type: ChallengeResultResponse })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('code')
  async submitCodeSource(
    @AuthUser() user: AuthUserDto, @Body() codeSourceDto: SubmitCodeSourceDto,
  ): Promise<ChallengeResultResponse> {
    const codeSource = await this.codeSourceService.submitCodeSource(user.id, codeSourceDto);
    const tests = await this.testService.tests({
      where: { challengeId: codeSourceDto.challengeId },
    });
    return this.codeSourceService.executeTests(user.id, codeSource, tests);
  }
}
