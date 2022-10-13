export interface Run {
  executionTime: number,
  tests: Test[]
}

export interface Test {
  id: number,
  input: string,
  expectedOutput: string,
  output: string,
  isPassed: string
}
