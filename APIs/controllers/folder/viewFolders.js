const { httpStatus200, httpStatus500 } = require("../../status/httpStatus");
const { Users } = require("../../models/db");
const jwt = require("jsonwebtoken");
exports.viewUserFolders = async (req, res) => {
  try {
    var userId = jwt.verify(
      req.get("X-AUTH-TOKEN"),
      process.env.JWT_SECRET_KEY
    );

    const user = await Users.findById(userId.user_id);
    const folders = await user.populate("folders").execPopulate();
    res.status(200).json(httpStatus200(folders.folders, null));
  } catch (error) {
    if (error) res.status(500).json(httpStatus500(error));
  }
};
