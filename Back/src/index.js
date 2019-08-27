import app from "./app";

import mongoose from "mongoose";

import contacts_filesAPI from "./Contacts_file/Contact_files"
import caseFilesAPI from "./cases_file/cases_file";

mongoose.connect(
  "mongodb+srv://William:develwer@cluster0-sxlgp.gcp.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true }
);


app.listen(3000, () => {
  console.log("server listening on port 3000");
});


contacts_filesAPI();
caseFilesAPI();