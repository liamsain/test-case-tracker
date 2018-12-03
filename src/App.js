import React, { Component } from 'react';
import './App.css';
import Table from './Components/Table';
import Controls from './Components/Controls';
import { NotTested } from './Constants/status';
import StatusDot from './Components/StatusDot';
import { isValidJson } from './utils/isValidJson';

class App extends Component {
  constructor() {
    super();
    this.state = {
      rows: []
    };
    if (typeof window !== "undefined") {
      if (window.localStorage['test-cases'] && window.localStorage['test-cases'].length > 0) {
        this.state = JSON.parse(window.localStorage['test-cases'])
      }
    }
  }

  onChange = (e, index) => {
    const newState = this.state;
    newState.rows[index][e.target.name] = e.target.value;
    this.setState(newState);
    window.localStorage['test-cases'] = JSON.stringify(newState);
  }

  onDelete = id => {
    const newState = this.state;
    newState.rows = this.state.rows.filter((x, i) => i !== id);
    this.setState(newState);
    window.localStorage['test-cases'] = JSON.stringify(newState);
  }

  onAddNewRow = () => {
    const newState = this.state;
    const id = newState.rows.length > 1 ? newState.rows.length : 1;
    newState.rows.push({id, case: "", notes: "", status: NotTested });
    this.setState(newState);
  }

  exportData = (filename, content) => {
    var el = document.createElement('a');
    el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    el.setAttribute('download', filename);
    el.style.display = 'none';
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
  }
  exportJsonData = () => {
    this.exportData("test-cases.json", JSON.stringify(this.state, null, '\t'));
  }
  exportTxtData = () => {
    var txtFileContent = this.state.rows.map((x, i) => `${x.case} \r\nNotes: ${x.notes}\r\nStatus: ${x.status}\r\n-----`).join("\r\n");
    this.exportData("test-cases.txt", txtFileContent);
  }

  importData = content => {
    if (!isValidJson(content)) {
      alert('that\'s not valid json, is it mate');
      return;
    }
    this.setState(JSON.parse(content));
    window.localStorage['test-cases'] = JSON.stringify(JSON.parse(content));
  }

  clearCache = () => {
    window.localStorage['test-cases'] = "";
    this.setState({ rows: [] });
  }

  addButtonIsDisabled = () => {
    const rows = this.state.rows;
    if (rows.length > 0) {
      if (rows[rows.length - 1].case.length === 0) {
        return true;
      }
    }
    return false;
  }


  render() {
    return (
      <div className="animated fadeIn">
        <div className="headline u-margin-bottom">
          <h1>Test cases</h1>
          <span className="u-margin-left-xl">
            {
              this.state.rows.map(x =>
                <StatusDot
                  key={x.id}
                  status={x.status}
                  toolTipText={x.case}
                  animatedClassName="fadeInLeft faster"
                />)
            }
          </span>
        </div>
        <Controls
          onAddNewRow={this.onAddNewRow}
          onExportJson={this.exportJsonData}
          onExportTxt={this.exportTxtData}
          onImportData={this.importData}
          onResetData={this.clearCache}

        />
        <Table
          rows={this.state.rows}
          onChange={this.onChange}
          onDelete={this.onDelete}
        />
        <button className="button-success pure-button important-active-green" disabled={this.addButtonIsDisabled()} onClick={this.onAddNewRow}>
          Add test case
        </button>
      </div>
    );
  }
}

export default App;
