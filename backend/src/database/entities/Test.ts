import { EntitySchema } from 'typeorm';
import ITest from '../../interfaces/ITest';

export interface Test extends ITest {
  id: number;
}

export const TestEntity = new EntitySchema<Test>({
  name: 'Test',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    input: {
      type: 'text',
    },
    desiredOutput: {
      type: 'text',
    },
  },
  relations: {
    task: {
      type: 'many-to-one',
      target: 'Task',
    },
  },
});

// @Entity()
// export default class Test extends BaseEntity implements ITest {
//   @PrimaryGeneratedColumn()
//     id: number;

//   @Column('text')
//     input: string;

//   @Column('text')
//     desiredOutput: string;

//   @ManyToOne(() => Task, (task) => task.testCases)
//     task: Task;

//   static fromJSON(tests: ITest[]): Test[] {
//     return tests.map((test) => {
//       const testInstance = new Test();
//       testInstance.input = test.input;
//       testInstance.desiredOutput = test.desiredOutput;
//       return testInstance;
//     });
//   }
// }
