import {
  Controller, Post, Body, Get, Param,
} from '@nestjs/common';
import { Challenge as ChallengeModel } from '@prisma/client';
import { ChallengeService } from './challenge.service';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { CreateChallengeDto } from '../../dto/create-challenge.dto';
import { GetChallengesDto } from '../../dto/get-challenges.dto';

@Controller()
export class ChallengeController {
  constructor(
    private readonly challengeService: ChallengeService,
  ) {}

  @Get('challenge')
  async getChallenges(@Body() { page, pageSize }: GetChallengesDto): Promise<ChallengeModel[]> {
    return this.challengeService.challenges({
      skip: page * pageSize,
      take: pageSize,
    });
  }

  @Get('challenge/:slug')
  async getChallenge(@Param('slug') slug: string): Promise<ChallengeModel> {
    return this.challengeService.challenge({ slug });
  }

  @Post('challenge')
  async createChallenge(
    @AuthUser() user: any, @Body() challenge: CreateChallengeDto,
  ): Promise<ChallengeModel> {
    return this.challengeService.createChallenge(user.id, challenge);
  }
}
