import { Role } from '@prisma/client';

export interface JwtPayloadInterface {
  id: string;
  email: string;
  hash: string;
  role: Role;
}
