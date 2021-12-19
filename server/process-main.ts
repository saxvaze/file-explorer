import { BrowserWindow, BrowserWindowConstructorOptions, app, ipcMain, IpcMainEvent } from "electron";
import * as path from "path";
import * as isDev from 'electron-is-dev';
import * as preload from "./preload";
import FileSystemController from "./controllers/file-system.controller";

export class MainProcess {
  public init(): void {
    this.appReady()
      .then(() => {
        const window = this.createWindow(this.getWindowConfig());
        window.setMenu(null)

        this.setActivateHandler();
        this.setWindowCloseHandler();
        this.setRendererListeners();

        // Open the DevTools.
        if (isDev) {
          window.webContents.openDevTools();
        }
      });
  }

  /**
   * @description creates new instance of BrowserWindow
   * @param config BrowserWindowConstructorOptions
   * @returns instance of newly created BrowserWindow
   */
  private createWindow(config: BrowserWindowConstructorOptions): BrowserWindow {
    const window = new BrowserWindow(config)

    window.loadURL(
      isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`
    );

    return window;
  }

  private appReady(): Promise<void> {
    return app.whenReady();
  }

  private getWindowConfig(): BrowserWindowConstructorOptions {
    return {
      width: 1024,
      height: 768,
      icon: path.join(__dirname, 'client/public/favicon.png'),
      webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js'),
        // contextIsolation: false
      }
    }
  }

  /**
   * @description On macOS it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
   * @returns void
   */
  private setActivateHandler(): void {
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createWindow(this.getWindowConfig())
      }
    })
  }

  /**
   * @description Quit when all windows are closed, except on macOS.
   * @returns void
   */
  private setWindowCloseHandler(): void {
    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })
  }

  private setRendererListeners(): void {
    ipcMain.on('ipc-ping', (event: IpcMainEvent, message: any) => {
      event.reply('ipc-ping', 'pong');
    });

    ipcMain.on('file-system', (event: IpcMainEvent, message: any) => {
      let directoryPath: string = message;

      if (message == "/") {
        directoryPath = FileSystemController.getRootDirectoryPath();
      }

      FileSystemController.getDirectoryContent(directoryPath)
        .then(response => {
          event.reply('file-system', this.getFormattedDirectoryItems(response, directoryPath));
        })
    })

    ipcMain.on('file-open', (event: IpcMainEvent, message: string) => {
      FileSystemController.openFile(message);
    })
  }

  private getFormattedDirectoryItems(items: Array<{ name: string, isDirectory: boolean }>, filePath: string): Array<any> {
    let result: Array<any> = [];

    items.forEach(item => {
      // is file
      if (item.isDirectory) {
        result.push({
          name: item.name,
          selected: false,
          isDirectory: true,
          location: filePath
        })
      }
      // is directory
      else {
        let splitted = item.name.split('.'),
          extension = splitted.pop() as string,
          name = item.name;

        result.push({
          name: name,
          extension: extension,
          selected: false,
          isDirectory: false,
          location: filePath
        })
      }
    })

    result.sort((a, b) => a.isDirectory ? -1 : 1)

    return result;
  }
}