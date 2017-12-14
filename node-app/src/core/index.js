const fetch = require('node-fetch');
const loggers = require('../loggers.constant');
const { calculator } = require('./calculator');
const constants = require('./constants');

const address = `${constants.API}/?${constants.LIMIT}`;

module.exports = function getData() {
    return fetch(address)
        .then(res => res.json())
        .then(calculator)
        .catch((error) => {
            loggers.coreLogs(`There has been a problem with your fetch operation: ${error.message}`);
        });
};
