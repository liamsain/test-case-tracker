import React from "react";
import TextArea from "./TextArea";
import Status from "./Status";

const BugRow = ({
  caseId,
  id,
  description,
  onChange,
  onDelete,
  itemNumber,
  status,
  lastTested,
  isBlocker
}) => (
  <tr className="animated fadeIn faster">
    <td />
    <td>
      <TextArea
        value={description}
        shouldFocusOnCreate={description.length === 0}
        name="description"
        onChange={e => onChange(e, caseId, id)}
        label={`Bug ${itemNumber}`}
      />
    </td>
    <td>
      <div>
        <strong>Blocker?</strong>
      </div>
      <label className="switch">
        <input
          type="checkbox"
          name="isBlocker"
          onChange={e => onChange(e, caseId, id)}
          checked={isBlocker}
        />
        <span className="slider round" />
      </label>
    </td>
    <td>
      <small>Last tested:</small>
      <br />
      <small>{lastTested}</small>
    </td>
    <td>
      <Status onChange={e => onChange(e, caseId, id)} status={status} />
    </td>
    <td>
      <button
        className="button-danger pure-button u-margin-left important-active-red"
        onClick={() => onDelete(caseId, id)}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default BugRow;
