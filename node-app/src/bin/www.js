// const http = require('http');
const path = require('path');
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const loggers = require('../loggers.constant');

const app = require('../app');

const port = +process.env.PORT || 8080;
const hostname = process.env.HOST || '127.0.0.1';

const handleError = error => loggers.globalLogs(`The ${error} was throws`);

const handleListen = () => loggers.globalLogs(`Server running at http://${hostname}:${port}/`);

// const server = http.createServer(app);

app.listen(port, hostname)
    .on('error', handleError)
    .on('listening', handleListen);
