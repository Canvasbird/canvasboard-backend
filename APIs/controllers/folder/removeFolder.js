const { httpStatus200, httpStatus500 } = require("../../status/httpStatus");
const { Users, Folders } = require("../../models/db");

const jwt = require("jsonwebtoken");

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

exports.removeFolder = async (req, res) => {
  if (isEmpty(req.query)) {
    res.status(500).json(httpStatus500("Invalid Request!"));
  } else {
    try {
      var userId = jwt.verify(
        req.get("X-AUTH-TOKEN"),
        process.env.JWT_SECRET_KEY
      );
      const user = await Users.findById(userId.user_id);
      if (user != null) {
        await Folders.findByIdAndDelete(req.query.folder_id);
        try {
          const message = user.removeFolderReference(req.query.folder_id);
          res.status(200).json(httpStatus200(null, message));
        } catch (error) {
          if (error) res.status(500).json(httpStatus500(error));
        }
      }
    } catch (error) {
      if (error) res.status(500).json(httpStatus500(error));
    }
  }
};
