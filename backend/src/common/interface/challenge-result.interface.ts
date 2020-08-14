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

export interface ChallengeResultInterface {
  passed: number;
  failed: number;
  compilation: OutputResultInterface;
  tests: TestResultInterface[];
}
