import {
  IsInt, IsString, IsEnum,
} from 'class-validator';
import { Lang } from '@prisma/client';

export class SubmitCodeSourceDto {
  @IsString()
  @IsEnum(Lang)
  lang: Lang;

  @IsString()
  code: string;

  @IsInt()
  challengeId: number;
}
