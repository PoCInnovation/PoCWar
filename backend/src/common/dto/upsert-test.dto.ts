import {
  IsInt, IsString, Min, Max, IsArray, IsPositive,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpsertTestDto {
  @IsInt()
  @IsPositive()
  @ApiProperty()
  id?: number;

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
