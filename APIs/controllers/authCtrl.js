var jwt = require("jsonwebtoken");
var crypto = require("crypto");
const nodemailer = require("nodemailer");
const moment  = require("moment")
var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth2').Strategy;

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
function reset(req, res){
    if (!req.body.password) {
        res.status(500).json({
            success: false,
            message: "password is required"
        });
        return;
    }
    var reset_token = req.body.reset_token;
    var new_pass = req.body.password;
    db.PasswordReset.findOne({reset_token:reset_token}, (err, pass_reset) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
        if(pass_reset){
            var valid_till = moment(pass_reset.issued_on).add(30,'m')
            if(moment().isBefore(valid_till) && pass_reset.is_used===false){
                db.Users.findById(pass_reset.user_id,  (err,user) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }
                    if(user){
                        var salt = crypto.randomBytes(16).toString('hex');
                        user.salt = salt
                        user.password = crypto.pbkdf2Sync(new_pass, salt, 1000, 512, "sha512").toString('hex');
                        user.save((err,user_data)=> {
                            if (err) {
                                console.error(err);
                                return res.status(500).json({
                                    success: false,
                                    message: err.message
                                });
                            }
                            if(user_data){
                                pass_reset.is_used = true;
                                pass_reset.used_on = Date.now();
                                pass_reset.save((err,data) => {
                                    if (err) {
                                        console.error(err);
                                        return res.status(500).json({
                                            success: false,
                                            message: err.message
                                        });
                                    }
                                    if(data){
                                        return res.status(200).json({
                                            success: true,
                                            message: "Password Updated Successfully"
                                        });
                                    }
                                })
                            }
                        })
                    }
                    else {
                        console.error(err);
                        return res.status(500).json({
                            success: false,
                            message: "Invalid user"
                        });
                    }
                })
            }else{
                return res.status(500).json({
                    success: false,
                    message: "Token expired! Try again!"
                });
            }
        }
        else{
            return res.status(500).json({
                success: false,
                message: "Invalid Token"
            });
        }
    } )
}

function forget(req, res){
    try{
        if (!req.body.email_id) {
            res.status(500).json({
                success: false,
                message: "email_id is required"
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
                pass_reset = {
                    reset_token: crypto.randomBytes(16).toString('hex'),
                    user_id: user._id
                }
                pass_obj = new db.PasswordReset(pass_reset);
                pass_obj.save( (err, data) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }
                    if (data){
                        const html = `Hi there,
        <br/>
        Go to the Link below to Reset Your Password! Link valid for 30 minutes.
        <br/><br/>
        Please verify your email <a href="http://localhost:4000/api/v1/reset?id=${data.reset_token}">HERE</a>
        <br/><br/>
        If your did not requested password reset kindly ignore this message.`
                        transporter.sendMail({
                            from: `CanvaBoard 👨🏻‍🏫 <${process.env.SENDER_EMAIL}>`, // sender address
                            to: `${user.email_id}`, // list of receivers
                            subject: "CanvaBoard Account Password Reset ✔", // Subject line
                            text: `Hello ${user.user_name} 👋🏻\n Reset Your Password`, // plain text body
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
                                    message: "Reset Password mail sent succesfully"
                                });
                            }
                        })
                    }
                })
                
            }
            else {
                return res.status(500).json({
                    success: false,
                    message: "User not Found"
                });
            }
        })
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

function googleLogin(req, res) {

    passport.use(new GoogleStrategy({
        clientID: "1072945288142-9l42v56jia9ja9bb8c7rr7jd7sj10rfh.apps.googleusercontent.com",
        clientSecret: "3XiMUUyzxGa-YQiqpzDgkAvh",
        callbackURL: "http://localhost:4000/google/callback",
        passReqToCallback: true
    },
        function (request, accessToken, refreshToken, profile, done) {
            User.findOrCreate({ googleId: profile.id }, function (err, user) {
                return done(err, user);
            });
        }
    ));
}

module.exports = {
    login,
    register,
    verify,
    forget,
    reset
}