import React, { Component } from 'react';


class TextArea extends Component {
  componentDidMount() {
    if (this.props.shouldFocusOnCreate) {
      this.textArea.focus();
    }
  }
  render() {
    return (
      <div>
        <label htmlFor={this.props.name}>
          <small>
            {this.props.label}
          </small>
        </label>
        <textarea
          ref={input => { this.textArea = input; }}
          className="row-text-area"
          onChange={this.props.onChange}
          name={this.props.name}
          id={this.props.id}
          value={this.props.value}
        />
      </div>
    );
  }
}

export default TextArea;
