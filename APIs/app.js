var express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan')
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

var config = require('./config/config');

var router = require('./Routes/index');
const folderRoutes = require('./Routes/folder');
const fileRoutes = require('./Routes/file')
const pluginRoutes = require('./Routes/plugins');

var app = express();
// ------------------ Sentry ----------------------
Sentry.init({
  dsn: "https://7905f16e0ef747ee970d420eefa65296@sentry.canvasboard.live/8",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({
          app,
      }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
// -------------------------------------------------
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
app.use('/api/v1', pluginRoutes);

app.listen(config.app.port, () => console.log(`\nAPIs are Running on PORT: ${config.app.port} 😎\n`));

