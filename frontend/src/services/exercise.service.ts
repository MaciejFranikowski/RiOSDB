import { Test } from '../interfaces/run';
import { authenticate } from './auth.service';

const API_URL = '/api/';

export async function getExercise(id: number) {
  const response: Response = await fetch(`${API_URL}getTask?id=${id}`, {
    headers: authenticate([]),
    method: 'GET',
  });
  if (response.status === 200) {
    const responseData = await response.json();
    const exerciseInfo = { title: responseData.title, description: responseData.description };
    return exerciseInfo;
  }
  throw new Error('Invalid Task ID');
}

export async function getAllExercises() {
  const response: Response = await fetch(`${API_URL}getAllTasks`, {
    headers: authenticate([]),
    method: 'GET',
  });
  if (response.status === 200) {
    const responseData = await response.json();
    return responseData;
  }
  throw new Error('Unable to fetch Exercises');
}

export async function executeCode(code: string, language: string, exerciseID: string) {
  const response: Response = await fetch(`${API_URL}run`, {
    headers: authenticate([
      ['Content-Type', 'application/json'],
    ]),
    method: 'POST',
    body: JSON.stringify({
      language,
      taskId: exerciseID,
      userId: '1',
      code,
    }),
  });
  if (response.status === 200) {
    const responseData = await response.json();
    const tests: Test[] = [];
    Object.keys(responseData).forEach((key) => {
      const test = responseData[key];
      tests.push({
        id: parseInt(key, 10),
        input: test.input,
        expectedOutput: test.desiredOutput,
        output: test.output,
        isPassed: test.result,
      });
    });
    const newRunInfo = {
      executionTime: 0.0,
      tests,
    };
    return newRunInfo;
  }
  if (response.status === 400) {
    const responseData = await response.json();
    throw new Error(responseData.error);
  }
  throw new Error('Execution error');
}
