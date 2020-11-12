const { httpStatus200, httpStatus500 } = require("../../status/httpStatus");
const { Users, Folders } = require("../../models/db");

const jwt = require("jsonwebtoken");
exports.removeFolder = async (req, res) => {
  try {
    var userId = jwt.verify(
      req.get("X-AUTH-TOKEN"),
      process.env.JWT_SECRET_KEY
    );

    const user = await Users.findById(userId.user_id);

    if (user != null) {
      await Folders.findByIdAndDelete(req.body.folder_id);
      try {
        const message = user.removeFolderReference(req.body.folder_id);
        res.status(200).json(httpStatus200(null, message));
      } catch (error) {
        if (error) res.status(500).json(httpStatus500(error));
      }
    }
  } catch (error) {
    if (error) res.status(500).json(httpStatus500(error));
  }
};
