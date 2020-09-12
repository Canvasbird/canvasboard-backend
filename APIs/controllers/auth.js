var jwt = require("jsonwebtoken");
var crypto = require("crypto");

// File Imports

var db = require("../models/db");
var config = require("../config/config");


function login(req, res) {

    try {

        if (!req.body.email_id) {
            res.status(500).json({
                success: false,
                message: "email_id is required"
            });
            return;
        }

        if (!req.body.password) {
            res.status(500).json({
                success: false,
                message: "password is required"
            });
            return;
        }

        db.Users.findOne({
            email_id: req.body.email_id.trim().toLowerCase()
        }, (err, user) => {

            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (user) {

                password = crypto.pbkdf2Sync(req.body.password, user.salt, 1000, 512, "sha512").toString('hex');

                if (user.password === password) {

                    var auth_data = {
                        user_id: user._id,
                        user_name: user.user_name,
                        email_id: user.email_id,
                        institute_name: user.institute_name,
                        created_at: new Date()
                    };

                    var token = jwt.sign(auth_data, config.app.jwtKey);

                    return res.status(200).json({
                        success: true,
                        token: token
                    });

                }

            }
            else {
                return res.status(500).json({
                    success: false,
                    message: "User not found."
                });
            }

        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

function register(req, res) {

    try {

        if (!req.body.email_id) {
            res.status(500).json({
                success: false,
                message: "email_id is required"
            });
            return;
        }

        if (!req.body.password) {
            res.status(500).json({
                success: false,
                message: "password is required"
            });
            return;
        }

        if (!req.body.user_name) {
            res.status(500).json({
                success: false,
                message: "user_name is required"
            });
            return;
        }

        db.Users.findOne({
            email_id: req.body.email_id
        }, (err, user) => {

            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (user) {
                return res.status(500).json({
                    success: false,
                    message: "User already registered."
                });
            }

            var salt = crypto.randomBytes(16).toString('hex');
            var password = crypto.pbkdf2Sync(req.body.password, salt, 1000, 512, "sha512").toString('hex');


            var new_user = {
                user_name: req.body.user_name,
                email_id: req.body.email_id,
                password: password,
                salt: salt,
                institute_name: req.body.institute_name
            }

            var user_obj = new db.Users(new_user);

            user_obj.save((err, data) => {

                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                if (data) {
                    return res.status(200).json({
                        success: true,
                        message: "User Registered successfully."
                    });
                }
                else {
                    return res.status(500).json({
                        success: true,
                        message: "Something went wrong, Try again later."
                    });
                }

            });

        });


    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

module.exports = {
    login,
    register
}