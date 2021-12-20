import React from 'react';
import IpcService from './common/services/ipc.service';
import FileSystemServcie from './common/services/file-system.service';
import DirectoryColumns from './components/directory-columns/directory-columns';
import AppStateService from './common/services/app-state.service';
import FileSystemGenericResponse from './common/models/file-system-generic-response';
import { combineLatest, take } from 'rxjs';
import IDirectoryItem from './common/models/directory-item';

class App extends React.Component {
  componentDidMount(): void {
    this.hostPingListener()
      .then(() => {
        this.subscribeFileSystem();
        this.getRootFolder();
        this.hostButtonsListener();
        this.subscribeServerEvents();
      });

    this.pingServer();
  }

  private hostPingListener(): Promise<void> {
    return new Promise(resolver => {
      IpcService.on('ipc-ping', (data: string) => {
        if (data === 'pong') {
          resolver();
        }
      })
    });
  }

  private pingServer(): void {
    IpcService.send('ipc-ping', 'ping');
  }

  private subscribeFileSystem(): void {
    FileSystemServcie.getFileSystem((response: FileSystemGenericResponse) => {
      let forColumn = response.forColumn == 1 ? 'first' : response.forColumn == 2 ? 'second' : 'third',
        state: any = { content: {} };

      state.content[forColumn] = response.content;

      if (response.forColumn == 1) {
        state.content.second = [];
        state.content.third = [];
      }
      else if (response.forColumn == 2) {
        state.content.third = [];
      }

      AppStateService.updateState(state);
    });
  }

  private getRootFolder(): void {
    FileSystemServcie.openRootFolder();
  }

  private hostButtonsListener(): void {
    document.addEventListener("keydown", ({ key }) => {
      if (key === "Delete") {
        AppStateService.getSelectedFile()
          .pipe(take(1))
          .subscribe(file => {
            if (file?.fileFullPath) {
              FileSystemServcie.deleteFile(file);
            }
          })
      }
      else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(key) > -1) {
        combineLatest([AppStateService.getSelectedFile(), AppStateService.getState()])
          .pipe(take(1))
          .subscribe(([file, appState]) => {
            let newState = { ...appState };

            // file is alreadySelected
            if (file?.fileFullPath && file?.columnIndex > -1) {
              switch (key) {
                case 'ArrowDown':
                  var columnIndex = file.columnIndex == 1 ? 'first' : file.columnIndex == 2 ? 'second' : 'third',
                    targetColumnContent: Array<IDirectoryItem> = (newState.content as any)[columnIndex];

                  if (targetColumnContent) {
                    for (let i = 0; i < targetColumnContent.length; i++) {
                      if (targetColumnContent[i].selected && targetColumnContent[i + 1]) {
                        targetColumnContent[i].selected = false;
                        targetColumnContent[i + 1].selected = true;

                        AppStateService.selectFile(
                          `${targetColumnContent[i + 1].location}\\${targetColumnContent[i + 1].name}`,
                          file.columnIndex);

                        if (targetColumnContent[i + 1].isDirectory && file.columnIndex < 3) {
                          FileSystemServcie.openFolder({
                            folder: `${targetColumnContent[i + 1].location}\\${targetColumnContent[i + 1].name}`,
                            forColumn: file.columnIndex + 1
                          });
                        }
                        break;
                      }
                    }
                  }
                  break;
                case 'ArrowUp':
                  var columnIndex = file.columnIndex == 1 ? 'first' : file.columnIndex == 2 ? 'second' : 'third',
                    targetColumnContent: Array<IDirectoryItem> = (newState.content as any)[columnIndex];

                  if (targetColumnContent) {
                    for (let i = 0; i < targetColumnContent.length; i++) {
                      if (targetColumnContent[i].selected && targetColumnContent[i - 1]) {
                        targetColumnContent[i].selected = false;
                        targetColumnContent[i - 1].selected = true;

                        AppStateService.selectFile(
                          `${targetColumnContent[i - 1].location}\\${targetColumnContent[i - 1].name}`,
                          file.columnIndex);

                        if (targetColumnContent[i - 1].isDirectory) {
                          FileSystemServcie.openFolder({
                            folder: `${targetColumnContent[i - 1].location}\\${targetColumnContent[i - 1].name}`,
                            forColumn: file.columnIndex + 1
                          });
                        }
                        break;
                      }
                    }
                  }
                  break;
                case 'ArrowRight':
                  if (file.columnIndex < 3) {
                    let columnIndex = file.columnIndex == 1 ? 'second' : 'third',
                      targetColumn = (newState.content as any)[columnIndex][0];

                    targetColumn.selected = true;
                    AppStateService.selectFile(`${targetColumn.location}\\${targetColumn.name}`, file.columnIndex + 1);

                    if (targetColumn.isDirectory && file.columnIndex == 1) {
                      FileSystemServcie.openFolder({
                        folder: `${targetColumn.location}\\${targetColumn.name}`,
                        forColumn: 3
                      });
                    }
                  }
                  break;
                case 'ArrowLeft':
                  if (file.columnIndex > 1) {
                    var columnIndex = file.columnIndex == 2 ? 'first' : 'second';

                    (newState.content as any)[columnIndex].forEach((item: any) => item.selected = false);
                    let targetColumn = (newState.content as any)[columnIndex][0];

                    targetColumn.selected = true;
                    AppStateService.selectFile(`${targetColumn.location}\\${targetColumn.name}`, file.columnIndex - 1);
                  }
                  break;
              }

              AppStateService.updateState(newState);
            }
            else if (key == 'ArrowDown' && (newState.content?.first?.length as any) > 0) {
              let target = (newState.content as any).first[0];
              target.selected = true;

              AppStateService.selectFile(`${target.location}\\${target.name}`, 1)
              AppStateService.updateState(newState);
              FileSystemServcie.openFolder({
                folder: `${target.location}\\${target.name}`,
                forColumn: 2
              });
            }
          })
      }
      else if (key == 'Enter') {
        combineLatest([AppStateService.getSelectedFile(), AppStateService.getState()])
          .pipe(take(1))
          .subscribe(([file, appState]) => {
            let newState = { ...appState };
            let columnIndex = file.columnIndex == 1 ? 'first' : file.columnIndex == 2 ? 'second' : 'third';
            let targetColumnContent: Array<IDirectoryItem> = (newState.content as any)[columnIndex];

            // file is alreadySelected
            if (file?.fileFullPath && file?.columnIndex > -1) {
              let targetFile = targetColumnContent.find(item => item.selected)
              if (!targetFile?.isDirectory) {
                FileSystemServcie.openFile(`${targetFile?.location}\\${targetFile?.name}`);
              }
              else {
                FileSystemServcie.openFolder({
                  folder: `${targetFile?.location}\\${targetFile?.name}`,
                  forColumn: file?.columnIndex
                })
              }
            }
          });
      }
    })
  }

  private subscribeServerEvents(): void {
    FileSystemServcie.fileDeleted((response: { fileFullPath: string, columnIndex: number }) => {
      if (response.columnIndex > -1) {

        let splitted = response.fileFullPath.split('\\');
        splitted.pop();

        FileSystemServcie.openFolder({ folder: splitted.join('\\'), forColumn: response.columnIndex });
      }

      AppStateService.selectFile('', 0)
    })
  }

  render(): JSX.Element {
    return (
      <>
        <DirectoryColumns />
      </>
    );
  }
}

export default App;
