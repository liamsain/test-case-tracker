import React, { Component } from "react";
import "./App.css";
import Table from "./Components/Table";
import Controls from "./Components/Controls";
import StatusDot from "./Components/StatusDot";
import { csvFileHeader } from "./Constants/csvFileHeader";
import { getNewCaseRow } from './Constants/newCaseRow';

class App extends Component {
  constructor() {
    super();
    this.state = {
      rows: []
    };
    if (typeof window !== "undefined") {
      if (
        window.localStorage["test-cases"] &&
        window.localStorage["test-cases"].length > 0
      ) {
        this.state = JSON.parse(window.localStorage["test-cases"]);
      }
    }
  }

  onChange = (e, index) => {
    const newState = this.state;
    if (e.target.type === "checkbox") {
      newState.rows[index][e.target.name] = !newState.rows[index][
        e.target.name
      ];
    } else {
      newState.rows[index][e.target.name] = e.target.value;
    }
    this.setState(newState);
    window.localStorage["test-cases"] = JSON.stringify(newState);
  };

  onDelete = id => {
    const newState = this.state;
    newState.rows = this.state.rows.filter((x, i) => i !== id);
    this.setState(newState);
    window.localStorage["test-cases"] = JSON.stringify(newState);
  };

  onAddNewRow = () => {
    const newState = this.state;
    const id = newState.rows.length + 1;
    newState.rows.push(getNewCaseRow(id));
    this.setState(newState);
  };

  exportData = (filename, content) => {
    var el = document.createElement("a");
    el.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(content)
    );
    el.setAttribute("download", filename);
    el.style.display = "none";
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
  };
  exportJson = () => {
    this.exportData("test-cases.json", JSON.stringify(this.state, null, "\t"));
  };
  exportTxt = () => {
    var txtFileContent = this.state.rows
      .map(
        x =>
          `${x.case}\r\nExpected result: ${
            x.expectedResult
          }\r\nActual result: ${x.actualResult}\r\nStatus: ${x.status}\r\n-----`
      )
      .join("\r\n");
    this.exportData("test-cases.txt", txtFileContent);
  };
  exportCsv = () => {
    let csvFileContent = csvFileHeader;

    this.state.rows.forEach(rowObj => {
      let str = "";
      for (var prop in rowObj) {
        str += "\"" + rowObj[prop] + "\",";
      }
      str += "\r\n";
      csvFileContent += str;
    });
    this.exportData("test-cases.csv", csvFileContent);
  };

  importJson = json => {
    this.setState(json);
    window.localStorage["test-cases"] = JSON.stringify(json);
  };

  clearCache = () => {
    window.localStorage["test-cases"] = "";
    this.setState({ rows: [] });
  };

  addButtonIsDisabled = () => {
    const rows = this.state.rows;
    if (rows.length > 0) {
      if (rows[rows.length - 1].case.length === 0) {
        return true;
      }
    }
    return false;
  };

  render() {
    return (
      <div className="animated fadeIn">
        <div className="headline u-margin-bottom">
          <h1>Test cases</h1>
          <span className="u-margin-left-xl">
            {this.state.rows.map(x => (
              <StatusDot
                key={x.id}
                status={x.status}
                animatedClassName="fadeInLeft faster"
              />
            ))}
          </span>
        </div>
        <Controls
          onAddNewRow={this.onAddNewRow}
          onExportJson={this.exportJson}
          onExportTxt={this.exportTxt}
          onResetData={this.clearCache}
          onExportCsv={this.exportCsv}
          onImportJson={this.importJson}
        />
        <Table
          rows={this.state.rows}
          onChange={this.onChange}
          onDelete={this.onDelete}
        />
        <button
          className="button-success pure-button important-active-green"
          disabled={this.addButtonIsDisabled()}
          onClick={this.onAddNewRow}
        >
          Add test case
        </button>
        <div className="u-margin-top">
          <h3>todo</h3>
          <ul>
            <li>import/ export excel files</li>
            <li>figure out way of support bug tracking for each test case and device</li>
            <li>support mobile device width</li>
            <li>write unit tests</li>
            <li>refactor components</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
