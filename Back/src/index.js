import app from "./app";
import initDatabase from "./db";

const start = async () => {
  const controller = await initDatabase();

  app.get("/Contact_files/read", async (req, res, next) => {
    try {
      const files = await controller.getUserFiles();

      res.json({ success: true, result: files });
    } catch (err) {
      next(err);
    }
  });

  app.post("/Contact_files/create", async (req, res, next) => {
    try {
      const { username, date_created } = req.query;
      const result = await controller.CreateUserFile({
        username,
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

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
start();
