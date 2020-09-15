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
  @MinLength(4)
  @MaxLength(30)
  @ApiProperty()
  name: string;

  @IsString()
  @Matches(
    /(?=.{4,40})/,
    { message: 'password too weak' },
  )
  @ApiProperty({
    description: `Password should contain at least:
  4 characters
and at most:
  40 characters
`,
  })
  password: string;
}
