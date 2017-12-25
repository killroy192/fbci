const { empty } = require('helpers');
const { dbg_colors } = require('constants/global.constants');
const appLog = require('debug')('app:: log::');
const appWarn = require('debug')('app:: warn::');
const appError = require('debug')('app:: error::');

appLog.color = dbg_colors.LOG;
appWarn.color = dbg_colors.WARN;
appError.color = dbg_colors.ERROR;

const makeLogger = logger => (moduleName, message) => {
    const logMsg = moduleName ? `${moduleName} -> ${message}` : message;
    return logger(logMsg);
};

const log = makeLogger(appLog);
const warn = makeLogger(appWarn);
const error = makeLogger(appError);

const level = process.env.LOG_LEVEL || 3;

let Logger;

switch (Number(level)) {
case 1:
    Logger = {
        error,
        warn: empty,
        log: empty,
    };
    break;
case 2:
    Logger = {
        error,
        warn,
        log: empty,
    };
    break;

default:
    Logger = {
        error,
        warn,
        log,
    };
    break;
}

module.exports = Logger;
