const { empty } = require('helpers');
const { dbg_colors } = require('constants/global.constants');
const log = require('debug')('app:: log::');
const warn = require('debug')('app:: warn::');
const error = require('debug')('app:: error::');

log.color = dbg_colors.LOG;
warn.color = dbg_colors.WARN;
error.color = dbg_colors.ERROR;

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
