const mongoose = require('mongoose');
const validator = require('validator');

mongoose.Promise = global.Promise;

const User = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.ObjectId,
        auto: true,
    },
    login: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// validation
User.path('login').validate((v) => {
    return v.length > 3 && v.length < 20;
}, 'login `{VALUE}` is not valid');

User.path('email').validate((v) => {
    return validator.isEmail(v);
}, 'email `{VALUE}` is not valid');

module.exports = mongoose.model('User', User);
