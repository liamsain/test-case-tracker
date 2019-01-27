import React, { useState } from "react";

function EditableTitle({value, onChange}) {
  const [editMode, setEditMode] = useState(false);
  return (
    <div>
      {editMode && (
        <form
          className="pure-form animated fadeIn"
          onSubmit={e => {
            e.preventDefault();
            setEditMode(false);
          }}
        >
          <input
            autoFocus
            type="text"
            value={value}
            onChange={onChange}
            onBlur={() => setEditMode(false)}
          />
          <button type="submit" className="pure-button u-margin-left">
            Save
            </button>
        </form>
      )}
      {!editMode && (
        <span
          className="headline"
          onClick={() => setEditMode(true)}
          style={{ cursor: "pointer" }}
        >
          <h1 onClick={() => setEditMode(true)}>
            {value}
          </h1>
          <small>click to edit</small>
        </span>
      )}
    </div>
  );
}

export default EditableTitle;
