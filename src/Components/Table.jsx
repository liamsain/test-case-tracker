import React, { Component } from 'react';

import Row from './CaseRow';

class Table extends Component {
  render() {
    return (
      <div>
        {this.props.rows && this.props.rows.length > 0 &&
          <table className="pure-table pure-table-horizontal animated fadeIn">
            <thead>
              <tr>
                <th>#</th>
                <th>Test case</th>
                <th>Expected result</th>
                <th>Actual result</th>
                <th>Devices</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="test-case-table-body">
              {
                this.props.rows.map((x, i) => 
                  i % 2 == 0 ? <Row
                    key={x.id}
                    id={i}
                    case={x.case}
                    expectedResult={x.expectedResult}
                    actualResult={x.actualResult}
                    iPhoneTested={x.iPhoneTested}
                    zebraTested={x.zebraTested}
                    iPadTested={x.iPadTested}
                    desktopTested={x.desktopTested}
                    status={x.status}
                    onChange={this.props.onChange}
                    onDelete={this.props.onDelete}
                  /> : <tr><td>what</td></tr>)
              }
            </tbody>
          </table>
        }
      </div>
    );
  }
}

export default Table;