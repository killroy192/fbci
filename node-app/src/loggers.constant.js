const globalLogs = require('debug')('globalLogs');
const appLogs = require('debug')('appLogs');
const routerLogs = require('debug')('routerLogs');
const coreLogs = require('debug')('coreLogs');

const lavel = process.env.LOGGLEVEL || 4;

let Logger;

const empty = () => {

};

switch (lavel) {
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
