import React from "react";
import Directory from "../directory/directory";
import DirectoryColumnsProps from "./directory-columns.props";

class DirectoryColumns extends React.Component<DirectoryColumnsProps> {
  render(): JSX.Element {
    return (
      <>
        <Directory content={this.props.content.first} />
        <Directory content={this.props.content.second} />
        <Directory content={this.props.content.third} />
      </>
    );
  }
}

export default DirectoryColumns;