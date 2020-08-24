import { ApiProperty } from '@nestjs/swagger';

export class CreateChallengeResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  slug: string;
}
