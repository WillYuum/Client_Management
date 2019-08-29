import { Schema, model } from "mongoose";

var contactsFile = Schema({
  _id: String,
  contactUsername: String,
  contactType: String,
  dateCreated: Date,
  cases: [
    {
      caseId: String,
      caseTitle: String,
      messageType: String,
      status: Number,
      dateCreated: Number,
      logs: [
        {
          logId: String,
          info: String,
          dateCreated: Number,
        }
      ]
    }
  ]
});

export default model("contactsFile", contactsFile);
