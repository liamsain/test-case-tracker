import React, { Component } from 'react';
import CaseRow from './CaseRow';
import BugRow from './BugRow';
import * as RowTypes from '../Constants/rowTypes';

class Table extends Component {
  render() {
    const casesAndBugsArray = [];
    for (let i = 0; i < this.props.rows.length; i++) {
      const row = this.props.rows[i];
      casesAndBugsArray.push(row);
      row.bugs.forEach(x => casesAndBugsArray.push(x));
    }
    console.log(casesAndBugsArray);
    return (
      <div>
        {this.props.rows && this.props.rows.length > 0 &&
          <table className="pure-table pure-table-horizontal animated fadeIn">
            <thead>
              <tr>
                <th></th>
                <th>Test case</th>
                <th>Expected result</th>
                <th></th>
                <th>Devices</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="test-case-table-body">
              {
                casesAndBugsArray.map((x, i) => x.type === RowTypes.CASE_ROW ?
                  <CaseRow
                    key={x.id}
                    id={x.id}
                    case={x.case}
                    expectedResult={x.expectedResult}
                    actualResult={x.actualResult}
                    iPhoneTested={x.iPhoneTested}
                    zebraTested={x.zebraTested}
                    iPadTested={x.iPadTested}
                    desktopTested={x.desktopTested}
                    status={x.status}
                    onChange={this.props.onCaseChange}
                    onDelete={this.props.onDelete}
                    onAddBug={this.props.onAddBug}
                  /> :
                  <BugRow
                    id={x.id}
                    caseId={x.caseId}
                    key={`${x.caseId} - ${x.id}`}
                    description={x.description}
                  />)
              }
            </tbody>
          </table>
        }
      </div>
    );
  }
}

export default Table;