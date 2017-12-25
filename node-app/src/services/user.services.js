const path = require('path');
const User = require('models/user.model');
const loggers = require('loggers');
const { hash256 } = require('helpers');
const { SHA_SECRET_KEY } = require('constants/mongoose.constants');

const MODULE_NAME = path.basename(__filename);

// User API
const createUser = (userData) => {
    const user = {
        email: userData.email,
        password: hash256(userData.password, SHA_SECRET_KEY),
    };
    return new User(user).save();
};

const getUserById = (id) => {
    return User.findOne(id);
};

const checkUser = (userData) => {
    return User
        .findOne({ email: userData.email })
        .then((doc) => {
            if (doc.password === hash256(userData.password, SHA_SECRET_KEY)) {
                loggers.log(MODULE_NAME, 'User password is ok');
                return Promise.resolve(doc);
            }
            return Promise.reject('password wrong');
        })
        .catch((e) => {
            loggers.error(MODULE_NAME, e.massage);
        });
};

module.exports = {
    createUser,
    getUserById,
    checkUser,
};
