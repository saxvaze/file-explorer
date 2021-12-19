import React from "react";
import AppState from "../../common/models/app-state";
import AppStateService from "../../common/services/app-state.service";
import Directory from "../directory/directory";
import DirectoryColumnsProps from "./directory-columns.props";
import "./directory-columns.scss";

class DirectoryColumns extends React.Component<{}, DirectoryColumnsProps> {
  componentDidMount() {
    this.subscribeAppState();
  }

  private subscribeAppState(): void {
    AppStateService.getState()
      .subscribe((state: AppState) => {
        this.setState({ content: { ...this.state?.content, ...state?.content } });
      })
  }

  render(): JSX.Element {
    return (
      <>
        <div className="column-wrapper">
          <div className="columnt">
            <Directory content={this.state?.content.first} myColumnIndex={1} />
          </div>
          <div className="columnt">
            <Directory content={this.state?.content.second} myColumnIndex={2} />
          </div>
          <div className="columnt">
            <Directory content={this.state?.content.third} myColumnIndex={3} />
          </div>
        </div>
      </>
    );
  }
}

export default DirectoryColumns;