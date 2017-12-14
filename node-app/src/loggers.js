const { empty } = require('./helpers');
const globalLogs = require('debug')('www::');
const appLogs = require('debug')('app::');
const routerLogs = require('debug')('routers::');
const coreLogs = require('debug')('core::');

const level = process.env.LOGGLEVEL || 4;

let Logger;

switch (Number(level)) {
case 1:
    Logger = {
        globalLogs,
        appLogs: empty,
        routerLogs: empty,
        coreLogs: empty,
    };
    break;
case 2:
    Logger = {
        globalLogs,
        appLogs,
        routerLogs: empty,
        coreLogs: empty,
    };
    break;
case 3:
    Logger = {
        globalLogs,
        appLogs,
        routerLogs,
        coreLogs: empty,
    };
    break;

default:
    Logger = {
        globalLogs,
        appLogs,
        routerLogs,
        coreLogs,
    };
    break;
}

module.exports = Logger;
