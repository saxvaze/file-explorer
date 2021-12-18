"use strict";
exports.__esModule = true;
exports.MainProcess = void 0;
var electron_1 = require("electron");
var path = require("path");
var isDev = require("electron-is-dev");
var MainProcess = /** @class */ (function () {
    function MainProcess() {
    }
    MainProcess.prototype.init = function () {
        var _this = this;
        this.appReady()
            .then(function () {
            _this.createWindow(_this.getWindowConfig());
            _this.setActivateHandler();
            _this.setWindowCloseHandler();
        });
    };
    /**
     * @description creates new instance of BrowserWindow
     * @param config BrowserWindowConstructorOptions
     * @returns instance of newly created BrowserWindow
     */
    MainProcess.prototype.createWindow = function (config) {
        var window = new electron_1.BrowserWindow(config);
        window.loadURL(isDev
            ? 'http://localhost:3000'
            : "file://".concat(path.join(__dirname, '../build/index.html')));
        return window;
    };
    MainProcess.prototype.appReady = function () {
        return electron_1.app.whenReady();
    };
    MainProcess.prototype.getWindowConfig = function () {
        return {
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
                nodeIntegration: true,
                contextIsolation: false
            }
        };
    };
    /**
     * @description On macOS it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
     * @returns void
     */
    MainProcess.prototype.setActivateHandler = function () {
        var _this = this;
        electron_1.app.on('activate', function () {
            if (electron_1.BrowserWindow.getAllWindows().length === 0) {
                _this.createWindow(_this.getWindowConfig());
            }
        });
    };
    /**
     * @description Quit when all windows are closed, except on macOS.
     * @returns void
     */
    MainProcess.prototype.setWindowCloseHandler = function () {
        electron_1.app.on('window-all-closed', function () {
            if (process.platform !== 'darwin') {
                electron_1.app.quit();
            }
        });
    };
    return MainProcess;
}());
exports.MainProcess = MainProcess;
