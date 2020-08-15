import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ProfileResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ examples: ['user', 'admin'] })
  role: Role;
}
