import ITest from './ITest';
import IUser from './IUser';

export default interface ITask {
  title : string;
  description : string;
  testCases: ITest[];
  user: IUser
}
