const { Files } = require("../../models/db");
const { httpStatus200, httpStatus500 } = require("../../status/httpStatus");

exports.lastAccessedModifiedFile = async (req, res) => {
  if (!req.body.is_modified) {
    try {
      await Files.findByIdAndUpdate(req.body.file_id, {
        $set: {
          last_accessed_on: Date.now(),
        },
      });
      res.status(200).json(httpStatus200());
    } catch (error) {
      if (error) res.status(500).json(httpStatus500(error));
    }
  } else {
    try {
      await Files.findByIdAndUpdate(req.body.file_id, {
        $set: {
          last_accessed_on: Date.now(),
          last_modified_on: Date.now(),
          data:req.body.data
        },
      });
      res.status(200).json(httpStatus200());
    } catch (error) {
      if (error) res.status(500).json(httpStatus500(error));
    }
  }
};
