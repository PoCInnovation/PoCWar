import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';

export class GetUserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ examples: ['user', 'admin'] })
  role: Role;
}

export class GetUsersResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ApiProperty({ isArray: true, type: GetUserDto })
  users: GetUserDto[];

  @ApiProperty()
  pageCount: number;

  @ApiProperty()
  pageSize: number;
}
