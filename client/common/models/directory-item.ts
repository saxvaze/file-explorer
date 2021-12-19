interface IDirectoryItem {
    name: string;
    extension?: string;
    selected: boolean;
    isDirectory?: boolean;
    location: string;
}

export default IDirectoryItem