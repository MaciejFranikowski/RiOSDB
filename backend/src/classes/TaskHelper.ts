import ITask from '../interfaces/ITask';
import ITest from '../interfaces/ITest';

class TaskHelper {
  static runTest(runResults: string[], task: ITask) {
    const taskContents = task.testCases;
    const result = [];
    for (let index = 0; index < task.testCases.length; index += 1) {
      result[index] = {
        input: taskContents[index].input,
        output: runResults[index],
        desiredOutput: taskContents[index].desiredOutput,
        result: taskContents[index].desiredOutput === runResults[index] ? 'Passed' : 'Failed',
      };
    }
    return result;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static sanitizeTestCases(testCases: any) {
    const sanitzedTestCases = testCases;
    sanitzedTestCases.forEach((testCase: ITest) => {
      const { desiredOutput } = testCase;
      // eslint-disable-next-line no-param-reassign
      testCase.desiredOutput = desiredOutput.endsWith('\n') ? desiredOutput : desiredOutput.concat('\n');
    });
    return sanitzedTestCases;
  }
}

export default TaskHelper;
