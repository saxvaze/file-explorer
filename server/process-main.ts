import { BrowserWindow, BrowserWindowConstructorOptions, app } from "electron";
import * as path from "path";
import * as isDev from 'electron-is-dev';
import { BaseProcess } from "./models/base-process";

export class MainProcess implements BaseProcess {
    public init(): void {
        this.appReady()
            .then(() => {
                this.createWindow(this.getWindowConfig());

                this.setActivateHandler();
                this.setWindowCloseHandler();
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
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
                nodeIntegration: true,
                contextIsolation: false
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
}