import React from 'react';

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showTodos: false };
  }
  render() {
    return (
      <div>
        <button
          className="pure-button"
          onClick={() => this.setState({ showTodos: !this.state.showTodos })}
        >
          Show /hide todos
        </button>
        {
          this.state.showTodos &&
          <div className="animated fadeInUp faster">
            <ul>
              <li>
                support following props in ui: blocker, vsts id, last tested date
              </li>
              <li>support mobile device width</li>
              <li>Add date last tested prop to bugs</li>
              <li>update export txt to include bugs</li>
              <li>export only bugs txt button</li>
              <li>import excel files</li>
              <li>write unit tests</li>
              <li>refactor components</li>
            </ul>
          </div>
        }
      </div>
    );
  }
}

export default Todos;
