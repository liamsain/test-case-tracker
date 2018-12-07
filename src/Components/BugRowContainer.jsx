import React from "react";
import TextArea from "./TextArea";
import Status from "./Status";
import { Grid, Row, Col } from "react-flexbox-grid";

const BugRowContainer = ({
  caseId,
  id,
  description,
  onChange,
  onDelete,
  itemNumber,
  status
}) => (
  <Grid fluid>
    <Row>
      <Col xs={12} lgOffset={3} lg={3}>
        <TextArea
          value={description}
          shouldFocusOnCreate={description.length === 0}
          name="description"
          onChange={e => onChange(e, caseId, id)}
          label={`Bug ${itemNumber}`}
        />
      </Col>
      <Col xs={12} lgOffset={4} lg={2} className="u-margin-top">
        <Status onChange={e => onChange(e, caseId, id)} status={status} />
        <button
          className="button-danger pure-button u-margin-left important-active-red"
          onClick={() => onDelete(caseId, id)}
        >
          Delete
        </button>
      </Col>
    </Row>
  </Grid>
);

export default BugRowContainer;
