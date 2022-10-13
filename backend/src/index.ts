import RunnerHelper from './classes/RunnerHelper';
import Server from './classes/Server';
import TmpFileManager from './classes/TmpFileManager';
import { AppDataSource } from './data-source';
import DatabaseManager from './database/DatabaseManager';
import 'reflect-metadata';
import AuthService from './classes/auth/AuthService';

const port = process.env.PORT || '5000';
let jwtSecretKey: string;
if (process.env.JWT_SECRET_KEY) {
  jwtSecretKey = process.env.JWT_SECRET_KEY;
} else throw Error('JWT Secret key could not be retrieved!');
const languages = ['python'];

const fileManager = new TmpFileManager();

const runnerHelper = new RunnerHelper(languages);
runnerHelper.initalizeRunners();

AppDataSource.initialize()
  .then(async () => {
    const dbManager = new DatabaseManager(AppDataSource);
    const authService = new AuthService(dbManager.users, jwtSecretKey);
    const server = new Server(
      port,
      languages,
      runnerHelper,
      fileManager,
      dbManager,
      authService,
    );
    server.defineEndpoints();
    server.listen();
  })
  .catch((error) => console.log(error));
