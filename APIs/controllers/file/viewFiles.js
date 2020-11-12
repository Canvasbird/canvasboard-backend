const { Folders } = require("../../models/db");
const { httpStatus200, httpStatus500 } = require("../../status/httpStatus");

exports.viewFiles = async (req, res) => {
  try {
    const files = await Folders.findById(req.params.folder_id)
      .populate("files")
      .exec();
    res.status(200).json(httpStatus200(files, "Files"));
  } catch (error) {
    if (error) res.status(500).json(httpStatus500(error));
  }
};
