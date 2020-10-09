import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';

export class GetChallengeResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  passAllTests: boolean;

  @ApiProperty({ description: 'only if has already submitted once and not for pagination' })
  codeSource?: string;
}

export class GetChallengesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ApiProperty({ isArray: true, type: GetChallengeResponseDto })
  challenges: GetChallengeResponseDto[];

  @ApiProperty()
  pageCount: number;

  @ApiProperty()
  pageSize: number;
}
