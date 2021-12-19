import IDirectoryItem from "../../common/models/directory-item";

interface DirectoryColumnsProps {
  content: {
    first: Array<IDirectoryItem>,
    second: Array<IDirectoryItem>,
    third: Array<IDirectoryItem>
  }
  // first: { content: Array<IDirectoryItem> },
  // second?: { content: Array<IDirectoryItem> },
  // third?: { content: Array<IDirectoryItem> }
}

export default DirectoryColumnsProps;