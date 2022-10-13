import { EntitySchema } from 'typeorm';
import ITask from '../../interfaces/ITask';
import type { User } from './User';

export interface Task extends ITask{
  id: string,
  user: User
}

export const TaskEntity = new EntitySchema<Task>({
  name: 'Task',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    description: {
      type: 'text',
    },
    title: {
      type: String,
    },
  },
  relations: {
    testCases: {
      type: 'one-to-many',
      target: 'Test',
      cascade: true,
      inverseSide: 'task',
    },
    user: {
      type: 'many-to-one',
      target: 'User',
    },
  },
});

export default Task;
