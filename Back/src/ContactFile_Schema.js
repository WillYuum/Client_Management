import { Schema, model } from "mongoose";

var contactsFile = Schema({
  _id: String,
  contactUsername: String,
  contactType: String,
  dateCreated: String,
  cases: [
    {
      caseId: String,
      caseTitle: String,
      caseType: String,
      status: Number,
      dateCreated: String,
      logs: [
        {
          logId: String,
          info: String,
          dateCreated: String,
        }
      ]
    }
  ]
});

export default model("contactsFile", contactsFile);
