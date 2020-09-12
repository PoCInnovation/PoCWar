import { ForbiddenException, Injectable } from '@nestjs/common';
import {
  Test as TestModel,
  TestWhereUniqueInput,
  TestWhereInput,
  TestOrderByInput,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PutTestAdminDto, PutTestDto } from '../../common/dto/put-test.dto';

@Injectable()
export class TestService {
  constructor(private prisma: PrismaService) {}

  async test(testWhereUniqueInput: TestWhereUniqueInput): Promise<TestModel | null> {
    return this.prisma.test.findOne({
      where: testWhereUniqueInput,
    });
  }

  async tests(params: {
    skip?: number;
    take?: number;
    cursor?: TestWhereUniqueInput;
    where?: TestWhereInput;
    orderBy?: TestOrderByInput;
  }): Promise<TestModel[]> {
    return this.prisma.test.findMany({
      ...params,
    });
  }

  async deleteTest(where: TestWhereUniqueInput): Promise<TestModel> {
    return this.prisma.test.delete({
      where,
    });
  }

  async putTests(userId: string, challengeSlug: string, tests: PutTestDto[]): Promise<TestModel[]> {
    const { count } = await this.prisma.test.deleteMany({
      where: { challenge: { slug: challengeSlug, authorId: userId } },
    });

    if (count === 0) {
      throw new ForbiddenException('forbidden');
    }

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
