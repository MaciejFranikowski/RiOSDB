import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { TaskEntity } from './database/entities/Task';
import { TestEntity } from './database/entities/Test';
import { UserEntity } from './database/entities/User';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'development.db',
  synchronize: true,
  logging: false,
  entities: [UserEntity, TestEntity, TaskEntity],
  migrations: [],
  subscribers: [],
});

export default AppDataSource;
