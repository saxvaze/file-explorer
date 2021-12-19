import IDirectoryItem from "./directory-item";

interface FileSystemGenericResponse {
    content: Array<IDirectoryItem>,
    forColumn: number;
}

export default FileSystemGenericResponse;