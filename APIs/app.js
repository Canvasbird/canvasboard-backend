var express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');

var config = require('./config/config');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", function (req, res) {
    res.status(200).json({
      success: true,
      message: "Welcome to the Canvasboard APIs"
    });
  });



app.listen(config.app.port, () => console.log(`\nAPIs are Running on PORT: ${config.app.port} 😎\n`));