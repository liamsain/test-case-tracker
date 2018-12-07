import React from "react";
import TextArea from "./TextArea";
import Status from './Status';

const BugRowContainer = ({
  caseId,
  id,
  description,
  onChange,
  onDelete,
  itemNumber,
  status
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
    <td />
    <td />
    <td>
      <Status
        onChange={e => onChange(e, caseId, id)}
        status={status}
      />
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

export default BugRowContainer;
