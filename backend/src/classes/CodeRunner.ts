// const { exec } = require('child_process');
import { exec } from 'child_process';

class CodeRunner {
  fileExtensions: { [key: string]: string } = {
    python: '.py',
  };

  languageName : string;

  constructor(languageName: string) {
    this.languageName = languageName;
  }

  buildContainer(): Promise<string> {
    return CodeRunner.execShellRun(`docker build -t ${this.languageName} ./docker/${this.languageName}`);
  }

  runContainer(
    filePath: string,
    input: string,
  ): Promise<string> {
    const regex = /\/(?:.(?!\/))+$/;
    const fileNameRegex = regex.exec(filePath);
    if (fileNameRegex === null) {
      throw new Error(`Regex failed to find file: ${filePath}`);
    }
    const fileName = fileNameRegex[0].replace('/', '');
    return CodeRunner.execShellRun(`docker run --rm --read-only -v ${filePath}:/workspace/${fileName} ${this.languageName} ${fileName} "${input}"`);
  }

  static execShellRun(command: string):Promise<string> {
    return new Promise((resolve, reject) => {
      exec(
        command,
        {},
        (err: Error | null, stdout: string) => {
          if (err) {
            // Finds all text until ",\s
            const rExp = /^[^]*", /g;
            const matches = err.message.match(rExp);
            if (matches) {
              const trimmedErr = new Error(err.message.replace(matches[0], ''));
              reject(trimmedErr);
            }
            reject(err);
          }
          resolve(stdout);
        },
      );
    });
  }
}

export default CodeRunner;
