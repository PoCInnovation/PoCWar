import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  Challenge as ChallengeModel,
  ChallengeWhereUniqueInput,
  ChallengeWhereInput,
  ChallengeOrderByInput,
  TestUpdateWithWhereUniqueWithoutChallengeInput,
  TestCreateWithoutChallengeInput,
  Enumerable,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChallengeDto } from '../../common/dto/create-challenge.dto';
import { UpdateTestDto } from '../../common/dto/update-test.dto';
import { UpdateChallengeDto } from '../../common/dto/update-challenge.dto';

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

  async deleteChallenge(userId: number, slug: string): Promise<ChallengeModel> {
    const challenge = await this.prisma.challenge.findOne(
      {
        where: { slug },
        select: { id: true, author: { select: { id: true } } },
      },
    );
    if (challenge.author.id !== userId) {
      throw new UnauthorizedException();
    }
    await this.prisma.test.deleteMany({ where: { challengeId: challenge.id } });
    await this.prisma.codeSource.deleteMany({ where: { challengeId: challenge.id } });
    return this.prisma.challenge.delete({
      where: { slug },
    });
  }

  async updateChallenge(
    userId: number, challengeDto: UpdateChallengeDto, slug: string,
  ): Promise<ChallengeModel> {
    const challenge = await this.prisma.challenge.findOne(
      {
        where: { slug },
        select: {
          id: true,
          author: { select: { id: true } },
          tests: { select: { id: true } },
        },
      },
    );
    if (challenge.author.id !== userId) {
      throw new UnauthorizedException();
    }
    const toCreate: Enumerable<TestCreateWithoutChallengeInput> = [];
    const toUpdate: Enumerable<TestUpdateWithWhereUniqueWithoutChallengeInput> = [];
    challengeDto.tests.forEach(({ id, args, ...testModel }) => {
      if (!id) {
        toCreate.push({ args: args.join(' '), ...testModel });
      } else if (challenge.tests.find((test) => id === test.id)) {
        toUpdate.push({
          where: { id },
          data: { args: args.join(' '), ...testModel },
        });
      }
    });
    return this.prisma.challenge.update({
      where: { id: challenge.id },
      data: {
        name: challengeDto.name,
        tests: {
          update: toUpdate,
          create: toCreate,
        },
      },
    });
  }
}
