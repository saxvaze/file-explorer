import IpcService from './ipc.service';

const FileSystemServcie = {
    getFileSystem: (callback: Function) => {
        return IpcService.on('file-system', callback);
    },
    openRootFolder: () => {
        IpcService.send('file-system', '/');
    },
    openFolder: (folder: string) => {
        IpcService.send('file-system', folder);
    },
    openFile: (fileFullPath: string) => {
        IpcService.send('file-open', fileFullPath);
    }
};

export default FileSystemServcie;