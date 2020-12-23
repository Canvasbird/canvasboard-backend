const { Plugins } = require("../../models/db");
const { httpStatus200, httpStatus500 } = require("../../status/httpStatus");

exports.onePlugin = async (req, res) => {
  try {
    const plugin = await Plugins.findOne({name: req.params.plugin});
    if(plugin)
      return res.status(200).json(httpStatus200(plugin, "Plugin"));
    else
      return res.status(404).json({message: "Not Found"})
  } catch (error) {
    if (error) res.status(500).json(httpStatus500(error));
  }
};
