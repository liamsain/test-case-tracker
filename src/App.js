import React, { Component } from "react";
import "./App.css";
import EditableTitle from './Components/EditableTitle';
import Table from "./Components/Table";
import Controls from "./Components/Controls";
import Todos from './Components/Todos';
import { csvFileHeader } from "./Constants/csvFileHeader";
import { getNewCaseRow } from './Constants/newCaseRow';
import { getNewBugRow } from './Constants/newBugRow';
import { v1 } from 'uuid';

class App extends Component {
  constructor() {
    super();
    this.state = {
      rows: [],
      title: "Test cases"
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

  addBug = caseId => {
    const newState = this.state;
    const row = newState.rows.find(x => x.id === caseId);
    row.bugs.push(getNewBugRow(v1(), caseId));
    this.setState(newState);
  };

  onCaseChange = (e, id) => {
    const newState = this.state;
    const row = newState.rows.find(x => x.id === id);
    if (e.target.type === "checkbox") {
      row[e.target.name] = !row[e.target.name];
    } else {
      row[e.target.name] = e.target.value;
    }
    this.setState(newState);
    window.localStorage["test-cases"] = JSON.stringify(newState);
  };

  onBugChange = (e, caseId, bugId) => {
    const newState = this.state;
    const bug = newState.rows.find(testCase => testCase.id === caseId).bugs.find(bug => bug.id === bugId);
    bug[e.target.name] = e.target.value;
    this.setState(newState);
    window.localStorage["test-cases"] = JSON.stringify(newState);
  }

  deleteCase = id => {
    const newState = this.state;
    newState.rows = this.state.rows.filter(x => x.id !== id);
    this.setState(newState);
    window.localStorage["test-cases"] = JSON.stringify(newState);
  };

  deleteBug = (caseId, bugId) => {
    const newState = this.state;
    const testCase = newState.rows.find(testCase => testCase.id === caseId);
    testCase.bugs = testCase.bugs.filter(bug => bug.id !== bugId);
    this.setState(newState);
  }

  addNewRow = () => {
    const newState = this.state;
    newState.rows.push(getNewCaseRow(v1()));
    this.setState(newState);
  };

  exportData = (filenameExt, content) => {
    var el = document.createElement("a");
    el.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(content)
    );
    el.setAttribute("download", `${this.state.title}.${filenameExt}`);
    el.style.display = "none";
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
  };

  exportJson = () => {
    this.exportData("json", JSON.stringify(this.state, null, "\t"));
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
    this.exportData("txt", txtFileContent);
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
    this.exportData("csv", csvFileContent);
  };

  importJson = json => {
    this.setState(json);
    window.localStorage["test-cases"] = JSON.stringify(json);
  };

  clearCache = () => {
    window.localStorage["test-cases"] = "";
    this.setState({ rows: [], title: "Test cases" });
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

  onTitleChange = e => {
    const newState = this.state;
    newState.title = e.target.value;
    window.localStorage["test-cases"] = JSON.stringify(this.state)
    this.setState(newState);
  }
  
  render() {
    return (
      <div className="animated fadeIn">
        <div className="u-margin-bottom">
          <EditableTitle
            value={this.state.title}
            onChange={e => this.onTitleChange(e)}
          />
        </div>
        <Controls
          onAddNewRow={this.addNewRow}
          onExportJson={this.exportJson}
          onExportTxt={this.exportTxt}
          onResetData={this.clearCache}
          onExportCsv={this.exportCsv}
          onImportJson={this.importJson}
        />
        <Table
          rows={this.state.rows}
          onCaseChange={this.onCaseChange}
          onBugChange={this.onBugChange}
          onDeleteCase={this.deleteCase}
          onAddBug={this.addBug}
          onDeleteBug={this.deleteBug}
        />
        <button
          className="button-secondary pure-button important-active-green"
          disabled={this.addButtonIsDisabled()}
          onClick={this.addNewRow}
        >
          Add test case
        </button>
        <div className="u-margin-top">
          <Todos />
        </div>
      </div>
    );
  }
}

export default App;
