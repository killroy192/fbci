const express = require('express');
const path = require('path');
const loggers = require('loggers');
const {
    createUser,
    getUserById,
    checkUser,
} = require('services/user.services.js');


const MODULE_NAME = path.basename(__filename);

const router = express.Router();

router
    .post('/login', (req, res) => {
        if (req.session.user) {
            return res.redirect('/registry');
        }

        return checkUser(req.body)
            .then((user) => {
                if (user) {
                    req.session.user = { id: user._id, name: user.name };
                    res.redirect('/');
                }
            })
            .catch((error) => {
                loggers.error(MODULE_NAME, error.massage);
            });
    })
    .post('/registry', (req, res) => {
        createUser(req.body)
            .then((result) => {
                loggers.log(MODULE_NAME, 'User created');
            })
            .catch((err) => {
                if (err.toJSON().code === 11000) {
                    loggers.log(MODULE_NAME, 'This email already exist');
                    res.status(500).send('This email already exist');
                } else {
                    loggers.log(MODULE_NAME, 'somth. gone wrong');
                }
            });
    })
    .post('/logout', (req, res) => {
        if (req.session.user) {
            delete req.session.user;
            res.redirect('/');
        }
    });

module.exports = router;
