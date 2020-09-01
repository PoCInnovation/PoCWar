import {
  IsEmail, IsString, MaxLength, MinLength, Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @ApiProperty()
  name: string;

  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?!@#$%^&*.\-_])(?=.{8,40})/,
    { message: 'password too weak' },
  )
  @ApiProperty({
    description: `Password should contain at least:
  1 lowercase letter,
  1 uppercase letter,
  1 digit,
  1 special character ('?!@#$%^&*.-_)
  8 characters
and at most:
  40 characters
`,
  })
  password: string;
}
