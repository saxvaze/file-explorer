import React from 'react';
import IpcService from './common/services/ipc.service';
import FileSystemServcie from './common/services/file-system.service';
import DirectoryColumns from './components/directory-columns/directory-columns';
import IDirectoryItem from './common/models/directory-item';

interface AppState {
  title: string,
  content: Array<any>
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      title: "this is title",
      content: []
    };
  }

  componentDidMount(): void {
    this.hostPingListener()
      .then(() => {
        this.subscribeFileSystem();
        this.getRootFolder();
      })
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
    FileSystemServcie.getFileSystem((response: Array<IDirectoryItem>) => {
      this.setState({ ...this.state, content: response });
    });
  }

  private getRootFolder(): void {
    FileSystemServcie.openRootFolder();
  }

  render(): JSX.Element {
    return (
      <>
        <DirectoryColumns content={{
          first: this.state.content,
          second: [],
          third: []
        }} />
      </>
    );
  }
}

export default App;
