import {
  IsString, IsEnum, IsUUID,
} from 'class-validator';
import { Lang } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class SubmitCodeSourceDto {
  @IsString()
  @IsEnum(Lang)
  lang: Lang;

  @IsString()
  code: string;

  @IsUUID()
  @ApiProperty()
  challengeId: string;
}
