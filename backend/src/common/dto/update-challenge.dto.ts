import {
  ArrayMinSize, IsArray, IsString, MaxLength, MinLength, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTestDto } from './create-test.dto';
import { UpsertTestDto } from './upsert-test.dto';

export class UpdateChallengeDto {
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @ApiProperty()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateTestDto)
  @ApiProperty({ type: [UpsertTestDto] })
  tests: UpsertTestDto[];
}
