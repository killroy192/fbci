const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
// const serveFavicon = require('serve-favicon');
const path = require('path');
const loggers = require('loggers');
const mainRouter = require('routers/main.routers.js');
const { SECRET_KEY } = require('constants/global.constants');

const MODULE_NAME = path.basename(__filename);

const serverHandler = express();
loggers.log(MODULE_NAME, ' ...running');

serverHandler
    .disable('x-powered-by')
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(session({
        secret: SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    }))
    // .use(express.static(path.join(__dirname, '/web/dist/')))
    .use('/', mainRouter);

module.exports = serverHandler;
