import { ApiProperty } from '@nestjs/swagger';

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
