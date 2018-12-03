import React, { Component } from 'react';

import { Passed, Failed } from '../Constants/status';

class StatusDot extends Component {

  getClass = status => {
    if (status === Passed) {
      return 'dot passed';
    } else if (status === Failed) {
      return 'dot failed';
    }
    return 'dot not-tested';

  }
  render() {
    return (<span className={`${this.getClass(this.props.status)} tooltip animated ${this.props.animatedClassName}`}>
    {
      this.props.toolTipText &&
      <span className="tooltiptext">
        {this.props.toolTipText}
      </span>
    }
      
    </span>)
  }
}

export default StatusDot;
