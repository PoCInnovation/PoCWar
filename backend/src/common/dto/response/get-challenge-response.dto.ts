import { ApiProperty } from '@nestjs/swagger';

export class GetChallengeResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;
}
