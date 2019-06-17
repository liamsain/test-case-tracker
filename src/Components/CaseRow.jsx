import React, { Component } from "react";
import TextArea from "./TextArea";
import DeviceStatus from './DeviceStatus';

class CaseRow extends Component {

  render() {
    const bugs = this.props.bugs;
    const lastBug = bugs[bugs.length - 1];
    const addBugButtonDisabled = lastBug !== undefined && lastBug.description.length < 1;
    return (
      <tr className="animated fadeIn faster">
        <td>
          <TextArea
            onChange={e => this.props.onChange(e, this.props.id)}
            value={this.props.case}
            name="case"
            label={`Test case ${this.props.itemNumber}`}
            shouldFocusOnCreate={this.props.case.length === 0}
          />
        </td>
        <td>
          <TextArea
            onChange={e => this.props.onChange(e, this.props.id)}
            value={this.props.expectedResult}
            label="Expected result"
            name="expectedResult"
          />
        </td>
        <td>
          <button
            className="button-danger pure-button"
            onClick={() => this.props.onAddBug(this.props.id)}
            disabled={addBugButtonDisabled}
          >
            + Bug
            </button>
        </td>
        <td>
          {
            [
              {
                deviceName: "iPhone",
                name: "iPhoneTested",
                value: this.props.iPhoneTested
              },
              {
                deviceName: "Zebra",
                name: "zebraTested",
                value: this.props.zebraTested
              },
              {
                deviceName: "iPad",
                name: "iPadTested",
                value: this.props.iPadTested
              },
              {
                deviceName: "Chrome v46",
                name: "chromeV46Tested",
                value: this.props.chromeV46Tested
              },
              {
                deviceName: "Desktop",
                name: "desktopTested",
                value: this.props.desktopTested
              }
            ].map(x => 
            (<DeviceStatus
              key={`${this.props.id}-${x.name}`}
              deviceName={x.deviceName}
              name={x.name}
              onChange={ value => this.props.onChange({target:{name: x.name, value}}, this.props.id)}
              value={x.value}
            />))
          }
       </td>
        <td className="table-id-column u-center">
          <button
            className="button-danger pure-button u-margin-left important-active-red"
            onClick={() => this.props.onDelete(this.props.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default CaseRow;
