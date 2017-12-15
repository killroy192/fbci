const fetch = require('node-fetch');
const loggers = require('../loggers');
const { calcPortfolio } = require('./calc');
const constants = require('./constants');

const address = `${constants.API}/?limit=${constants.LIMIT}`;

loggers.coreLogs(`index->fetching data from ${address}`);

module.exports = function getData() {
    return fetch(address)
        .then(res => res.json())
        .then(calcPortfolio)
        .catch((error) => {
            // loggers.coreLogs(`index->There has been a problem with your fetch operation: ${error.message}`);
            console.log(`index->There has been a problem with your fetch operation: ${error.message}`);
        });
};
