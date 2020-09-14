import { Injectable } from '@nestjs/common';
import {
  UserUpdateInput,
  User,
  UserCreateInput,
  UserWhereUniqueInput,
  UserWhereInput,
  UserOrderByInput,
  Challenge as ChallengeModel,
  Test as TestModel,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { PatchUserAdminDto } from '../../common/dto/patch-user.dto';
import { PatchChallengeAdminDto } from '../../common/dto/patch-challenge.dto';
import { PutTestAdminDto } from '../../common/dto/put-test.dto';
import { GetUserDto, GetUsersResponseDto } from '../../common/dto/response/get-users-response.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async paginateUser(
    page: number, pageSize: number
  ): Promise<GetUsersResponseDto> {
    const userCount = await this.prisma.user.count();
    const toSkip = (page - 1) * pageSize;
    if (toSkip >= userCount) {
      return {
        users: [],
        pageCount: Math.ceil(userCount / pageSize),
        pageSize,
      };
    }
    const users: GetUserDto[] = (await this.prisma.user.findMany({
      skip: toSkip,
      take: pageSize,
      select: {
        name: true,
        email: true,
        role: true,
      },
    }));
    return {
      users,
      pageCount: Math.ceil(userCount / pageSize),
      pageSize,
    };
  }

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

  async patchUser(userId: string, user: PatchUserAdminDto) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: user.name || undefined,
        email: user.email || undefined,
        role: user.role || undefined,
        password: user.password || undefined,
      },
    });
  }

  async patchChallenge(slug: string, challenge: PatchChallengeAdminDto): Promise<ChallengeModel> {
    return this.prisma.challenge.update({
      where: { slug },
      data: {
        name: challenge.name || undefined,
        slug: challenge.slug || undefined,
        category: challenge.category || undefined,
        input_example: challenge.input_example || undefined,
        output_example: challenge.output_example || undefined,
        description: challenge.description || undefined,
      },
    });
  }

  async putTests(challengeSlug: string, tests: PutTestAdminDto[]): Promise<TestModel[]> {
    await this.prisma.test.deleteMany({
      where: { challenge: { slug: challengeSlug } },
    });

    return Promise.all(tests.map(({ args, ...test }) => this.prisma.test.create({
      data: {
        ...test,
        args: args.join(' '),
        challenge: {
          connect: {
            slug: challengeSlug,
          },
        },
      },
    })));
  }
}
