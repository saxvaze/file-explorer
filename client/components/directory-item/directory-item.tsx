import React from "react";
import IDirectoryItem from "../../common/models/directory-item";
import IconManager from "../icon-manager/icon-manager";
import "./directory-item.scss";

class DirectoryItem extends React.Component<{ directory: IDirectoryItem }> {
  render(): JSX.Element {
    return (
      <>
        <div key={this.props.directory.name} className="wrapper">
          <IconManager item={this.props.directory} />
          <div className="directory-item-name">{this.props.directory.name}</div>
        </div>
      </>
    );
  }

}

export default DirectoryItem;