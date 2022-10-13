import express from 'express';
import bodyParser from 'body-parser';
import { body, query, validationResult } from 'express-validator';
import cors from 'cors';
import TmpFileManager from './TmpFileManager';
import TaskHelper from './TaskHelper';
import RunnerHelper from './RunnerHelper';
import DatabaseManager from '../database/DatabaseManager';
import AuthService from './auth/AuthService';
import { checkToken } from '../util/authentication';

class Server {
  port: string;

  apiRoot: string;

  languages: Array<string>;

  fileManager: TmpFileManager;

  runnerHelper: RunnerHelper;

  db: DatabaseManager;

  private authService: AuthService;

  app;

  router;

  constructor(
    port: string,
    languages: Array<string>,
    runnerHelper: RunnerHelper,
    fileManager: TmpFileManager,
    database: DatabaseManager,
    authService: AuthService,
  ) {
    this.port = port;
    this.apiRoot = '/api';
    this.languages = languages;
    this.runnerHelper = runnerHelper;
    this.fileManager = fileManager;
    this.authService = authService;
    this.db = database;
    // Create the Express app & setup middlewares
    this.app = express();
    // Setup the JSON format for the responses and requests
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cors({
      origin: process.env.DOMAIN_NAME,
      credentials: true,
    }));
    // Configure routes
    this.router = express.Router();
    // Add 'api` prefix to all routes
    this.app.use(this.apiRoot, this.router);
  }

  listen() {
    this.app.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server listening on port ${this.port}`);
    });
  }

  defineEndpoints() {
    this.router.post(
      '/run',
      body('language')
        .exists()
        .withMessage('Language parameter missing')
        .bail()
        .isString()
        .withMessage('Language parameter must be a string')
        .bail()
        .isIn(this.languages)
        .withMessage('Specified language not supported'),
      body('code')
        .exists()
        .withMessage('code parameter missing')
        .bail()
        .isString()
        .withMessage('code parameter must be a string'),
      body('userId')
        .exists()
        .withMessage('userId parameter missing')
        .bail()
        .isInt()
        .withMessage('userId parameter must be an integer'),
      body('taskId')
        .exists()
        .withMessage('taskId parameter missing')
        .bail()
        .isInt()
        .withMessage('taskId parameter must be an integer'),
      async (req: express.Request, res: express.Response) => {
        if (!checkToken(req)) return res.status(401).json('Authentication required!');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        // Create file given by user
        try {
          const file = await this.fileManager.codeFileCreate(req.body.language, req.body.code);
          const task = await this.db.tasks.findOne({
            where: { id: req.body.taskId },
            relations: ['testCases'],
          });
          if (task == null) {
            throw new Error('Provided task was not found!');
          }
          const results = await this.runnerHelper.getRunnerResults(
            task.testCases,
            file.path,
            req.body.language,
          );
          const response = TaskHelper.runTest(results, task);
          file.cleanupCallback();
          return res.json(response);
        } catch (e) {
          if (e instanceof Error) {
            return res.status(400).json({ error: e.message });
          }
          return res.status(400).json({ error: 'Unknown error occurred' });
        }
      },
    );

    this.router.post(
      '/createTask',
      body('description')
        .exists()
        .withMessage('description parameter missing')
        .bail()
        .isString()
        .withMessage('description parameter must be a string'),
      body('title')
        .exists()
        .withMessage('title parameter missing')
        .bail()
        .isString()
        .withMessage('title parameter must be a string'),
      body('userId')
        .exists()
        .withMessage('userId parameter missing')
        .bail()
        .isInt()
        .withMessage('userId parameter must be an integer'),
      body('testCases')
        .exists()
        .withMessage('testCases parameter missing')
        .bail()
        .isArray()
        .withMessage('testCases must be an array')
        .bail(),
      async (req: express.Request, res: express.Response) => {
        if (!checkToken(req)) return res.status(401).json('Authentication required!');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const sanitzedTestCases = TaskHelper.sanitizeTestCases(req.body.testCases);
        const user = await this.db.users.findOneBy({ id: req.body.userId });
        try {
          if (user == null) throw new Error('User not found!');
          const task = await this.db.tasks.save(
            this.db.tasks.create({
              title: req.body.title,
              description: req.body.description,
              testCases: sanitzedTestCases,
              user,
            }),
          );
          return res.status(201).json(task);
        } catch (e) {
          if (e instanceof Error) {
            return res.status(400).json({ error: e.message });
          }
          return res.status(400).json({ error: 'Unknown error occurred' });
        }
      },
    );

    this.router.get(
      '/getTask',
      query('id')
        .exists()
        .withMessage('id parameter missing')
        .bail()
        .isInt()
        .withMessage('id parameter must be an integer'),
      async (req: express.Request, res: express.Response) => {
        if (!checkToken(req)) return res.status(401).json('Authentication required!');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const task = await this.db.tasks.findOne({
          where: { id: req.query.id as string },
          relations: ['testCases'],
        });
        if (task) return res.json(task);
        return res.status(404).json({ error: 'Task not found' });
      },
    );

    this.router.get('/getAllTasks', async (req: express.Request, res: express.Response) => {
      if (!checkToken(req)) return res.status(401).json('Authentication required!');
      try {
        const tasks = await this.db.tasks.find();
        return res.json(tasks);
      } catch (e) {
        if (e instanceof Error) {
          return res.status(404).json({ error: e.message });
        }
        return res.status(400).json({ error: 'Unknown error occurred' });
      }
    });

    this.router.post('/auth/registerUser', this.authService.registerUser.bind(this.authService));
    this.router.post('/auth/loginUser', this.authService.loginUser.bind(this.authService));
  }
}

export default Server;
