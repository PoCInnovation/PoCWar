import {
  Controller,
} from '@nestjs/common';
import { ChallengeService } from './challenge.service';

@Controller()
export class ChallengeController {
  constructor(
    private readonly challengeService: ChallengeService,
  ) {}
}
