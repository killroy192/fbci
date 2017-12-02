const http = require('http');
const path = require('path');
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../../.env') });

import * as app from '../app';

const port = +process.env.PORT || 8080;
const hostname = process.env.HOST || '127.0.0.1';

const handleError = error => console.log(`The ${error} was throws`);

const handleListen = () => console.log(`Server running at http://${hostname}:${port}/`);

const server = http.createServer(app.serverHandler);

server.listen(port, hostname)
    .on('error', handleError)
    .on('listening', handleListen);