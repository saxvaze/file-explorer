import React from "react";
import IDirectoryItem from "../../common/models/directory-item";
import FileSystemServcie from "../../common/services/file-system.service";
import DirectoryItem from "../directory-item/directory-item";
import DirectoryProps from "./directory.props";
import "./directory.scss";

class Directory extends React.Component<DirectoryProps> {
  handleClick(directory: IDirectoryItem): void {
    if (directory.isDirectory === true) {
      FileSystemServcie.openFolder(`${directory.location}\\${directory.name}`);
    }
    else {
      FileSystemServcie.openFile(`${directory.location}\\${directory.name}`)
    }
  }

  goBack(): void {
    let currentDirectory = this.props.content[0].location,
      splitted = currentDirectory.split('\\');

    // remove current folder
    splitted.pop();

    FileSystemServcie.openFolder(splitted.join("\\"))
  }

  render(): JSX.Element {
    return (
      <>
        <div onClick={() => this.goBack()} className="go-back">Go Back</div>
        {this.props.content?.map(directory => (
          <div onClick={() => this.handleClick(directory)} key={directory.name}>
            <DirectoryItem directory={directory} />
          </div>
        ))}
      </>
    );
  }
}

export default Directory;