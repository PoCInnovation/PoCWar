import { Injectable } from '@nestjs/common';
import {
  CodeSource as CodeSourceModel,
  CodeSourceWhereUniqueInput,
  CodeSourceWhereInput,
  CodeSourceOrderByInput,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { SubmitCodeSourceDto } from '../../dto/submit-code-source.dto';

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
}
