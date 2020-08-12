import {
  IsInt, IsPositive, Min, Max,
} from 'class-validator';

export class GetChallengesDto {
  @IsInt()
  @IsPositive()
  page: number;

  @IsInt()
  @IsPositive()
  @Min(10)
  @Max(100)
  pageSize: number;
}
