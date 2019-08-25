import sqlite from "sqlite";
import SQL from "sql-template-strings";

const initDatabase = async () => {
  const db = await sqlite.open("./db.db");

  const getUserFiles = async () => {
    try {
      let stmt =
        "SELECT id, username, date_created from contacts_file ORDER by username";

      const UserFiles = await db.all(stmt);
      return UserFiles;
    } catch (err) {
      console.log(err);
      throw new Error("Could not retrieve Contacts Files");
    }
  };

  const CreateUserFile = async props => {
    const { username, date_created } = props;

    if (!username || !date_created) {
      throw new Error(
        "You must create a username and date so you can create a file"
      );
    }
    try {
      const result = await db.run(
        SQL`INSERT INTO contacts_file(username, date_created) VALUES (${username},${date_created})`
      );
      const id = result.stmt.lastId;
      return id;
    } catch (err) {
      console.log(err);
      throw new Error("Creating a user didn't work");
    }
  };

  const deleteUserFile = async id => {
    try {
      const result = await db.run(
        SQL`DELETE from contacts_file WHERE id = ${id}`
      );

      if (result.changes === 0) {
        throw new Error(`could not delete contact file with id = ${id}`);
      }
      return true;
    } catch (err) {
      console.log(err);
      throw new Error("contact file didn't get deleted");
    }
  };

  const updateContactFile = async (id, username) => {
    if (!username) {
      throw new Error("you didn't provide with username");
    }

    try {
      const result = await db.run(
        SQL`UPDATE contacts_file SET username = x${username} WHERE id = ${id}`
      );
      if (result.stmt.changes === 0) {
        throw new Error("could not update the contact_file username");
      }
      return true;
    } catch (err) {
      console.log(err);
      throw new Error(`could not update contact_file username with id = ${id}`);
    }
  };

  const controller = {
    getUserFiles,
    CreateUserFile,
    deleteUserFile,
    updateContactFile
  };
  return controller;
};

export default initDatabase;
