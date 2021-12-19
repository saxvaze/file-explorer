const Utils: any = {};

/**
 * @description this polyfill enables app to launch in browser as well, otherwise ipcRenderer is undefined
 * @returns object with signature of ipcRenderer
 */
Utils.getPolygillForBrowser = () => {
  return {
    on: () => { },
    send: () => { }
  }
}
Utils.ipcRenderer = (window as any).electron?.ipcRenderer || Utils.getPolygillForBrowser();

export default Utils;