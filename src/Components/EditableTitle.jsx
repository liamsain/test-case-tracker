import React from "react";

class EditableTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editMode: false };
  }
  render() {
    return (
      <div>
        {this.state.editMode && (
          <form
            className="pure-form animated fadeIn"
            onSubmit={e => {
              e.preventDefault();
              this.setState({ editMode: false });
            }}
          >
            <input
              autoFocus
              type="text"
              value={this.props.value}
              onChange={this.props.onChange}
              onBlur={() => this.setState({ editMode: false })}
            />
            <button type="submit" className="pure-button u-margin-left">
              Save
            </button>
          </form>
        )}
        {!this.state.editMode && (
          <span
            className="headline"
            onClick={() => this.setState({ editMode: true })}
            style={{ cursor: "pointer" }}
          >
            <h1 onClick={() => this.setState({ editMode: true })}>
              {this.props.value}
            </h1>
            <small>click to edit</small>
          </span>
        )}
      </div>
    );
  }
}

export default EditableTitle;
