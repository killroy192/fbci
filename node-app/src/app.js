const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const serveFavicon = require('serve-favicon');
const path = require('path');
const loggers = require('./loggers');
const standartRouter = require('./routers/main');

const serverHandler = express();

loggers.appLogs(' ...running');

serverHandler
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(cookieParser())
    // .use(express.static(path.join(__dirname, '/web/dist/')))
    .use('/', standartRouter);

module.exports = serverHandler;
