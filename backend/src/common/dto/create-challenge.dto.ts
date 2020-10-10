import {
  ArrayMinSize, IsArray, IsString, MaxLength, MinLength, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTestDto } from './create-test.dto';

export class CreateChallengeDto {
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @ApiProperty()
  name: string;

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @ApiProperty()
  slug: string;

  @IsString()
  @MaxLength(2048)
  @ApiProperty()
  description: string;

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @ApiProperty()
  category: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateTestDto)
  @ApiProperty({ type: [CreateTestDto] })
  tests: CreateTestDto[];
}
