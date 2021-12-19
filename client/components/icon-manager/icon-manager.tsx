import React from "react";
import IDirectoryItem from "../../common/models/directory-item";
import "./icon-manager.scss";

class IconManager extends React.Component<{ item: IDirectoryItem }> {
  render(): JSX.Element {
    let iconElement;

    if (this.props.item.isDirectory) {
      iconElement = <div className="icon icon-directory"></div>
    }
    else {
      switch (this.props.item.extension) {
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'gif':
          iconElement = <div className="icon icon-image"></div>
          break;
        case 'js':
          iconElement = <div className="icon icon-js"></div>
          break;
        case 'html':
          iconElement = <div className="icon icon-html"></div>
          break;
        case 'css':
        case 'scss':
          iconElement = <div className="icon icon-css"></div>
          break;
        case 'json':
        case 'xml':
        case 'java':
        case 'py':
        case 'cs':
        case 'cpp':
        case 'go':
          iconElement = <div className="icon icon-code"></div>
          break;
        case 'mp3':
        case 'aac':
        case 'mmf':
        case 'ogg':
        case 'wav':
        case 'wma':
        case 'webm':
          iconElement = <div className="icon icon-audio"></div>
          break;
        case 'mp4':
        case 'mov':
        case 'wmv':
        case 'flv':
        case 'avi':
        case 'mkv':
          iconElement = <div className="icon icon-video"></div>
          break;
        default:
          iconElement = <div className="icon icon-blank"></div>
          break;
      }
    }

    return (
      <>
        {iconElement}
      </>
    );
  }
}

export default IconManager;
