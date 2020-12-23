const { Plugins } = require("../../models/db");
const { httpStatus200, httpStatus500 } = require("../../status/httpStatus");

exports.createPlugin = async (req, res) => {
  try {
    const plugin = await new Plugins({
      name: req.body.name,
      tagline: req.body.tagline,
    });
    await plugin.save();
    return res.status(200).json(httpStatus200(null));
  } catch (error) {
    if (error) res.status(500).json(httpStatus500(error));
  }
};
