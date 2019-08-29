import React from "react";

import "./ContactFilePage.scss";

import ContactFile from "../../Components/contactFile/ContactFile.js";

class ContactFilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ContactData: []
    };
  }

  async componentDidMount() {
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
          method: "POST",
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
          if (file.id === id) {
            const updated_contact = {
              contactName: contactUsername || file.contactusername,
              contactType: contactType || file.contactType
            };
            return updated_contact;
          } else {
            return file;
          }
        });
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
        `http://localhost:3001/contactfiles/delete/${id}`
      );
      console.log(req);
      const answer = await req.json();

      if (answer.success) {
        console.log("it got deleted");
        const ContactData = this.state.ContactData.filter(file => {
          return file._id !== id;
        });
        this.setState(ContactData);
      }
    } catch (err) {
      console.log(err);
      throw new Error("deleting contact file failed");
    }
  };

  render() {
    const { ContactData } = this.state;
    return (
      <div className="ContactFilePage-container">
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
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default ContactFilePage;
