import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import {
  Challenge as ChallengeModel,
  TestUpdateWithWhereUniqueWithoutChallengeInput,
  TestCreateWithoutChallengeInput,
  Enumerable,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChallengeDto } from '../../common/dto/create-challenge.dto';
import { UpdateChallengeDto } from '../../common/dto/update-challenge.dto';
import { GetChallengeResponseDto, GetChallengesDto } from '../../common/dto/response/get-challenge-response.dto';

@Injectable()
export class ChallengeService {
  constructor(private prisma: PrismaService) {}

  private static formatChallenge(
    {
      codeSources: [{ passAllTests } = { passAllTests: false }], ...challenge
    }: ChallengeModel & {codeSources?: {passAllTests: boolean}[]},
  ): GetChallengeResponseDto {
    return {
      passAllTests,
      ...challenge,
    };
  }

  async challenge(slug): Promise<GetChallengeResponseDto | null> {
    const challenge = await this.prisma.challenge.findOne({
      where: { slug },
      include: {
        codeSources: {
          take: 1,
          select: {
            passAllTests: true,
          },
        },
      },
    });
    if (!challenge) {
      throw new NotFoundException(`Challenge ${slug} not found`);
    }
    return ChallengeService.formatChallenge(challenge);
  }

  async paginateChallenge(page: number, pageSize: number): Promise<GetChallengesDto> {
    const challenges: GetChallengeResponseDto[] = (await this.prisma.challenge.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        codeSources: {
          select: {
            passAllTests: true,
          },
        },
      },
    })).map((challenge) => ChallengeService.formatChallenge(challenge));
    return {
      challenges,
      pageCount: (await this.prisma.challenge.count()) / pageSize,
      pageSize,
    };
  }

  async challengeByIdWithTests(challengeId: string): Promise<ChallengeModel[]> {
    return this.prisma.challenge.findMany({
      where: { id: challengeId },
      include: {
        tests: true,
      },
    });
  }

  async createChallenge(
    userId: string, {
      name, slug, tests, description, input_example, output_example, category,
    }: CreateChallengeDto,
  ): Promise<ChallengeModel> {
    return this.prisma.challenge.create({
      data: {
        name,
        slug,
        description,
        input_example,
        output_example,
        category,
        author: {
          connect: { id: userId },
        },
        tests: {
          create: tests.map(({ args, ...test }) => ({ ...test, args: args.join(' ') })),
        },
      },
    });
  }

  async deleteChallenge(userId: string, slug: string): Promise<ChallengeModel> {
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
    userId: string, challengeDto: UpdateChallengeDto, slug: string,
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
