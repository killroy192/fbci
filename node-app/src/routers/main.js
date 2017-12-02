const { Router, Request, Response } = require('express');

const standartRouter = Router();

standartRouter.get('/users', (req, res) => {
    res.send(JSON.stringify(userData));
});

export {
    standartRouter
};