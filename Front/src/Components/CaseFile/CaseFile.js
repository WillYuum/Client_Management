import React, { Component } from "react";

import "./CaseFile.scss";

import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

class CaseFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    };
  }

  toggleEditMode = () => {
    const editMode = !this.state.editMode;
    this.setState({ editMode });
  };

  renderView = () => {
    const { caseId, caseTitle, caseType, dateCreated } = this.props;

    return (
      <div className="ContactFile-container">
        <div className="ContactFile-body">
          <Card bg="light" style={{ width: "20rem", height: "18rem" }}>
            <Card.Header>
              <div>
                Date Created:
                {dateCreated}
              </div>
            </Card.Header>

            <Card.Body>
              <Card.Title>Case Title: {caseTitle}</Card.Title>
              <Card.Text>Case Type: {caseType}</Card.Text>
              <Card.Text>Status: {caseType}</Card.Text>

            </Card.Body>
            
          </Card>
        </div>
      </div>
    );
  };

  render() {
    const { editMode } = this.state;
    return editMode ? this.renderEdit() : this.renderView();
  }
}

export default CaseFile;
