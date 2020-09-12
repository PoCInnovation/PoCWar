import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

class ChallengeDetailsDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  solved: boolean;
}

export class ProfileResponseDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ examples: ['user', 'admin'] })
  role: Role;

  @IsArray({ each: true })
  @IsNotEmpty()
  @ApiProperty({ isArray: true, type: ChallengeDetailsDto })
  challenges: ChallengeDetailsDto[];
}
