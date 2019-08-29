import app from "../app";
import initLog from "./logsController";

const logAPI = async () => {
  const controller = await initLog();

  app.post("/log/create/", async (req, res, next) => {
    try {
      const { fileID, caseID } = req.body;
      const { info, dateCreated } = req.body;
      const result = await controller.addLog(fileID, caseID, {
        info,
        dateCreated
      });
      res.json({ success: true, result });
    } catch (err) {
      next(err);
    }
  });
};
export default logAPI;
