import {
  ForbiddenException, Injectable, NotFoundException, UnauthorizedException,
} from '@nestjs/common';
import {
  Challenge as ChallengeModel,
  TestUpdateWithWhereUniqueWithoutChallengeInput,
  TestCreateWithoutChallengeInput,
  Enumerable,
  Test as TestModel,
} from '@prisma/client';
import { PutTestDto } from 'src/common/dto/put-test.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChallengeDto } from '../../common/dto/create-challenge.dto';
import { UpdateChallengeDto } from '../../common/dto/update-challenge.dto';
import {
  GetChallengeResponseDto,
  GetChallengeResponseWithSourceAndTestsDto,
  GetChallengesDto,
} from '../../common/dto/response/get-challenge-response.dto';

@Injectable()
export class ChallengeService {
  constructor(private prisma: PrismaService) {}

  static formatTestArgs = (args) => `${args.map((arg) => JSON.stringify(arg)).join(' ')}`;

  private static formatChallenge(
    {
      codeSources: [{ passAllTests, code } = { passAllTests: false, code: undefined }],
      tests,
      ...challenge
    }: ChallengeModel & {
      codeSources?: { passAllTests: boolean, code?: string }[],
      tests?: TestModel[]
    },
  ): GetChallengeResponseDto | GetChallengeResponseWithSourceAndTestsDto {
    return {
      passAllTests,
      codeSource: code,
      tests: tests?.map(({
        id, challengeId, args, ...test
      }) => ({
        ...test,
        args: args.split(' ').map((arg) => arg.slice(1, -1)),
      })),
      ...challenge,
    };
  }

  async challenge(
    slug: string, userId?: string,
  ): Promise<GetChallengeResponseWithSourceAndTestsDto> {
    const challenge = await this.prisma.challenge.findOne({
      where: { slug },
      include: {
        codeSources: {
          take: userId ? 1 : 0,
          where: { authorId: userId },
          select: {
            passAllTests: true,
            code: true,
          },
        },
        tests: {
          where: { challenge: { slug } },
        },
      },
    });
    if (!challenge) {
      throw new NotFoundException(`Challenge ${slug} not found`);
    }
    return ChallengeService.formatChallenge(
      challenge,
    ) as GetChallengeResponseWithSourceAndTestsDto;
  }

  async paginateChallenge(
    page: number, pageSize: number, userId?: string,
  ): Promise<GetChallengesDto> {
    const challengeCount = await this.prisma.challenge.count();
    const toSkip = (page - 1) * pageSize;
    if (toSkip >= challengeCount) {
      return {
        challenges: [],
        pageCount: Math.ceil(challengeCount / pageSize),
        pageSize,
      };
    }
    const challenges: GetChallengeResponseDto[] = (await this.prisma.challenge.findMany({
      skip: toSkip,
      take: pageSize,
      include: {
        author: {
          select: { name: true },
        },
        codeSources: {
          take: userId ? 1 : 0,
          where: { authorId: userId },
          select: { passAllTests: true },
        },
      },
    })).map((challenge) => ChallengeService.formatChallenge(challenge));
    return {
      challenges,
      pageCount: Math.ceil(challengeCount / pageSize),
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
      name, slug, tests, description, category,
    }: CreateChallengeDto,
  ): Promise<ChallengeModel> {
    return this.prisma.challenge.create({
      data: {
        name,
        slug,
        description,
        category,
        author: {
          connect: { id: userId },
        },
        tests: {
          create: tests.map(({ args, ...test }) => (
            { ...test, args: ChallengeService.formatTestArgs(args) }
          )),
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
        toCreate.push({ args: ChallengeService.formatTestArgs(args), ...testModel });
      } else if (challenge.tests.find((test) => id === test.id)) {
        toUpdate.push({
          where: { id },
          data: { args: ChallengeService.formatTestArgs(args), ...testModel },
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

  async putTests(userId: string, challengeSlug: string, tests: PutTestDto[]): Promise<TestModel[]> {
    const { count } = await this.prisma.test.deleteMany({
      where: { challenge: { slug: challengeSlug, authorId: userId } },
    });

    if (count === 0) {
      throw new ForbiddenException('forbidden');
    }

    return Promise.all(tests.map(({ args, ...test }) => this.prisma.test.create({
      data: {
        ...test,
        args: ChallengeService.formatTestArgs(args),
        challenge: {
          connect: {
            slug: challengeSlug,
          },
        },
      },
    })));
  }
}
