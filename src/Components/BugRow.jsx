import React from 'react';
import TextArea from './TextArea';

const BugRow = ({ caseId, id, description }) => (
  <tr className="animated fadeIn faster">
    <td></td>
    <td>Bug {id}</td>
    <td>
      <TextArea
        value={description}
        shouldFocusOnCreate
        label="Bug description"
      />
    </td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
);

export default BugRow;
