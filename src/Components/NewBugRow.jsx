import React from 'react';
import TextArea from './TextArea';

const NewBugRow = ({ caseId, id, description, onChange, onDelete }) => (
  <div className="pure-g">
    <div className="pure-u-1 pure-u-md-1-3">
      <TextArea
        value={description}
        shouldFocusOnCreate={description.length === 0}
        name="description"
        onChange={e => onChange(e, caseId, id)}
        label={`Bug ${id}`}
      />
    </div>
    <div className="pure-u-1 pure-u-md-1-3">
      <button
        className="button-danger pure-button u-margin-left important-active-red"
        onClick={() => onDelete(caseId, id)}
      >
        Delete
       </button>
    </div>
  </div>
);

export default NewBugRow;
