import uuidv4 from "uuid/v4";

import contactsFile from "../ContactFile_Schema";


const initLogs = async () => {
  const addLog = async (fileID, caseID, props) => {
    const { info, dateCreated } = props;
    if (!info || !dateCreated) {
      throw new Error(
        "you didn't provide with the full input for creating a case"
      );
    }

    try {
      console.log(props);
      const createLog = await contactsFile.findByIdAndUpdate(
        { _id: fileID },
        {
          $push: {  }
        }
      );

      return createLog;
    } catch (err) {
      throw new Error("failed to create a log");
    }
  };

  const controller = {
    addLog
  };
  return controller;
};

export default initLogs;
