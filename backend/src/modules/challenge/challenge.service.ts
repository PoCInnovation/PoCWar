import { Injectable } from '@nestjs/common';
import {
  Challenge,
  ChallengeWhereUniqueInput,
  ChallengeWhereInput,
  ChallengeOrderByInput,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChallengeDto } from '../../dto/create-challenge.dto';

@Injectable()
export class ChallengeService {
  constructor(private prisma: PrismaService) {}

  async challenge(challengeWhereUniqueInput: ChallengeWhereUniqueInput): Promise<Challenge | null> {
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
  }): Promise<Challenge[]> {
    return this.prisma.challenge.findMany({
      ...params,
    });
  }

  async createChallenge(userId: number, { name, slug, tests }: CreateChallengeDto): Promise<Challenge> {
    return this.prisma.challenge.create({
      data: {
        name,
        slug,
        author: {
          connect: { id: userId },
        },
        tests: {
          create: tests,
        },
      },
    });
  }

  async deleteChallenge(where: ChallengeWhereUniqueInput): Promise<Challenge> {
    return this.prisma.challenge.delete({
      where,
    });
  }
}
