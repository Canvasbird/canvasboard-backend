var config = require("../config/config");
const { Users } = require("../models/db");
const { httpStatus200, httpStatus500 } = require("../status/httpStatus");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

var salt = crypto.randomBytes(16).toString("hex");

exports.googleAuth = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email }).exec();
    if (user == null) {
      const newUser = await new Users({
        user_name: req.body.user_name,
        email_id: req.body.email,
        password: salt,
        salt: salt,
        verified: true,
        institute_name: "",
      });

      try {
        await newUser.save();

        var token = {
          _id: newUser._id,
          user_name: newUser.user_name,
          email_id: newUser.email_id,
        };

        token = jwt.sign(token, config.app.jwtKey);
        return res.status(200).json(httpStatus200(token, ""));
      } catch (error) {
        httpStatus500(error.message);
      }
    }

    if (user) {
      var auth_data = {
        user_id: user._id,
        user_name: user.user_name,
        email_id: user.email_id,
        institute_name: user.institute_name,
        verified: user.verified,
        created_at: new Date(),
      };

      var newToken = jwt.sign(auth_data, config.app.JwtKey);
      return res.status(200).json(httpStatus200(newToken, ""));
    }
  } catch (error) {
    httpStatus500(error.message);
  }
};
