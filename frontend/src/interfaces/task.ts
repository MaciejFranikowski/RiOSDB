import { User } from './user';

export interface Testcase {
  id: string,
  input: string,
  desiredOutput: string
}

export interface Task {
  title: string,
  description: string,
  testcases: Testcase[],
  user: User
}

export interface DBTask extends Task {
  id: number
}
