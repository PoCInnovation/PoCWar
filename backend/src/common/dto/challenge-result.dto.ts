import { ApiProperty } from '@nestjs/swagger';

export interface TestResultInterface {
  name: string;
  pass: boolean;
}

export interface OutputResultInterface {
  out: string;
  err: string;
  ret: number;
}

export interface ExecutionResultInterface {
  compilation?: OutputResultInterface;
  tests: OutputResultInterface[];
}

export class ChallengeResultResponse {
  @ApiProperty()
  passed: number;

  @ApiProperty()
  failed: number;

  @ApiProperty()
  compilation: OutputResultInterface;

  @ApiProperty()
  tests: TestResultInterface[];
}
