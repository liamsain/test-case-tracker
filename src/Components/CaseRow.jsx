import React, { Component } from "react";
import TextArea from "./TextArea";
import { NotTested, Passed, Failed } from "../Constants/status";
import StatusDot from "./StatusDot";

class CaseRow extends Component {
  state = {
    bugFound: false
  }
  render() {
    const showActualResultTextArea = this.props.actualResult.length > 0 || this.state.bugFound;
    return (
      <tr className={`${this.props.id !== 0 ? 'animated slideInDown faster' : ''}`}>
        <td className="table-id-column u-center">
          <strong>{this.props.id}</strong>
          <button
            className="button-danger pure-button u-margin-left important-active-red"
            onClick={() => this.props.onDelete(this.props.id)}
          >
            <strong>X</strong>
          </button>
        </td>
        <td>
          <TextArea
            onChange={e => this.props.onChange(e, this.props.id)}
            value={this.props.case}
            name="case"
            shouldFocusOnCreate={this.props.case.length === 0}
          />
        </td>
        <td>
          <TextArea
            onChange={e => this.props.onChange(e, this.props.id)}
            value={this.props.expectedResult}
            name="expectedResult"
          />
        </td>
        <td>
          {
            showActualResultTextArea &&
            <TextArea
              onChange={e => this.props.onChange(e, this.props.id)}
              value={this.props.actualResult}
              name="actualResult"
              shouldFocusOnCreate
            />
          }
          {
            !showActualResultTextArea &&
            <button
            className="button-danger pure-button"
            onClick={() => this.setState({bugFound: true})}>
              Bug
            </button>
          }
        </td>
        <td>
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
        </td>
        <td className="table-status-column">
          <div>
            <StatusDot
              status={this.props.status}
              animatedClassName="animated "
            />
          </div>
          <select
            value={this.props.status}
            name="status"
            onChange={e => this.props.onChange(e, this.props.id)}
          >
            <option value={NotTested}>{NotTested}</option>
            <option value={Failed}>{Failed}</option>
            <option value={Passed}>{Passed}</option>
          </select>
        </td>
      </tr>
    );
  }
}

export default CaseRow;
