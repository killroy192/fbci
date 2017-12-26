const express = require('express');
const path = require('path');
const loggers = require('loggers');
const {
    createUser,
    checkUser,
} = require('services/user.services.js');
const { stringifyCode } = require('helpers');
const codes = require('constants/code.constants');


const MODULE_NAME = path.basename(__filename);

const router = express.Router();

router
    .post('/login', (req, res) => {
        if (req.session.user) {
            return res.redirect('/');
        }

        return checkUser(req.body)
            .then((user) => {
                if (user) {
                    req.session.user = { id: user._id, login: user.login };
                    res.redirect('/');
                }
            })
            .catch((e) => {
                if (e.name && e.name !== codes.ERROR_TYPE) {
                    loggers.error(MODULE_NAME, e.massage);
                    return res.status(codes.INTERNAL_SERVER_ERROR.code).send(codes.INTERNAL_SERVER_ERROR.str);
                }
                return res.status(e.code).send(e.massages);
            });
    })
    .post('/registry', (req, res) => {
        createUser(req.body)
            .then((user) => {
                req.session.user = { id: user._id, login: user.login };
                loggers.log(MODULE_NAME, stringifyCode(codes.CREATED));
                res.redirect('/');
            })
            .catch((e) => {
                if (e.name && e.name !== codes.ERROR_TYPE) {
                    loggers.error(MODULE_NAME, e.massage);
                    return res.status(codes.INTERNAL_SERVER_ERROR.code).send(codes.INTERNAL_SERVER_ERROR.str);
                }
                return res.status(e.code).send(e.massages);
            });
    })
    .post('/logout', (req, res) => {
        if (req.session.user) {
            delete req.session.user;
            res.redirect('/');
        }
    });

module.exports = router;
