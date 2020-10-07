const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
var db = require("./models/db");
var crypto = require("crypto");
var config = require("./config/config");


passport.serializeUser(function (user, done) {
    done(null, user.user_id);
});

passport.deserializeUser(function (user, done) {
    db.Users.findById(user, (err, user) => {
        if (err) {
            done(err);
        } else {
            done(null, user)
        }
    })
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_CLIENTSECTRET,
    callbackURL: `http://localhost:${config.app.port}/google/callback`,
},
    function (accessToken, refreshToken, profile, done) {
        try {
            db.Users.findOne({
                email_id: profile._json.email.trim().toLowerCase()
            }, (err, user) => {
                if (err) {
                    console.error(err);
                    return done(err)
                }
                if (user) {
                    var auth_data = {
                        user_id: user._id,
                        user_name: user.user_name,
                        email_id: user.email_id,
                        institute_name: user.institute_name,
                        verified: user.verified,
                    };
                    // var token = jwt.sign(auth_data, config.app.jwtKey);
                    return done(null, auth_data);
                }
                else {
                    var salt = crypto.randomBytes(16).toString('hex');
                    var password = crypto.pbkdf2Sync(profile._json.sub, salt, 1000, 512, "sha512").toString('hex');
                    var new_user = {
                        user_name: profile._json.given_name + profile._json.family_name,
                        email_id: profile._json.email,
                        password: password,
                        salt: salt,
                        verified: true
                    }
                    var user_obj = new db.Users(new_user);
                    user_obj.save((err, user) => {
                        if (err) {
                            console.error(err);
                            return done(err)
                        }
                        if (user) {
                            console.log(user)
                            var auth_data = {
                                user_id: user._id,
                                user_name: user.user_name,
                                email_id: user.email_id,
                                institute_name: user.institute_name,
                                verified: user.verified,
                            };
                            // var token = jwt.sign(auth_data, config.app.jwtKey);
                            return done(null, auth_data);
                        }
                    })
                }

            });

        } catch (err) {
            console.error(err);
            done(err)
        }
    }
));