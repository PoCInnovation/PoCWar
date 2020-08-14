import {
  IsInt, IsString, Min, Max, IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTestDto {
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
