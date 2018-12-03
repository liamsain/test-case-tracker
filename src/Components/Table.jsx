import React, { Component } from 'react';

import Row from './Row';

class Table extends Component {
  render() {
    return (
      <div>
        {this.props.rows && this.props.rows.length > 0 &&
          <table className="pure-table pure-table-horizontal">
            <thead>
              <tr>
                <th>#</th>
                <th>Test case</th>
                <th>Notes</th>
                <th></th>
              </tr>
            </thead>

            <tbody id="test-case-table-body">
              {
                this.props.rows.map((x, i) =>
                  <Row
                    key={x.id}
                    id={i}
                    notes={x.notes}
                    status={x.status}
                    case={x.case}
                    onChange={this.props.onChange}
                    onDelete={this.props.onDelete}
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