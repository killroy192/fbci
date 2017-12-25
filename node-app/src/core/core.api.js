const fetch = require('node-fetch');
const path = require('path');
const loggers = require('loggers');
const { calcPortfolio } = require('core/calc');
const constants = require('constants/core.constants');

const address = `${constants.API}/?limit=${constants.LIMIT}`;
const MODULE_NAME = path.basename(__filename);

loggers.log(MODULE_NAME, `fetching data from ${address}`);

module.exports = function getData() {
    return fetch(address)
        .then(res => res.json())
        .then(calcPortfolio)
        .catch((error) => {
            // loggers.core(`index->There has been a problem with your fetch operation: ${error.message}`);
            loggers.error(`index->There has been a problem with your fetch operation: ${error.message}`);
        });
};
