import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  ParseIntPipe,
  Query,
  Delete,
  Put,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse,
  ApiOkResponse, ApiOperation, ApiResponse, ApiTags,
} from '@nestjs/swagger';
import { ChallengeService } from './challenge.service';
import { AuthUser } from '../../common/decorators/auth-user.decorator';
import { JwtAuthGuard, OptionalJwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthUserDto } from '../../common/dto/auth-user.dto';
import { CreateChallengeDto } from '../../common/dto/create-challenge.dto';
import { CreateChallengeResponseDto } from '../../common/dto/response/create-challenge-response.dto';
import { UpdateChallengeDto } from '../../common/dto/update-challenge.dto';
import { GetChallengeResponseDto, GetChallengesDto } from '../../common/dto/response/get-challenge-response.dto';

@ApiTags('Challenge')
@Controller()
export class ChallengeController {
  constructor(
    private readonly challengeService: ChallengeService,
  ) {}

  @ApiOperation({ summary: 'Get a paginated array of challenge.' })
  @Get('challenge')
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOkResponse({ type: GetChallengesDto })
  async getChallenges(
    @AuthUser() user: AuthUserDto,
      @Query('page', ParseIntPipe) page: number,
      @Query('pageSize', ParseIntPipe) pageSize: number,
  ): Promise<GetChallengesDto> {
    return this.challengeService.paginateChallenge(page, pageSize, user?.id);
  }

  @ApiOperation({ summary: 'Get a challenge by slug.' })
  @ApiResponse({ type: GetChallengeResponseDto })
  @UseGuards(JwtAuthGuard)
  @Get('challenge/:slug')
  async getChallenge(
    @AuthUser() user: AuthUserDto, @Param('slug') slug: string,
  ): Promise<GetChallengeResponseDto> {
    return this.challengeService.challenge(slug, user?.id);
  }

  @ApiOperation({ summary: 'Create a new challenge.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('challenge')
  @ApiCreatedResponse({ description: 'Challenge successfully created.', type: CreateChallengeResponseDto })
  @ApiForbiddenResponse({ description: 'Forbidden. Slug is already taken.' })
  async createChallenge(
    @AuthUser() user: AuthUserDto, @Body() challenge: CreateChallengeDto,
  ): Promise<CreateChallengeResponseDto> {
    try {
      const { id, slug } = await this.challengeService.createChallenge(user.id, challenge);
      return { id, slug };
    } catch (e) {
      throw new ForbiddenException('Slug is already taken');
    }
  }

  @ApiOperation({ summary: 'Delete a challenge by slug.' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Challenge successfully deleted.', type: String })
  @UseGuards(JwtAuthGuard)
  @Delete('challenge/:slug')
  async deleteChallenge(
    @AuthUser() user: AuthUserDto, @Param('slug') slug: string,
  ): Promise<string> {
    const { name } = await this.challengeService.deleteChallenge(user.id, slug);
    return `Challenge ${name} successfully deleted.`;
  }

  @ApiOperation({ summary: 'Update a challenge by slug' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Challenge successfully updated.', type: String })
  @UseGuards(JwtAuthGuard)
  @Put('challenge/:slug')
  async updateChallenge(
    @AuthUser() user: AuthUserDto,
      @Param('slug') slug: string,
      @Body() challengeDto: UpdateChallengeDto,
  ): Promise<string> {
    const { name } = await this.challengeService.updateChallenge(user.id, challengeDto, slug);
    return `Challenge ${name} successfully updated.`;
  }
}
