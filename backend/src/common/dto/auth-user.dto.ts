import { Role } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class AuthUserDto {
  id: string;

  email: string;

  @Exclude()
  password: string;

  role: Role;
}
