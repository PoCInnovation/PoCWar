import { Injectable } from '@nestjs/common';
import {
  Test,
  TestWhereUniqueInput,
  TestWhereInput,
  TestOrderByInput,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTestDto } from '../../dto/create-test.dto';

@Injectable()
export class TestService {
  constructor(private prisma: PrismaService) {}

  async test(testWhereUniqueInput: TestWhereUniqueInput): Promise<Test | null> {
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
  }): Promise<Test[]> {
    return this.prisma.test.findMany({
      ...params,
    });
  }

  async createTest(challengeId: number, testDto: CreateTestDto): Promise<Test> {
    return this.prisma.test.create({
      data: {
        ...testDto,
        challenge: {
          connect: { id: challengeId },
        },
      },
    });
  }

  async deleteTest(where: TestWhereUniqueInput): Promise<Test> {
    return this.prisma.test.delete({
      where,
    });
  }
}
