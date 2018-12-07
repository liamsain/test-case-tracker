import React from "react";
import StatusDot from "./StatusDot";
import { NotTested, Passed, Failed } from "../Constants/status";

const Status = ({ status, onChange }) => (
  <span>
    <StatusDot status={status} />
    <select
      value={status}
      className="u-margin-left"
      style={{ verticalAlign: "middle" }}
      name="status"
      onChange={onChange}
    >
      <option value={NotTested}>{NotTested}</option>
      <option value={Failed}>{Failed}</option>
      <option value={Passed}>{Passed}</option>
    </select>
  </span>
);

export default Status;
