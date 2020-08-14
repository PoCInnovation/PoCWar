export interface TestResultInterface {
  name: string;
  pass: boolean;
}

export interface TestsResultInterface {
  passed: number;
  failed: number;
  tests: TestResultInterface[];
}
