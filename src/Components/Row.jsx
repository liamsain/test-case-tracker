import React, { Component } from "react";
import TextArea from "./TextArea";
import { NotTested, Passed, Failed } from "../Constants/status";
import StatusDot from "./StatusDot";

class Row extends Component {
  render() {
    return (
      <tr className="animated slideInDown faster">
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
            shouldFocusOnCreate
          />
        </td>
        <td>
          <TextArea
            onChange={e => this.props.onChange(e, this.props.id)}
            value={this.props.notes}
            name="notes"
          />
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

export default Row;
