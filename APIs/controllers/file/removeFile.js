const { Files, Folders } = require("../../models/db");
const { httpStatus200, httpStatus500 } = require("../../status/httpStatus");

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

exports.removeFile = async (req, res) => {
  if (isEmpty(req.query)) {
    res.status(500).json(httpStatus500("Invalid Request"));
  } else {
    try {
      const rootFolder = await Folders.findById(req.query.folder_id);
      if (rootFolder !== null) {
        await Files.findByIdAndDelete(req.query.file_id);
        const message = await rootFolder.removeFileReference(req.query.file_id);
        console.log(message);
        res.status(200).json(httpStatus200(null, message));
      }
    } catch (error) {
      if (error) res.status(500).json(httpStatus500(error));
    }
  }
};
