import IDirectoryItem from "./directory-item";

interface AppState {
    content?: {
        first: Array<IDirectoryItem>,
        second?: Array<IDirectoryItem>,
        third?: Array<IDirectoryItem>
    },
    activeColumn?: number
}

export default AppState;