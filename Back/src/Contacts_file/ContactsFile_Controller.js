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
    let { contactUsername, contactType, dateCreated } = props;
    if (!props || !contactUsername || !dateCreated || !contactType) {
      throw new Error(
        `You must add a username/contact-Type and date so you can create a contact file${contactUsername}`
        
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
    if (!id) {
      throw new Error("you did not provide with an id for ContactFile ");
    }
    try {
      const { contactUsername, contactType } = props;

      return contactsFile.findByIdAndUpdate(
        { _id: id },
        {
          contactUsername,
          contactType
        },
        { new: true },
        (err, updatedFile) => {
          if (err) {
            throw new Error("update controller failed");
          } else {
            return updatedFile;
          }
        }
      );
    } catch (err) {
      console.log(err);
      throw new Error(`could not update contact_file username with id = ${id}`);
    }
  };

  const deleteContactFile = async id => {
    try {
      return contactsFile.findByIdAndDelete({ _id: id }, (err, msg) => {
        if (err) {
          throw new Error("delete controller failed");
        } else {
          return;
        }
      });
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
