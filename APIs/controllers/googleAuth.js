const { Users } = require("../models/db");
const { httpStatus200, httpStatus500 } = require("../status/httpStatus");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const config = require('../config/config')

const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENTID);

exports.googleAuth = async (req, res) => {

  const ticket = await client.verifyIdToken({
      idToken: req.body.token,
      audience: process.env.GOOGLE_CLIENTID  
  });

  const payload = ticket.getPayload();

  var salt = crypto.randomBytes(16).toString("hex");
  var password = crypto
    .pbkdf2Sync("", salt, 1000, 512, "sha512")
    .toString("hex");

  try { 
    const user = await Users.findOne({ email_id: payload.email }).exec();
     if (user == null) { 
         const newUser = await new Users({
        user_name: payload.given_name,
        email_id: payload.email,
        password: password,
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

      var newToken = jwt.sign(auth_data, config.app.jwtKey);
      return res.status(200).json(httpStatus200(newToken, ""));
    }
  } catch (error) {
    httpStatus500(error.message);
  }
};