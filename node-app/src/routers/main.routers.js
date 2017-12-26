
const express = require('express');
const path = require('path');
const loggers = require('loggers');
const getData = require('core/core.api');
const userRouters = require('./user.routers');

const MODULE_NAME = path.basename(__filename);

const router = express.Router();

// define the home page route
router
.use('/', userRouters)
.get('/', (req, res) => {
    loggers.log(MODULE_NAME, `${req.method} ${req.url}`);
    getData().then(data => res.json(data));
});

module.exports = router;
