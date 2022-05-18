const { Plugins } = require("../../models/db");
const { httpStatus200, httpStatus500 } = require("../../status/httpStatus");

exports.allPlugin = async (req, res) => {
  try {
    const plugins = await Plugins.find();
    return res.status(200).json(httpStatus200(plugins, "Plugins"));
  } catch (error) {
    if (error) res.status(500).json(httpStatus500(error, "message"));
  }
};
