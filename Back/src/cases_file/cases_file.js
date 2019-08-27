import app from "../app";
import initCaseFiles from "./casesfile_Controller";


const caseFilesAPI = async () => {
  const controller = await initCaseFiles();

  app.post("/case/create/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const { caseTitle, messageType, status, dateCreated } = req.body;
      const result = await controller.addCaseFile(id, {
        caseTitle,
        messageType,
        status,
        dateCreated
      });
      console.log(result);
      res.json({ success: true, result });
    } catch (err) {
      next(err);
    }
  });

  app.delete("/case/delete?", async (req, res, next) => {
    try {
      const { fileID, caseID } = req.body;
      const result = await controller.deleteCaseFile(fileID, caseID);
      res.json({ success: true, message: "case got deleted", result });
    } catch (err) {
      next(err);
    }
  });

  app.patch("/case/update", async (req, res, next) => {
    try {
      const { fileID, caseID } = req.body;
      const updateData = {};
      await Object.keys(req.body).forEach(key => {
        if (req.body[key] != undefined) {
          updateData[key] = req.body[key];
        }
      });
      const result = await controller.updateCase(fileID, caseID, updateData);
      res.json({ success: true, message: "Case got update", result });
    } catch (err) {
      next(err);
    }
  });
};

export default caseFilesAPI;
