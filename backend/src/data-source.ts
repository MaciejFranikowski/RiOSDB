import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { TaskEntity } from './database/entities/Task';
import { TestEntity } from './database/entities/Test';
import { UserEntity } from './database/entities/User';

// export const AppDataSource = new DataSource({
//   type: 'mysql',
//   host: 'database',
//   port: 3306,
//   username: 'test',
//   password: 'test',
//   database: 'test',
//   synchronize: true,
//   logging: false,
//   entities: [UserEntity, TestEntity, TaskEntity],
//   migrations: [],
//   subscribers: [],
// });
export const AppDataSource = new DataSource({
  type: 'mysql',
  replication: {
    master: {
      host: "databaseMaster",
      port: 3306,
      username: "test",
      password: "test",
      database: "test",
    },
    slaves: [{
      host: "databaseSlave1",
      port: 3306,
      username: "test",
      password: "test",
      database: "test"
    }, {
      host: "databaseSlave2",
      port: 3306,
      username: "test",
      password: "test",
      database: "test"
    }]
  },
  synchronize:true,
  logging: false,
  entities: [UserEntity, TestEntity, TaskEntity],
  migrations: [],
  subscribers: [],
});

export default AppDataSource;
