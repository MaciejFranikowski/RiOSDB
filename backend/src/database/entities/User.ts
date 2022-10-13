import { EntitySchema } from 'typeorm';
import IUser from '../../interfaces/IUser';
import type { Task } from './Task';

export interface User extends IUser {
  id: number;
  createdTasks: Task
}

export const UserEntity = new EntitySchema<User>({
  name: 'User',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    passHash: {
      type: String,
      select: false,
    },
  },
  relations: {
    createdTasks: {
      type: 'one-to-many',
      target: 'Task',
    },

  },
});
