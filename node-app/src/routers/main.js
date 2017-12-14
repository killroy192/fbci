
const express = require('express');
const loggers = require('../loggers.constant');
const getData = require('../core');

const router = express.Router();

// define the home page route
router.get('/', (req, res) => {
    loggers.routerLogs(`main-router::${req.method} ${req.url}`);
    getData().then(data => res.json(data));
});

module.exports = router;
