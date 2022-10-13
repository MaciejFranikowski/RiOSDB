import { DataSource, Repository } from 'typeorm';
import { Task, TaskEntity } from './entities/Task';
import { Test, TestEntity } from './entities/Test';
import { User, UserEntity } from './entities/User';

export default class DatabaseManager {
  private dataSource: DataSource;

  users: Repository<User>;

  tasks: Repository<Task>;

  tests: Repository<Test>;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
    this.users = this.dataSource.getRepository(UserEntity);
    this.tasks = this.dataSource.getRepository(TaskEntity);
    this.tests = this.dataSource.getRepository(TestEntity);
  }
}
