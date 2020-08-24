import { Role } from '@prisma/client';

export class AuthUserDto {
  id: string;

  email: string;

  password: string;

  role: Role;
}
