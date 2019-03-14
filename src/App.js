import React, { Component } from "react";
import "./App.css";
import EditableTitle from "./Components/EditableTitle";
import Table from "./Components/Table";
import Controls from "./Components/Controls";
import { csvFileHeader } from "./Constants/csvFileHeader";
import { getNewCaseRow } from "./Constants/newCaseRow";
import { getNewBugRow } from "./Constants/newBugRow";
import { v1 } from "uuid";
import XLSX from "xlsx";
<<<<<<< HEAD
=======
// import TestCaseAndBugContainer from './Components/TestCaseAndBugContainer';
>>>>>>> 4358ce97d560da828633a2ca61e7986f70c10a95
import moment from 'moment';

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

    if(e.target.name === "status"){
      row.statusLastUpdatedOn = moment().format('llll');
    }

    this.setState(newState);
    window.localStorage["test-cases"] = JSON.stringify(newState);
  };

  onBugChange = (e, caseId, bugId) => {
    const newState = this.state;
    const bug = newState.rows
      .find(testCase => testCase.id === caseId)
      .bugs.find(bug => bug.id === bugId);
    bug[e.target.name] = e.target.value;
    if (e.target.type === "checkbox") {
      bug[e.target.name] = !bug[e.target.name];
    } else {
      bug[e.target.name] = e.target.value;
    }
    if(e.target.name === "status"){
      bug.lastTested = moment().format('llll');
    }
    this.setState(newState);
    window.localStorage["test-cases"] = JSON.stringify(newState);
  };

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
  };

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
        str += '"' + rowObj[prop] + '",';
      }
      str += "\r\n";
      csvFileContent += str;
    });
    this.exportData("csv", csvFileContent);
  };

  exportXlsx = () => {
    var testCaseData = [
      [
        "NO",
        "USER STORE CONDITIONS",
        "EXPECTED RESULTS",
        "DATE LAST TESTED",
        "PASS / FAIL",
        "CHROME V46/ V64",
        "IPHONE X V 11",
        "ZEBRA V52 / V56",
        "IPAD V11"
      ]
    ];

    var bugData = [
      [
        "Feature / Bug Description",
        "Test case",
        "VSTS/ Sprint ID",
        "Blocker?",
        "Status",
        "Last tested date"
      ]
    ];
    let bugs = [];
    this.state.rows.forEach(x => x.bugs.forEach(y => bugs.push(y)));
    bugs.forEach(bug =>
      bugData.push([
        bug.description,
        this.state.rows.findIndex(x => x.id === bug.caseId) + 1,
        bug.vstsId,
        bug.isBlocker ? "Yes" : "No",
        bug.status,
        bug.lastTested
      ])
    );

    this.state.rows.forEach((x, i) =>
      testCaseData.push([
        i + 1,
        x.case,
        x.expectedResult,
        x.statusLastUpdatedOn,
        x.status,
        x.desktopTested ? "Passed" : "Failed",
        x.iPhoneTested ? "Passed" : "Failed",
        x.zebraTested ? "Passed" : "Failed",
        x.iPadTested ? "Passed" : "Failed"
      ])
    );

    const wb = XLSX.utils.book_new();
    const testCaseWs = XLSX.utils.aoa_to_sheet(testCaseData);
    const bugsWs = XLSX.utils.aoa_to_sheet(bugData);
    XLSX.utils.book_append_sheet(wb, testCaseWs, "Test Cases");
    XLSX.utils.book_append_sheet(wb, bugsWs, "Bugs");

    var sheetName = `${this.state.title}.xlsx`;
    XLSX.writeFile(wb, sheetName);
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
    window.localStorage["test-cases"] = JSON.stringify(this.state);
    this.setState(newState);
  };

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
          onExportXlsx={this.exportXlsx}
        />
        <br />
        <Table
          rows={this.state.rows}
          onCaseChange={this.onCaseChange}
          onBugChange={this.onBugChange}
          onDeleteCase={this.deleteCase}
          onAddBug={this.addBug}
          onDeleteBug={this.deleteBug}
        />
        <br />

        <button
          className="button-secondary pure-button important-active-green"
          disabled={this.addButtonIsDisabled()}
          onClick={this.addNewRow}
        >
          Add test case
        </button>
      </div>
    );
  }
}

export default App;
