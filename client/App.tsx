import React from 'react';
import IpcService from './common/services/ipc.service';
import FileSystemServcie from './common/services/file-system.service';
import DirectoryColumns from './components/directory-columns/directory-columns';
import IDirectoryItem from './common/models/directory-item';
import AppStateService from './common/services/app-state.service';
import FileSystemGenericResponse from './common/models/file-system-generic-response';

class App extends React.Component {
  componentDidMount(): void {
    this.hostPingListener()
      .then(() => {
        this.subscribeFileSystem();
        this.getRootFolder();
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

      AppStateService.updateState(state)
    });
  }

  private getRootFolder(): void {
    FileSystemServcie.openRootFolder();
  }

  render(): JSX.Element {
    return (
      <>
        <DirectoryColumns />
        {/* <DirectoryColumns content={{
          first: this.state.content,
          second: [],
          third: []
        }} /> */}
      </>
    );
  }
}

export default App;
