import { Injectable } from '@nestjs/common';
import {
  Test as TestModel,
  TestWhereUniqueInput,
  TestWhereInput,
  TestOrderByInput,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

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
}
