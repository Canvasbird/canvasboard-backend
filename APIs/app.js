const express = require('express');
const config = require('./config/config');

const app = express();

// ------------------ Sentry ----------------------
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');

Sentry.init({
    dsn: 'https://7905f16e0ef747ee970d420eefa65296@sentry.canvasboard.live/8',
    
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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const morgan = require('morgan');
app.use(morgan('dev'));

const helmet = require('helmet');
app.use(helmet());

const cors = require('cors');
app.use(cors());

app.listen(config.app.port, (err) => {
    if (err) {
        return console.error(`\nError starting server! ❌\n${err}`);
    }
    console.log(`\nServer successfully started on PORT: ${config.app.port} ✔️`);
});

app.get('/', (req, res) => {
    return res.status(200).send({
        success: true,
        message: 'Welcome to the Canvasboard APIs'
    });
});

const router = require('./Routes/index');
app.use('/api/v1', router);

const folderRoutes = require('./Routes/folder');
app.use('/api/v1', folderRoutes);

const fileRoutes = require('./Routes/file');
app.use('/api/v1', fileRoutes);