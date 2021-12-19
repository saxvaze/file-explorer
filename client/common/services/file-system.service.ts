import IpcService from './ipc.service';

const FileSystemServcie = {
    getFileSystem: (callback: Function) => {
        return IpcService.on('file-system', callback);
    },
    openRootFolder: () => {
        IpcService.send('file-system', { folder: '/', forColumn: 1 });
    },
    openFolder: (data: { folder: string, forColumn: number }) => {
        IpcService.send('file-system', data);
    },
    openFile: (fileFullPath: string) => {
        IpcService.send('file-open', fileFullPath);
    },
    deleteFile: (data: { fileFullPath: string, columnIndex: number }) => {
        IpcService.send('file-delete', data);
    },
    fileDeleted: (callback: Function) => {
        return IpcService.on('file-deleted', callback);
    }
};

export default FileSystemServcie;