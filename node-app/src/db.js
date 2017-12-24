const mongoose = require('mongoose');
const { DB_ADDR } = require('constants/mongoose.constants');

module.exports = {
    init: () => {
        mongoose.connect(DB_ADDR, { useMongoClient: true });
        return mongoose.connection;
    },
};
