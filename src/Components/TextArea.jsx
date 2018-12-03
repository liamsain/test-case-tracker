import React, { Component } from 'react';


class TextArea extends Component {
  componentDidMount(){
    if(this.props.shouldFocusOnCreate){
      this.textArea.focus();
    }
  }
  render() {
    return (
      <textarea
        ref={input => {this.textArea = input;}}
        className="row-text-area"
        onChange={this.props.onChange}
        name={this.props.name}
        id={this.props.id}
        value={this.props.value}
      />
    );
  }
}

export default TextArea;
