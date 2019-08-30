import app from "../app";
import initContactsFile from "./ContactsFile_Controller";

const contacts_filesAPI = async () => {
  const controller = await initContactsFile();

  app.get("/contactfiles/read", async (req, res, next) => {
    try {
      const files = await controller.getContactFiles();

      res.json({ success: true, result: files });
    } catch (err) {
      next(err);
    }
  });

  app.post("/contactfiles/create", async (req, res, next) => {
    try {
      const { contactUsername, contactType, dateCreated } = req.body;
      const result = await controller.CreateContactFile({
        contactUsername,
        contactType,
        dateCreated,
      });
      res.json({ success: true, result });
    } catch (err) {
      next(err);
    }
  });

  app.delete("/contactfiles/delete/:id", async (req, res, next) => {
    try {
      const id = await req.params.id;
      const result = await controller.deleteContactFile(id);
      res.send({ success: true, result });
    } catch (err) {
      next(err);
    }
  });

  app.patch("/contactfiles/update/:id", async (req, res, next) => {
    try {
      const id = await req.params.id;
      const updateData = {};
       Object.keys(req.body).forEach(key => {
        if (req.body[key] != undefined) {
          updateData[key] = req.body[key];
        }
      });
      console.log("UPDATEDATA",updateData)
      const result = await controller.updateContactFile(id, updateData);
      console.log(result)
      await res.json({ success: true, result });
    } catch (err) {
      next(err);
    }
  });
};

export default contacts_filesAPI;
