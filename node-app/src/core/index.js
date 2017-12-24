const fetch = require('node-fetch');
const loggers = require('loggers');
const { calcPortfolio } = require('core/calc');
const constants = require('constants/core.constants');

const address = `${constants.API}/?limit=${constants.LIMIT}`;

loggers.core(`index->fetching data from ${address}`);

module.exports = function getData() {
    return fetch(address)
        .then(res => res.json())
        .then(calcPortfolio)
        .catch((error) => {
            // loggers.core(`index->There has been a problem with your fetch operation: ${error.message}`);
            loggers.core(`index->There has been a problem with your fetch operation: ${error.message}`);
        });
};
