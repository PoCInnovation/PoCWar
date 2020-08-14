import {
  IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  name: string;

  @ApiProperty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?!@#$%^&*.\-_])(?=.{8,})/, { message: 'password too weak' })
  password: string;
}
