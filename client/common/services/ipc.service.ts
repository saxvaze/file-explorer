import Utils from "../utils"

/**
 * @description wrapper for ipcRenderer
 */
const IpcService = {
  /**
   * @returns instance of ipcRenderer
   */
  getIpc: () => {
    return Utils.ipcRenderer;
  },
  /**
   * @description listener for ipc channel
   * @param channel name of channel
   * @returns Promise
   */
  on: (channel: string) => {
    return new Promise(resolve => {
      IpcService.getIpc().on(channel, (event: any, data: any) => {
        console.log(event);

        resolve(event)
      })
    })
  },
  /**
   * @description sends message via ipc to main process
   * @param channel name of channel
   * @param message type any
   * @returns void
   */
  send: (channel: string, message: any) => {
    IpcService.getIpc().send(channel, message)
  }
}

export default IpcService;