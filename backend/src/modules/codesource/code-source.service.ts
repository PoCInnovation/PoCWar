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
import { supportedLangs } from '../../common/constants/supported-lang';
import { TestsResultInterface } from '../../common/interface/challenge-result.interface';

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
    userId: number, { code, lang, challengeId }: SubmitCodeSourceDto,
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

  async executeTests({
    lang, code, challengeId, authorId,
  }: CodeSourceModel, tests: TestModel[]): Promise<TestsResultInterface> {
    const result: {execution: {out: string, err: string, ret: number}[]} = await execLang(
      supportedLangs[lang], code, tests,
    );
    let passed: number = 0;
    let failed: number = 0;
    const formattedResult = result.execution.map((test, index) => {
      const pass = tests[index].out === test.out
        && tests[index].err === test.err
        && tests[index].ret === test.ret;
      if (pass) {
        passed += 1;
      } else {
        failed += 1;
      }
      return {
        name: tests[index].name,
        pass,
      };
    });
    const testResult = {
      passed,
      failed,
      tests: formattedResult,
    };
    this.prisma.codeSource.update({
      where: { ux_codesource_author_challenge: { challengeId, authorId } },
      data: { code, lang, lastResult: testResult.toString() },
    });
    return testResult;
  }
}
