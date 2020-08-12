import {
  IsInt, IsString, Min, Max, IsArray,
} from 'class-validator';

export class CreateTestDto {
  @IsString()
  name: string;

  @IsString()
  out: string;

  @IsString()
  err: string;

  @IsInt()
  @Min(0)
  @Max(255)
  ret: number;

  @IsArray()
  args: string[];
}
