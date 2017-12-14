const globalLogs = require('debug')('c::globalLogs');
const appLogs = require('debug')('c::appLogs');
const routerLogs = require('debug')('c::routerLogs');
const coreLogs = require('debug')('c::coreLogs');

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
