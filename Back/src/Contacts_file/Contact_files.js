import app from "../app";
import initContactsFile from "./ContactsFile_db";

const contacts_filesAPI = async () => {
  const controller = await initContactsFile();

  app.get("/Contact_files/read", async (req, res, next) => {
    try {
      const files = await controller.getContactFiles();

      res.json({ success: true, result: files });
    } catch (err) {
      next(err);
    }
  });

  app.post("/Contact_files/create", async (req, res, next) => {
    try {
      const { contact_username } = req.query;
      var date_created = new Date();
      const result = await controller.CreateUserFile({
        contact_username,
        date_created
      });
      res.json({ success: true, result });
    } catch (err) {
      next(err);
    }
  });

  app.delete("/Contact_files/delete/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await controller.deleteUserFile(id);
      res.json({ success: true, result });
    } catch (err) {
      next(err);
    }
  });

  app.patch("/Contact_files/update/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const { username } = req.query;
      const result = await controller.updateContactFile(id, username);
      res.json({ success: true, result });
    } catch (err) {
      next(err);
    }
  });
};

export default contacts_filesAPI;