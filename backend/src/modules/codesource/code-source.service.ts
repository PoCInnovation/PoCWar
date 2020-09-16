import { Injectable } from '@nestjs/common';
import {
  CodeSource as CodeSourceModel,
  CodeSourceWhereUniqueInput,
  CodeSourceWhereInput,
  CodeSourceOrderByInput,
  Test as TestModel,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { SubmitCodeSourceDto } from '../../common/dto/submit-code-source.dto';
import execLang from '../../execution/exec-lang';
import { supportedLangs } from '../../common/constants/supported-langs';
import {
  ChallengeResultResponse,
  TestResultClass,
} from '../../common/dto/challenge-result.dto';

@Injectable()
export class CodeSourceService {
  constructor(private prisma: PrismaService) {}

  async codeSource(
    codeSourceWhereUniqueInput: CodeSourceWhereUniqueInput,
  ): Promise<CodeSourceModel | null> {
    return this.prisma.codeSource.findOne({
      where: codeSourceWhereUniqueInput,
    });
  }

  async codeSources(params: {
    skip?: number;
    take?: number;
    cursor?: CodeSourceWhereUniqueInput;
    where?: CodeSourceWhereInput;
    orderBy?: CodeSourceOrderByInput;
  }): Promise<CodeSourceModel[]> {
    return this.prisma.codeSource.findMany({
      ...params,
    });
  }

  async submitCodeSource(
    userId: string, { code, lang, challengeId }: SubmitCodeSourceDto,
  ): Promise<CodeSourceModel> {
    return this.prisma.codeSource.upsert({
      create: {
        code,
        lang,
        challenge: {
          connect: { id: challengeId },
        },
        author: {
          connect: { id: userId },
        },
      },
      update: {
        code,
        lang,
      },
      where: {
        ux_codesource_author_challenge: {
          authorId: userId, challengeId,
        },
      },
    });
  }

  async deleteCodeSource(where: CodeSourceWhereUniqueInput): Promise<CodeSourceModel> {
    return this.prisma.codeSource.delete({
      where,
    });
  }

  async executeTests(userId: string, {
    lang, code, challengeId,
  }: CodeSourceModel, tests: TestModel[]): Promise<ChallengeResultResponse> {
    const result = await execLang(
      supportedLangs[lang], code, tests,
    );
    let passed: number = 0;
    let failed: number = 0;
    const formattedResult: TestResultClass[] = result.tests.map((test, index) => {
      const pass = tests[index].out === test.out && test.ret === 0;
      if (pass) {
        passed += 1;
        return {
          name: tests[index].name,
          pass,
        };
      }
      failed += 1;
      return {
        name: tests[index].name,
        stderr: test.err,
        stdout: test.out,
        exitStatus: Number(test.ret),
        pass,
      };
    });
    const testResult: ChallengeResultResponse = {
      passed,
      failed,
      compilation: result.compilation,
      tests: formattedResult,
    };
    await this.prisma.codeSource.update({
      where: { ux_codesource_author_challenge: { challengeId, authorId: userId } },
      data: {
        code, lang, lastResult: testResult.toString(), passAllTests: failed === 0,
      },
    });
    return testResult;
  }
}
