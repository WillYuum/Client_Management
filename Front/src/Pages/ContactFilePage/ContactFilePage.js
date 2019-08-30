import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { CreateTime } from "../../utils/utils.js";

import "./ContactFilePage.scss";

import ContactFile from "../../Components/contactFile/ContactFile.js";

class ContactFilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ContactData: [],
      createMode: false
    };
  }

  toggleCreateMode = () => {
    const createMode = !this.state.createMode;
    this.setState({ createMode });
  };

  componentDidMount() {
    this.getContactFiles();
  }

  getContactFiles = async () => {
    try {
      const req = await fetch("http://localhost:3001/contactfiles/read");
      const result = await req.json();
      this.setState({ ContactData: result.result });
      console.log(this.state.ContactData);
    } catch (err) {
      console.log(err);
      throw new Error("fetching contact file failed");
    }
  };

  createContactFile = async param => {
    const { contactUsername, contactType, dateCreated } = param;
    if (!param || !contactUsername || !contactType || !dateCreated) {
      throw new Error(
        "you need to provide with contactUsername and contactType"
      );
    }
    try {
      const req = await fetch("http://localhost:3001/contactfiles/create", {
        method: "POST",
        body: JSON.stringify(param),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      console.log(param);
      const answer = await req.json();
      console.log(answer);
      if (answer.success) {
        const data = answer.result;
        const newContact = {
          _id: data._id,
          contactUsername: data.contactUsername,
          contactType: data.contactType,
          dateCreated: data.dateCreated
        };

        const ContactData = [...this.state.ContactData];
        ContactData.push(newContact);

        this.setState({ ContactData });
      }
    } catch (err) {
      throw new Error("creating contact failed");
    }
  };

  SubmitContact = e => {
    e.preventDefault();
    const contactUsername = e.target.contactName.value;
    const contactType = e.target.contactType.value;
    const dateCreated = CreateTime();
    this.createContactFile({ contactUsername, contactType, dateCreated });
    this.toggleCreateMode();
  };

  updateContactFile = async (id, param) => {
    const { contactUsername, contactType } = param;
    if (!param || !contactUsername || !contactType) {
      throw new Error(
        "you need to provide with contactUsername or contactType"
      );
    }
    try {
      console.log(param);

      const res = await fetch(
        `http://localhost:3001/contactfiles/update/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(param),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      );
      console.log(res);
      const answer = await res.json();

      if (answer.success) {
        const contactFile = this.state.ContactData.map(file => {
          if (file._id === id) {
            return {
              contactUsername: contactUsername || file.contactusername,
              contactType: contactType || file.contactType,
              dateCreated: file.dateCreated
            };
          } else {
            return file;
          }
        });
        this.setState({ ContactData: contactFile });
        return contactFile;
      }
    } catch (err) {
      console.log(err);
      throw new Error("updating Contact File failed");
    }
  };

  deleteContactFile = async id => {
    try {
      const req = await fetch(
        `http://localhost:3001/contactfiles/delete/${id}`,
        {
          method: "DELETE"
        }
      );
      console.log(req);
      const answer = await req.json();

      if (answer.success) {
        console.log("it got deleted");
        const updatedContacts = this.state.ContactData.filter(file => {
          return file._id !== id;
        });
        this.setState({ ContactData: updatedContacts });
      }
    } catch (err) {
      console.log(err);
      throw new Error("deleting contact file failed");
    }
  };

  renderCreateContact = () => {
    return (
      <div className="ContactFile-container">
        <div className="ContactFile-body">
          <Card bg="light" style={{ width: "20rem", height: "18rem" }}>
            <Card.Header>
              <div>
                Date Created:
                {CreateTime()}
              </div>
            </Card.Header>
            <form onSubmit={this.SubmitContact} onReset={this.toggleCreateMode}>
              <input
                type="text"
                name="contactName"
                placeholder="Contact Username"
                required
              />
              <input
                type="text"
                name="contactType"
                placeholder="Contact Type"
                required
              />

              <input type="submit" value="Save" />
              <input type="reset" value="cancel" />
            </form>
          </Card>
        </div>
      </div>
    );
  };

  render() {
    const { ContactData, createMode } = this.state;
    const {EnterCaseFile} = this.props
    return (
      <div className="ContactFilePage-container">
        <nav className="ContactFilePage-navBar">
          <Button variant="outline-dark" onClick={this.toggleCreateMode}>
            Create Contact
          </Button>
        </nav>
        <div className="ContactFilePage-body">
          {ContactData.map(file => {
            return (
              <ContactFile
                key={file._id}
                contactId={file._id}
                contactUsername={file.contactUsername}
                contactType={file.contactType}
                dateCreated={file.dateCreated}
                deleteFunc={this.deleteContactFile}
                updateFunc={this.updateContactFile}
                EnterCaseFile={EnterCaseFile}
              />
            );
          })}
          {createMode ? this.renderCreateContact() : false}
        </div>
      </div>
    );
  }
}

export default ContactFilePage;
