import React, { Component } from 'react';


class TextArea extends Component {
  componentDidMount() {
    if (this.props.shouldFocusOnCreate) {
      this.textArea.focus();
    }
  }
  render() {
    return (
      <form class="pure-form">
        <label htmlFor={this.props.name}>
          <small>
            {this.props.label}
          </small>
        </label>
        <textarea
          style={{"resize": "none"}}
          ref={input => { this.textArea = input; }}
          className="row-text-area"
          onChange={this.props.onChange}
          name={this.props.name}
          id={this.props.id}
          value={this.props.value}
        />
      </form>
    );
  }
}

export default TextArea;
