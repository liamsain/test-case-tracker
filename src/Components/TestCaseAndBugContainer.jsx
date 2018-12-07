import React, { Component } from 'react';
import CaseRow from './CaseRowContainer';
import BugRow from './BugRowContainer';
import * as RowTypes from '../Constants/rowTypes';

class TestCaseAndBugContainer extends Component {

  getCaseItemNumber = caseId => {
    for (let i = 0; i < this.props.rows.length; i++) {
      const item = this.props.rows[i];
      if(item.id === caseId){
        return i + 1;
      }
    }
  }

  getBugItemNumber = (caseId, bugId) => {
    const rows = this.props.rows;
    let row = rows.find(x => x.id === caseId);
    return row.bugs.findIndex(x => x.id === bugId) + 1;
  }

  render() {
    const casesAndBugsArray = [];
    for (let i = 0; i < this.props.rows.length; i++) {
      const row = this.props.rows[i];
      casesAndBugsArray.push(row);
      row.bugs.forEach(x => casesAndBugsArray.push(x));
    }

    return (
      <div>
        {this.props.rows && this.props.rows.length > 0 &&
          <div>
              {
                casesAndBugsArray.map((x, i) => x.type === RowTypes.CASE_ROW ?
                  <CaseRow
                    key={x.id}
                    id={x.id}
                    itemNumber={this.getCaseItemNumber(x.id)}
                    case={x.case}
                    bugs={x.bugs}
                    expectedResult={x.expectedResult}
                    iPhoneTested={x.iPhoneTested}
                    zebraTested={x.zebraTested}
                    iPadTested={x.iPadTested}
                    desktopTested={x.desktopTested}
                    status={x.status}
                    onChange={this.props.onCaseChange}
                    onDelete={this.props.onDeleteCase}
                    onAddBug={this.props.onAddBug}
                  /> :
                  <BugRow
                    id={x.id}
                    caseId={x.caseId}
                    itemNumber={this.getBugItemNumber(x.caseId, x.id)}
                    key={`${x.caseId} - ${x.id}`}
                    description={x.description}
                    onChange={this.props.onBugChange}
                    onDelete={this.props.onDeleteBug}
                    status={x.status}
                  />)
              }
          </div>
        }
      </div>
    );
  }
}

export default TestCaseAndBugContainer;