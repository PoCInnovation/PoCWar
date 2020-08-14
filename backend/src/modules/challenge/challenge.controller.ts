import {
  Controller, Post, Body, Get, Param, UseGuards, ParseIntPipe, Query, Delete, Put,
} from '@nestjs/common';
import { Challenge as ChallengeModel } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChallengeService } from './challenge.service';
import { AuthUser } from '../../common/decorators/auth-user.decorator';
import { CreateChallengeDto } from '../../common/dto/create-challenge.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthUserInterface } from '../../common/interface/auth-user.interface';
import { UpdateTestDto } from '../../common/dto/update-test.dto';
import { UpdateChallengeDto } from '../../common/dto/update-challenge.dto';

@ApiTags('Challenge')
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('challenge')
  async createChallenge(
    @AuthUser() user: AuthUserInterface, @Body() challenge: CreateChallengeDto,
  ): Promise<ChallengeModel> {
    return this.challengeService.createChallenge(user.id, challenge);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('challenge/:slug')
  async deleteChallenge(
    @AuthUser() user: AuthUserInterface, @Param('slug') slug: string,
  ): Promise<ChallengeModel> {
    return this.challengeService.deleteChallenge(user.id, slug);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('challenge/:slug')
  async updateChallenge(
    @AuthUser() user: AuthUserInterface,
      @Param('slug') slug: string,
      @Body() challengeDto: UpdateChallengeDto,
  ): Promise<ChallengeModel> {
    return this.challengeService.updateChallenge(user.id, challengeDto, slug);
  }
}
