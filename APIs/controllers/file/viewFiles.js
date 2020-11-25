const { Folders } = require("../../models/db");
const { httpStatus200, httpStatus500 } = require("../../status/httpStatus");

exports.viewFiles = async (req, res) => {
  try {
    const files = await Folders.findById(req.params.folder_id)
      .populate("files")
      .exec();
    const folder = await Folders.findById(req.params.folder_id)
    const data = {
      files: files.files,
      folder_id: folder.folder_id,
      folder_name: folder.folder_name,
      folder_title: folder.folder_title,
      folder_tag: folder.folder_tag
    }
    res.status(200).json(httpStatus200(data, "Files"));
  } catch (error) {
    if (error) res.status(500).json(httpStatus500(error));
  }
};
