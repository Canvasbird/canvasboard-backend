var express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session')
var jwt = require("jsonwebtoken");
require('./passportSetup');

var config = require('./config/config');
var router = require('./Routes/index');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(cookieSession({
  name: 'canvasboard',
  keys: ['key1', 'key2']
}))

app.use(passport.initialize());
app.use(passport.session());

app.get("/", function (req, res) {
  res.status(200).json({
    success: true,
    message: "Welcome to the Canvasboard APIs"
  });
});

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function (req, res) {
    res.redirect('/good');
  }
);

app.get('/good', (req, res) => {
  let user = req.user
  if (user) {
    var auth_data = {
      user_id: user._id,
      user_name: user.user_name,
      email_id: user.email_id,
      institute_name: user.institute_name,
      verified: user.verified,
    };
    var token = jwt.sign(auth_data, config.app.jwtKey);
    return res.json({ token });
  }
  else {
    return res.json({
      success: false,
      message: "User Not logged in"
    })
  }
})
app.get('/failed', (req, res) => res.send('You Failed to log in!'))
app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
})

app.use('/api/v1', router);


app.listen(config.app.port, () => console.log(`\nAPIs are Running on PORT: ${config.app.port} 😎\n`));