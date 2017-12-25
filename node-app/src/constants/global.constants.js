const { hash } = require('helpers');

module.exports = {
    dbg_colors: {
        ERROR: 1,
        WARN: 3,
        LOG: 4,
    },

    SECRET_KEY: hash('It seems difficulty'),
};
