import {
  ArrayMinSize, IsArray, IsString, MaxLength, MinLength, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTestDto } from './create-test.dto';

export class CreateChallengeDto {
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  name: string;

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  slug: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateTestDto)
  tests: CreateTestDto[];
}
