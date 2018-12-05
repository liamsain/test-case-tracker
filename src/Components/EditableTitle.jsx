import React from 'react';

class EditableTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editMode: false };
  }
  render() {
    return (
      <div>
        {
          this.state.editMode &&
          <form className="pure-form animated fadeIn" onSubmit={e => { e.preventDefault(); this.setState({ editMode: false }) }} >
            <input type="text" value={this.props.value} onChange={this.props.onChange} />
            <button type="submit" className="pure-button u-margin-left">Save</button>
          </form>
        }
        {
          !this.state.editMode &&
          <div
            style={{"cursor":"pointer"}}
            onClick={() => this.setState({ editMode: true })}>
            <h1>{this.props.value}</h1>
            <small>edit</small>
          </div>
        }
      </div>
    );
  }
}

export default EditableTitle;
