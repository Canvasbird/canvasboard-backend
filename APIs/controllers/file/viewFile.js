const { Files } = require("../../models/db");
const { httpStatus200, httpStatus500 } = require("../../status/httpStatus");

exports.viewFile = async (req, res) => {
  try {
    const file = await Files.findById(req.params.file_id)
    res.status(200).json(httpStatus200(file, "Files"));
  } catch (error) {
    if (error) res.status(500).json(httpStatus500(error));
  }
};

