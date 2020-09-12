import {
  IsString, MaxLength, MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PatchChallengeAdminDto {
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @ApiProperty()
  name?: string;

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @ApiProperty()
  slug: string;

  @IsString()
  @MaxLength(500)
  @ApiProperty()
  description?: string;

  @IsString()
  @ApiProperty()
  input_example?: string;

  @IsString()
  @ApiProperty()
  output_example?: string;

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @ApiProperty()
  category?: string;
}
