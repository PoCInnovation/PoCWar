import { Injectable } from '@nestjs/common';
import {
  Test as TestModel,
  TestWhereUniqueInput,
  TestWhereInput,
  TestOrderByInput,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTestDto } from '../../dto/create-test.dto';

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

  async createTest(challengeId: number, { args, ...data }: CreateTestDto): Promise<TestModel> {
    return this.prisma.test.create({
      data: {
        args: args.join(' '),
        ...data,
        challenge: {
          connect: { id: challengeId },
        },
      },
    });
  }

  async deleteTest(where: TestWhereUniqueInput): Promise<TestModel> {
    return this.prisma.test.delete({
      where,
    });
  }
}
