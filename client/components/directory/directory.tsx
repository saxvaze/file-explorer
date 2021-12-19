import React from "react";
import IDirectoryItem from "../../common/models/directory-item";
import AppStateService from "../../common/services/app-state.service";
import FileSystemServcie from "../../common/services/file-system.service";
import DirectoryItem from "../directory-item/directory-item";
import DirectoryProps from "./directory.props";
import "./directory.scss";

class Directory extends React.Component<DirectoryProps, DirectoryProps> {
  constructor(props: any) {
    super(props);

    this.state = { ...this.props };
  }

  handleDoubleClick(directory: IDirectoryItem): void {
    if (directory.isDirectory === true) {
      FileSystemServcie.openFolder({ folder: `${directory.location}\\${directory.name}`, forColumn: this.props.myColumnIndex });
    }
    else {
      FileSystemServcie.openFile(`${directory.location}\\${directory.name}`)
    }
  }

  handleClick(directory: IDirectoryItem): void {
    this.props.content.forEach(directory => directory.selected = false);

    directory.selected = true;

    this.setState({ ... this.state });

    if (directory.isDirectory) {
      this.getDataForNextTab(directory);
    }
  }

  private getDataForNextTab(directory: IDirectoryItem): void {
    // if I'm not the last tab
    if (this.props.myColumnIndex != 3) {
      // get data for next tab
      FileSystemServcie.openFolder({ folder: `${directory.location}\\${directory.name}`, forColumn: this.props.myColumnIndex + 1 });
    }
  }

  goBack(): void {
    if (!this.props.content) {
      return;
    }

    let currentDirectory = this.props.content[0].location,
      splitted = currentDirectory.split('\\');

    // remove current folder
    splitted.pop();

    FileSystemServcie.openFolder({ folder: splitted.join("\\"), forColumn: 1 })
  }

  render(): JSX.Element {
    let goBack = <div onDoubleClick={() => this.goBack()} className="go-back">Go Back</div>;

    if (this.props.myColumnIndex != 1) {
      goBack = <div></div>;
    }
    return (
      <>
        {goBack}
        {this.props.content?.map(directory => (
          <div onDoubleClick={() => this.handleDoubleClick(directory)} key={directory.name}>
            <div onClick={() => this.handleClick(directory)}>
              <DirectoryItem directory={directory} />
            </div>
          </div>
        ))}
      </>
    );
  }
}

export default Directory;