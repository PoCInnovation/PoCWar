import { Injectable } from '@nestjs/common';
import {
  Challenge as ChallengeModel,
  ChallengeWhereUniqueInput,
  ChallengeWhereInput,
  ChallengeOrderByInput,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChallengeDto } from '../../dto/create-challenge.dto';

@Injectable()
export class ChallengeService {
  constructor(private prisma: PrismaService) {}

  async challenge(
    challengeWhereUniqueInput: ChallengeWhereUniqueInput,
  ): Promise<ChallengeModel | null> {
    return this.prisma.challenge.findOne({
      where: challengeWhereUniqueInput,
    });
  }

  async challenges(params: {
    skip?: number;
    take?: number;
    cursor?: ChallengeWhereUniqueInput;
    where?: ChallengeWhereInput;
    orderBy?: ChallengeOrderByInput;
  }): Promise<ChallengeModel[]> {
    return this.prisma.challenge.findMany({
      ...params,
    });
  }

  async challengeByIdWithTests(challengeId: number): Promise<ChallengeModel[]> {
    return this.prisma.challenge.findMany({
      where: { id: challengeId },
      include: {
        tests: true,
      },
    });
  }

  async createChallenge(
    userId: number, { name, slug, tests }: CreateChallengeDto,
  ): Promise<ChallengeModel> {
    return this.prisma.challenge.create({
      data: {
        name,
        slug,
        author: {
          connect: { id: userId },
        },
        tests: {
          create: tests.map(({ args, ...test }) => ({ ...test, args: args.join(' ') })),
        },
      },
    });
  }

  async deleteChallenge(where: ChallengeWhereUniqueInput): Promise<ChallengeModel> {
    return this.prisma.challenge.delete({
      where,
    });
  }
}
