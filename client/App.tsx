import React from 'react';
import logo from './logo.svg';
import './App.css';
import IpcService from './common/services/ipc.service';

class App extends React.Component {
  constructor(props: any) {
    super(props);
  }

  componentDidMount(): void {
    this.hostPingListener();
    this.pingServer();
  }

  private hostPingListener(): void {
    IpcService.on('ipc-ping')
      .then(data => {
        console.log("111", data);
      });
  }

  private pingServer(): void {
    IpcService.send('ipc-ping', 'ping');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
