import { ApiProperty } from '@nestjs/swagger';

export class TestResultClass {
  name: string;

  pass: boolean;
}

export class OutputResultClass {
  out: string;

  err: string;

  ret: number;
}

export class ExecutionResultInterface {
  compilation?: OutputResultClass;

  tests: OutputResultClass[];
}

export class ChallengeResultResponse {
  @ApiProperty()
  passed: number;

  @ApiProperty()
  failed: number;

  @ApiProperty()
  compilation: OutputResultClass;

  @ApiProperty({ isArray: true, type: TestResultClass })
  tests: TestResultClass[];
}
