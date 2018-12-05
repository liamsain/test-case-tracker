import React, { Component } from "react";
import TextArea from "./TextArea";
import { NotTested, Passed, Failed } from "../Constants/status";
import StatusDot from "./StatusDot";

class NewCaseRow extends Component {

  render() {
    const bugs = this.props.bugs;
    const lastBug = bugs[bugs.length - 1];
    const addBugButtonDisabled = lastBug !== undefined && lastBug.description.length < 1;
    return (
      <div className="pure-g">
    <div class="pure-u-1 pure-u-md-1-3"> ... </div>
    <div class="pure-u-1 pure-u-md-1-3"> ... </div>
    <div class="pure-u-1 pure-u-md-1-3"> ... </div>
        {/* <div className="pure-u-1 pure-u-md-1-6">
          <TextArea
            onChange={e => this.props.onChange(e, this.props.id)}
            value={this.props.case}
            name="case"
            label={`Test case ${this.props.id}`}
            shouldFocusOnCreate={this.props.case.length === 0}
          />
        </div>
        <div className="pure-u-1 pure-u-md-1-6">
          <TextArea
            onChange={e => this.props.onChange(e, this.props.id)}
            value={this.props.expectedResult}
            label="Expected result"
            name="expectedResult"
          />
        </div>
        <div className="pure-u-1 pure-u-md-1-6">
          <button
            className="button-danger pure-button"
            onClick={() => this.props.onAddBug(this.props.id)}
            disabled={addBugButtonDisabled}
          >
            + Bug
            </button>
        </div>
        <div className="pure-u-1 pure-u-md-1-6">
          <input
            type="checkbox"
            name="iPhoneTested"
            onChange={e => this.props.onChange(e, this.props.id)}
            checked={this.props.iPhoneTested}
          /> iPhone<br />
          <input
            type="checkbox"
            name="zebraTested"
            onChange={e => this.props.onChange(e, this.props.id)}
            checked={this.props.zebraTested}
          /> Zebra<br />
          <input
            type="checkbox"
            name="iPadTested"
            onChange={e => this.props.onChange(e, this.props.id)}
            checked={this.props.iPadTested}
          /> iPad<br />
          <input
            type="checkbox"
            name="desktopTested"
            onChange={e => this.props.onChange(e, this.props.id)}
            checked={this.props.desktopTested}
          /> Desktop
        </div>
        <div className="pure-u-1 pure-u-md-1-6">
          <StatusDot
            status={this.props.status}
          />
          <select
            value={this.props.status}
            className="u-margin-left"
            style={{ "verticalAlign": "middle" }}
            name="status"
            onChange={e => this.props.onChange(e, this.props.id)}
          >
            <option value={NotTested}>{NotTested}</option>
            <option value={Failed}>{Failed}</option>
            <option value={Passed}>{Passed}</option>
          </select>
        </div>
        <div className="pure-u-1 pure-u-md-1-6">
          <button
            className="button-danger pure-button u-margin-left important-active-red"
            onClick={() => this.props.onDelete(this.props.id)}
          >
            Delete
          </button>
        </div> */}
      </div>
    );
  }
}

export default NewCaseRow;
