import {
  Controller, Post, Body, Get, Param, UseGuards, ParseIntPipe, Query,
} from '@nestjs/common';
import { Challenge as ChallengeModel } from '@prisma/client';
import { ChallengeService } from './challenge.service';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { CreateChallengeDto } from '../../dto/create-challenge.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class ChallengeController {
  constructor(
    private readonly challengeService: ChallengeService,
  ) {}

  @Get('challenge')
  async getChallenges(
    @Query('page', ParseIntPipe) page: number,
      @Query('pageSize', ParseIntPipe) pageSize: number,
  ): Promise<ChallengeModel[]> {
    return this.challengeService.challenges({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  @Get('challenge/:slug')
  async getChallenge(@Param('slug') slug: string): Promise<ChallengeModel> {
    return this.challengeService.challenge({ slug });
  }

  @UseGuards(JwtAuthGuard)
  @Post('challenge')
  async createChallenge(
    @AuthUser() user: any, @Body() challenge: CreateChallengeDto,
  ): Promise<ChallengeModel> {
    return this.challengeService.createChallenge(user.id, challenge);
  }
}
