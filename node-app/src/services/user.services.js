const path = require('path');
const User = require('models/user.model');
const loggers = require('loggers');
const { hash256, stringifyCode } = require('helpers');
const { SHA_SECRET_KEY } = require('constants/mongoose.constants');
const codes = require('constants/code.constants');
const { customizeErrors } = require('./helpers.services');

const MODULE_NAME = path.basename(__filename);

// User API
const createUser = (userData) => {
    if (userData.password.length < 5) {
        return Promise.reject(codes.WRONG_PASSWORD);
    }
    const user = {
        login: userData.login,
        email: userData.email,
        password: hash256(userData.password, SHA_SECRET_KEY),
    };
    return new User(user)
    .save()
    .catch((e) => {
        if (!e.code || e.code !== codes.UNKNOWN_ERROR.code) {
            throw customizeErrors(e);
        }
        loggers.error(MODULE_NAME, e.massages);
    });
};

const getUserById = (id) => {
    return User.findById(id);
};

const checkUser = (userData) => {
    let identificator;
    if (userData.login) {
        identificator = { login: userData.login };
    } else if (userData.email) {
        identificator = { email: userData.email };
    } else {
        identificator = { login: null };
    }
    return User
        .findOne(identificator)
        .then((doc) => {
            if (doc.password === hash256(userData.password, SHA_SECRET_KEY)) {
                loggers.log(MODULE_NAME, stringifyCode(codes.ACCEPTED));
                return Promise.resolve(doc);
            }
            return Promise.reject(codes.WRONG_PASSWORD);
        })
        .catch((e) => {
            if (e.code !== codes.UNKNOWN_ERROR.code) {
                throw customizeErrors(e);
            }
            loggers.error(MODULE_NAME, e.massages);
        });
};

module.exports = {
    createUser,
    getUserById,
    checkUser,
};
