
const express = require('express');
const loggers = require('loggers');
const getData = require('core');

const router = express.Router();

// define the home page route
router.get('/api', (req, res) => {
    loggers.router(`main-router->${req.method} ${req.url}`);
    getData().then(data => res.json(data));
});

router.post('/api', (req, res) => {
    res.send('This is not implemented now');
});

router.put('/api', (req, res) => {
    res.send('This is not implemented now');
});

router.delete('/api', (req, res) => {
    res.send('This is not implemented now');
});

module.exports = router;
