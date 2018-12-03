import React, { Component } from 'react';


class Controls extends Component {

  onFileImportChange = e => {
    const reader = new FileReader();
    reader.readAsText(e.target.files[0]);
    reader.onload = e => {
      var content = e.target.result;
      this.props.onImportData(content);
    };
  }
  render() {
    return (
      <div>
        <button style={{ float: "right" }} className="button-danger pure-button" onClick={this.props.onResetData}>Reset data</button>
        <div className="u-margin-bottom">
          <button className="button-warning pure-button" onClick={() => document.getElementById("fileInput").click()}>
            Import json
          </button>
          <button className="button-secondary pure-button u-margin-left" onClick={this.props.onExportJson}>
            Export json
          </button>
          <button className="button-secondary pure-button u-margin-left" onClick={this.props.onExportTxt}>
            Export txt
          </button>
          <input type="file" id="fileInput" className="u-display-none" onChange={this.onFileImportChange}/>
        </div>
      </div>);
  }
}

export default Controls;
