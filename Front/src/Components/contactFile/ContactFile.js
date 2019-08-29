import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./ContactFile.scss";

class ContactFile extends Component {
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
    //nomral props
    const { key, contactUsername, contactType, dateCreated } = this.props;
    // func props
    const { deleteFunc } = this.props;

    return (
      <div className="ContactFile-container">
        <div className="ContactFile-body">
          <Card bg="light" style={{ width: "20rem", height: "18rem" }}>
            <Card.Header>
              <button onClick={() => deleteFunc(key)}>X</button>
              <div>
                Date Created:
                {dateCreated}
              </div>
            </Card.Header>

            <Card.Body>
              <Card.Title>Contact: {contactUsername}</Card.Title>
              <Card.Text>Contact Type: {contactType}</Card.Text>
            </Card.Body>
            <Button variant="outline-dark">Enter File</Button>
            <Button variant="outline-dark" onClick={this.toggleEditMode}>
              Edit
            </Button>
          </Card>
        </div>
      </div>
    );
  };

  onSubmit = e => {
    e.preventDefault();
    const contactUsername = e.target.contactName.value;
    const contactType = e.target.contactType.value;
    console.log(contactUsername)
    console.log(contactType)

    const { contactId, updateFunc } = this.props;

    updateFunc(contactId, { contactUsername, contactType });
    this.toggleEditMode();
  };

  renderEdit = () => {
    const { contactUsername, contactType, dateCreated } = this.props;
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
            <form onSubmit={this.onSubmit} onReset={this.toggleEditMode}>
              <input type="text" name="contactName" defaultValue={contactUsername}/>
              <input type="text" name="contactType" defaultValue={contactType}/>

              <input type="submit" value="Save"/>
              <input type="reset" value="cancel"/>
            </form>
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

export default ContactFile;
