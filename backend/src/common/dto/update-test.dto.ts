import {
  IsInt, IsString, Min, Max, IsArray, IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTestDto {
  @IsUUID()
  @ApiProperty()
  uuid: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  out: string;

  @IsString()
  @ApiProperty()
  err: string;

  @IsInt()
  @Min(0)
  @Max(255)
  @ApiProperty()
  ret: number;

  @IsArray()
  @ApiProperty()
  args: string[];
}
