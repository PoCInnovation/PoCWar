import { Injectable } from '@nestjs/common';
import {
  Challenge,
  ChallengeCreateInput,
  ChallengeWhereUniqueInput,
  ChallengeWhereInput,
  ChallengeOrderByInput,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

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

  async createChallenge(userId: number, { name, slug }: ChallengeCreateInput): Promise<Challenge> {
    return this.prisma.challenge.create({
      data: {
        name,
        slug,
        author: {
          connect: { id: userId },
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
