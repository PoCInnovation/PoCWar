import { Injectable } from '@nestjs/common';
import {
  UserUpdateInput,
  User,
  UserCreateInput,
  UserWhereUniqueInput,
  UserWhereInput,
  UserOrderByInput,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(userWhereUniqueInput: UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findOne({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: UserWhereUniqueInput;
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
  }): Promise<User[]> {
    const {
      skip, take, cursor, where, orderBy,
    } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser({ email, name, password }: UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        email,
        name,
        password: await bcrypt.hash(password, 10),
      },
    });
  }

  async updateUser(params: {
    where: UserWhereUniqueInput;
    data: UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
