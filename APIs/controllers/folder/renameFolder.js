const { httpStatus200, httpStatus500 } = require("../../status/httpStatus");
const { Folders } = require("../../models/db");

exports.renameFolderAttributes = async (req, res) => {
  if (req.body.is_modified) {
    try {
      await Folders.findByIdAndUpdate(req.body.folder_id, {
        $set: {
          folder_name: req.body.folder_name,
          folder_title: req.body.folder_title,
          folder_tag: req.body.folder_tag,
          last_accessed_on: Date.now(),
          last_modified_on: Date.now(),
        },
      });
      res.status(200).json(httpStatus200(null, "Folder Renamed"));
    } catch (error) {
      if (error) res.status(500).json(httpStatus500(error));
    }
  } else {
    try {
      await Folders.findByIdAndUpdate(req.body.folder_id, {
        $set: {
          folder_name: req.body.folder_name,
          folder_title: req.body.folder_title,
          folder_tag: req.body.folder_tag,
          last_accessed_on: Date.now(),
        },
      });
      res.status(200).json(httpStatus200(null, "Folder Renamed"));
    } catch (error) {
      if (error) res.status(500).json(httpStatus500(error));
    }
  }
};

