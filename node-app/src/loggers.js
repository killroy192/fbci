const { empty } = require('helpers');
const global = require('debug')('www::');
const app = require('debug')('app::');
const router = require('debug')('routers::');
const core = require('debug')('core::');
const mongo = require('debug')('mongo::');

const level = process.env.LOGGLEVEL || 4;

let Logger;

switch (Number(level)) {
case 1:
    Logger = {
        global,
        app: empty,
        router: empty,
        core: empty,
        mongo: empty,
    };
    break;
case 2:
    Logger = {
        global,
        app,
        router: empty,
        core: empty,
        mongo,
    };
    break;
case 3:
    Logger = {
        global,
        app,
        router,
        core: empty,
        mongo,
    };
    break;

default:
    Logger = {
        global,
        app,
        router,
        core,
        mongo,
    };
    break;
}

module.exports = Logger;
