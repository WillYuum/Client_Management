import uuidv4 from "uuid/v4";

import contactsFile from "../ContactFile_Schema";

const initContactsFile = async () => {
  const getContactFiles = async () => {
    try {
      const files = await contactsFile.find();
      return files;
    } catch (err) {
      throw new Error("Could not retrieve Contacts Files");
    }
  };

  const CreateContactFile = async props => {
    let { contactUsername, dateCreated, contactType } = props;
    if (!props || !contactUsername || !dateCreated || !contactType) {
      throw new Error(
        "You must add a username/contact-Type and date so you can create a contact file"
      );
    }
    try {
      const result = await new contactsFile({
        _id: uuidv4(),
        contactUsername,
        contactType,
        dateCreated,
        cases: []
      });
      return result.save();
    } catch (err) {
      console.log(err);
      throw new Error("Creating a contact file didn't work");
    }
  };

  const updateContactFile = async (id, props) => {
    // const {contactUsername, contactType} = props;
    if (!id) {
      throw new Error("you did not provide with an id for ContactFile ");
    }
    try {
      const updateFiles = await contactsFile.findByIdAndUpdate(
        { _id: id },
        props
      );
      return updateFiles;
    } catch (err) {
      console.log(err);
      throw new Error(`could not update contact_file username with id = ${id}`);
    }
  };

  const deleteContactFile = async id => {
    try {
      const deleteFile = contactsFile.findByIdAndDelete(
        {_id: id}
      )
      return deleteFile;
    } catch (err) {
      console.log(err);
      throw new Error("contact file didn't get deleted");
    }
  };

  const controller = {
    getContactFiles,
    CreateContactFile,
    updateContactFile,
    deleteContactFile
  };
  return controller;
};
export default initContactsFile;
