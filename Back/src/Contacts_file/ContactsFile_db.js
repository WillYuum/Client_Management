const mongoose = require("mongoose");

import contacts_file from "./ContactFile_Schema";

const initContactsFile = async () => {
  const getContactFiles = async () => {
    try {
      const files = await contacts_file.find();
      return files;
    } catch (err) {
      throw new Error("Could not retrieve Contacts Files");
    }
  };

  const CreateUserFile = async props => {
    let { contact_username, date_created } = props;
    if (!props || !contact_username || !date_created) {
      throw new Error(
        "You must add a username and date so you can create a contact file"
      );
    }
    try {
      const result = await new contacts_file({
        _id: new mongoose.Types.ObjectId(),
        contact_username: contact_username,
        date_created: date_created
      });
      return result.save();
    } catch (err) {
      console.log(err);
      throw new Error("Creating a contact file didn't work");
    }
  };

  const deleteUserFile = async id => {
    try {
      const fileId = await contacts_file.findById(id);
      const delete_file = await file.remove({ _id: fileId });
      return delete_file;
    } catch (err) {
      console.log(err);
      throw new Error("contact file didn't get deleted");
    }
  };

  const updateContactFile = async (id, username) => {
    if (!username) {
      throw new Error("you didn't provide with username");
    }
    try{
        const update_file = contacts_file.findByIdAndUpdate(
            id,
            username,
            {new:true},
        )
        return update_file;
    } catch (err) {
      console.log(err);
      throw new Error(`could not update contact_file username with id = ${id}`);
    }
  };

  const controller = {
    getContactFiles,
    CreateUserFile,
    deleteUserFile,
    updateContactFile
  };
  return controller;
};
export default initContactsFile;
