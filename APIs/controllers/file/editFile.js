const { Files } = require("../../models/db");
const { httpStatus200, httpStatus500 } = require("../../status/httpStatus");

exports.editFileData = async (req, res) => {
  if (req.body.is_modified) {
    try {
      const changedContent = await Files.findByIdAndUpdate(req.body.file_id, {
        $set: {
          last_accessed_on: Date.now(),
          last_modified_on: Date.now(),
          data: req.body.data,
          file_name: req.body.file_name
        },
      });
      if (changedContent !== null)
        res.status(200).json(httpStatus200(null, "File Updated"));
      else
        res.status(500).json(httpStatus500("Invalid File Id"));
    } catch (error) {
      if (error) res.status(500).json(httpStatus500(error));
    }
  } else {
    try {
      const changedContent = await Files.findByIdAndUpdate(req.body.file_id, {
        $set: {
          last_accessed_on: Date.now(),
          data: req.body.data,
          file_name: req.body.file_name
        },
      });
      if (changedContent !== null)
        res.status(200).json(httpStatus200(null, "File Renamed"));
      else
        res.status(500).json(httpStatus500("Invalid File Id"));
    } catch (error) {
      if (error) res.status(500).json(httpStatus500(error));
    }
  }
};


