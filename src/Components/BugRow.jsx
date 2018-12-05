import React from 'react';
import TextArea from './TextArea';

const BugRow = ({ caseId, id, description }) => (
  <tr className="animated fadeIn faster">
    <td>Bug {id}</td>
    <td>
      <TextArea
        value={description}
        shouldFocusOnCreate
      /></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
);

export default BugRow;
