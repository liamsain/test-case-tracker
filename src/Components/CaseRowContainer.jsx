import React, { Component } from "react";
import TextArea from "./TextArea";
import Status from "./Status";
import { Grid, Row, Col } from "react-flexbox-grid";

class CaseRowContainer extends Component {
  render() {
    const bugs = this.props.bugs;
    const lastBug = bugs[bugs.length - 1];
    const addBugButtonDisabled =
      lastBug !== undefined && lastBug.description.length < 1;
    return (
      <Grid fluid className="u-margin-top">
        <Row>
          <Col xs={12} md={6} lg={3}>
            <TextArea
              onChange={e => this.props.onChange(e, this.props.id)}
              value={this.props.case}
              name="case"
              label={`Test case ${this.props.itemNumber}`}
              shouldFocusOnCreate={this.props.case.length === 0}
            />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <TextArea
              onChange={e => this.props.onChange(e, this.props.id)}
              value={this.props.expectedResult}
              label="Expected result"
              name="expectedResult"
            />
          </Col>
          <Col xs={12} lg={2} >
            <Row middle="xs"  className="u-margin-top-sm">
              <Col xs={6}>
                <button
                  className="button-danger pure-button"
                  onClick={() => this.props.onAddBug(this.props.id)}
                  disabled={addBugButtonDisabled}
                >
                  + Bug
                </button>
              </Col>
              <Col xs={6}>
                <input
                  type="checkbox"
                  name="iPhoneTested"
                  onChange={e => this.props.onChange(e, this.props.id)}
                  checked={this.props.iPhoneTested}
                /> iPhone
                <br />
                <input
                  type="checkbox"
                  name="zebraTested"
                  onChange={e => this.props.onChange(e, this.props.id)}
                  checked={this.props.zebraTested}
                /> Zebra
                <br />
                <input
                  type="checkbox"
                  name="iPadTested"
                  onChange={e => this.props.onChange(e, this.props.id)}
                  checked={this.props.iPadTested}
                /> iPad
                <br />
                <input
                  type="checkbox"
                  name="desktopTested"
                  onChange={e => this.props.onChange(e, this.props.id)}
                  checked={this.props.desktopTested}
                /> Desktop
              </Col>
            </Row>
          </Col>
          <Col xs={12} lg={2} lgOffset={2} className="u-margin-top">
            <Status
              onChange={e => this.props.onChange(e, this.props.id)}
              status={this.props.status}
            />
            <button
              className="button-danger pure-button u-margin-left important-active-red"
              onClick={() => this.props.onDelete(this.props.id)}
            >
              Delete
            </button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default CaseRowContainer;
