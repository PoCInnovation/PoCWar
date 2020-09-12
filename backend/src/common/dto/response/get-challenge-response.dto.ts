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
  input_example: string;

  @ApiProperty()
  output_example: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  passAllTests: boolean;
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
