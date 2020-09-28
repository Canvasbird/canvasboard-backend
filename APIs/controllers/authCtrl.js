var jwt = require("jsonwebtoken");
var crypto = require("crypto");
const nodemailer = require("nodemailer");

// File Imports

var db = require("../models/db");
var config = require("../config/config");


let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_EMAIL, // generated ethereal user
        pass: process.env.GMAIL_PASSWORD, // generated ethereal password
    },
});


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
                console.log("hy")
                console.error(err);
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
            if (user) {

                password = crypto.pbkdf2Sync(req.body.password, user.salt, 1000, 512, "sha512").toString('hex');

                if (user.password === password) {
                    if (user.verified) {
                        var auth_data = {
                            user_id: user._id,
                            user_name: user.user_name,
                            email_id: user.email_id,
                            institute_name: user.institute_name,
                            verified: user.verified,
                            created_at: new Date()
                        };

                        var token = jwt.sign(auth_data, config.app.jwtKey);

                        return res.status(200).json({
                            success: true,
                            token: token
                        });

                    } else {
                        return res.status(500).json({
                            success: true,
                            message: "Please verify your email-id"
                        });
                    }

                } else {
                    return res.status(500).json({
                        success: true,
                        message: "Incorrect password"
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

async function register(req, res) {

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
                    const html = `Hi there,
      <br/>
      Thank you for registering!
      <br/><br/>
      Please verify your email <a href="http://localhost:4000/api/v1/verify?id=${data._id}">HERE</a>
      <br/><br/>
      Have a pleasant day.`
                    transporter.sendMail({
                        from: `CanvaBoard 👨🏻‍🏫 <${process.env.SENDER_EMAIL}>`, // sender address
                        to: `${data.email_id}`, // list of receivers
                        subject: "Verify Your CanvaBoard Account ✔", // Subject line
                        text: `Hello ${data.user_name} 👋🏻\n Please verify your account`, // plain text body
                        html: html, // html body
                    }, (err, info) => {
                        if (err) {
                            console.log(err)
                            return res.status(500).json({
                                success: true,
                                message: "Something went wrong, Try again later."
                            });
                        } else {
                            console.log("Message sent: %s", info.messageId);
                            return res.status(200).json({
                                success: true,
                                message: "User Registered successfully."
                            });
                        }
                    })
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


function verify(req, res) {
    try {
        if (!req.query.id) {
            res.status(500).json({
                success: false,
                message: "id param is required"
            });
            return;
        }
        db.Users.findByIdAndUpdate(req.query.id, { verified: true }, (err, doc) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: err
                });
                return;
            }
            return res.status(200).json({
                success: true,
                message: `${doc.user_name} verified successfully.`
            });
        })
    } catch (error) {

    }
}

module.exports = {
    login,
    register,
    verify
}