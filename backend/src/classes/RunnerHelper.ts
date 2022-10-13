import ITest from '../interfaces/ITest';
import CodeRunner from './CodeRunner';

class RunnerHelper {
  languages: Array<string>;

  codeRunners: { [key: string]: CodeRunner; } = {};

  fileExtensions: { [key: string]: string } = {
    python: '.py',
  };

  constructor(languages: Array<string>) {
    this.languages = languages;
  }

  initalizeRunners() {
    for (let index = 0; index < this.languages.length; index += 1) {
      const language = this.languages[index];
      this.codeRunners[language] = new CodeRunner(language);
      this.codeRunners[language].buildContainer();
    }
  }

  async getRunnerResults(
    testCases: Array<ITest>,
    path: string,
    language:string,
  ) {
    const runner : CodeRunner = this.getRunner(language);
    const promises = new Array<Promise<string>>();
    for (let index = 0; index < testCases.length; index += 1) {
      promises[index] = runner.runContainer(
        path,
        testCases[index].input,
      );
    }
    const result = await Promise.all(promises);
    return result;
  }

  getRunner(language: string): CodeRunner {
    if (!this.codeRunners[language]) throw new Error(`Cannot find runner for ${language}`);
    return this.codeRunners[language];
  }
}

export default RunnerHelper;
