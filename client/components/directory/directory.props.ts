import IDirectoryItem from "../../common/models/directory-item";

interface DirectoryProps {
  content: Array<IDirectoryItem>,
  myColumnIndex: number;
}

export default DirectoryProps;