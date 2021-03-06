const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const User = new mongoose.Schema({
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

module.exports = mongoose.model('User', User);
