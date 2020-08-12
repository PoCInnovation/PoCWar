import {
  IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  email: string;

  @IsNotEmpty()
  name: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?!@#$%^&*.\-_])(?=.{8,})/, { message: 'password too weak' })
  password: string;
}
