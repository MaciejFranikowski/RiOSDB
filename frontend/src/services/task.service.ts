/* eslint-disable import/prefer-default-export */
import { Task, DBTask } from '../interfaces/task';
import { authenticate } from './auth.service';

const API_URL = '/api/';

export async function createTask(task: Task): Promise<DBTask> {
  const headers = [
    ['Content-Type', 'application/json'],
  ];
  const response: Response = await fetch(`${API_URL}createTask`, {
    headers: authenticate(headers),
    method: 'POST',
    body: JSON.stringify({
      title: task.title,
      description: task.description,
      testCases: task.testcases.map((tc) => ({
        desiredOutput: tc.desiredOutput,
        input: tc.input,
      })),
      userId: task.user.id,
    }),
  });

  if (response.status === 201) {
    return response.json();
  }
  throw new Error('Could not create new task!');
}
