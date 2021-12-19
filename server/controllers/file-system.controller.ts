import * as OS from 'os';
import * as fs from 'fs';
import * as path from 'path';
import { shell } from 'electron';

const FileSystemController = {
  getRootDirectoryPath: () => {
    return OS.homedir();
  },
  getDirectoryContent: (directoryPath: string) => {
    return new Promise<Array<{ name: string, isDirectory: boolean }>>(resolve => {
      fs.readdir(directoryPath, (err: NodeJS.ErrnoException, files: string[]) => {
        if (err) {
          resolve(null);
        }

        let result = [];
        files.forEach(file => {
          result.push({
            name: file,
            isDirectory: fs.lstatSync(path.resolve(directoryPath, file)).isDirectory()
          });
        });

        resolve(result);
      });
    });
  },
  openFile: (fileFullPath: string) => {
    shell.openPath(fileFullPath);
  }
};

export default FileSystemController