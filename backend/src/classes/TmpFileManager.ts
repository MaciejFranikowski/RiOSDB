import { writeFile } from 'fs';
import tmp from 'tmp';
import { ITmpFile } from '../interfaces/ITmpFile';

class TmpFileManager {
  fileExtensions: { [key: string]: string } = {
    python: '.py',
  };

  async codeFileCreate(
    languageName: string,
    fileContents: string,
  ): Promise<ITmpFile> {
    return new Promise((resolve, reject) => {
      // Create tmp file
      const options = {
        postfix: this.fileExtensions[languageName],
        keep: true,
      };
      tmp.file(
        options,
        (err: Error | null, path: string, fd: number, cleanupCallback: () => void) => {
          if (err) reject(err);
          writeFile(path, fileContents, (error: Error | null) => {
            if (error) throw error;
          });
          resolve({ cleanupCallback, path });
        },
      );
    });
  }
}

export default TmpFileManager;
