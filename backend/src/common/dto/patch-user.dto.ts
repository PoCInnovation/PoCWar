import {
  IsEmail, IsString, MaxLength, MinLength, Matches, IsEnum, IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class PatchUserDto {
  @IsOptional()
  @IsEmail()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  email?: string;

  @IsOptional()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?!@#$%^&*.\-_])(?=.{8,40})/,
    { message: 'password too weak' },
  )
  oldPassword?: string;

  @IsOptional()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?!@#$%^&*.\-_])(?=.{8,40})/,
    { message: 'password too weak' },
  )
  password?: string;
}

export class PatchUserAdminDto {
  @IsOptional()
  @IsEnum(Role)
  @ApiProperty({ enum: Role })
  role?: Role;

  @IsOptional()
  @IsEmail()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  email?: string;

  @IsOptional()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?!@#$%^&*.\-_])(?=.{8,40})/,
    { message: 'password too weak' },
  )
  oldPassword?: string;

  @IsOptional()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?!@#$%^&*.\-_])(?=.{8,40})/,
    { message: 'password too weak' },
  )
  password?: string;
}
