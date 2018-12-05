import React from 'react';
import TextArea from './TextArea';

const BugRow = ({ caseId, id, description, onChange, onDelete }) => (
  <tr className="animated fadeIn faster">
    <td></td>
    <td>
      <TextArea
        value={description}
        shouldFocusOnCreate={description.length === 0}
        name="description"
        onChange={e => onChange(e, caseId, id)}
        label={`Bug ${id}`}
      />
    </td>
    <td></td>
    <td></td>
    <td></td>
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
