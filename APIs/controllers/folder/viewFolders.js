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

    const data = {
      user_name: userId.user_name,
      folders:folders.folders
    }

    res.status(200).json(httpStatus200(data, null));
  } catch (error) {
    if (error) res.status(500).json(httpStatus500(error));
  }
};