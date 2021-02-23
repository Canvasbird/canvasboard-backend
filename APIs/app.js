var express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan')

var config = require('./config/config');

var router = require('./Routes/index');
const folderRoutes = require('./Routes/folder');
const fileRoutes = require('./Routes/file')

var app = express();
app.use(morgan('dev'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());



app.get("/", function (req, res) {
  res.status(200).json({
    success: true,
    message: "Welcome to the Canvasboard APIs"
  });
});


app.use('/api/v1', router);
app.use('/api/v1', folderRoutes)
app.use('/api/v1', fileRoutes)

app.listen(config.app.port, () => console.log(`\nAPIs are Running on PORT: ${config.app.port} 😎\n`));

