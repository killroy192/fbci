const path = require('path');

process.env.NODE_PATH = path.join(__dirname, '../');
/* eslint-disable no-underscore-dangle */
require('module').Module._initPaths();

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const loggers = require('loggers');
const db = require('db');
const app = require('app');

const port = +process.env.PORT || 8080;
const hostname = process.env.HOST || '127.0.0.1';
const handleError = error => loggers.error(`The ${error} was throws`);
const handleListen = () => {
    loggers.log(`Server running at http://${hostname}:${port}/`)
};

db.init()
    .on('error', handleError)
    .once('open', () => {
        app.listen(port, hostname)
            .on('error', handleError)
            .on('listening', handleListen);
    });
