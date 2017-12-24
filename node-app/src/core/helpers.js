const loggers = require('loggers');
const { FLOATING_BTC, FLOATING_USD } = require('constants/core.constants');

function simpleMixin(target, toMix, conditions) {
    return target
    .map((item) => {
        const result = toMix.find((itemToMix) => {
            return conditions.every((condition) => {
                return condition(item, itemToMix);
            });
        });

        return result ? Object.assign(item, result) : null;
    })
    .filter(item => !!item);
}

function mixin(target, conditions, ...args) {
    return args.reduce((acc, toMix) => {
        return simpleMixin(acc, toMix, conditions);
    }, target);
}

function partOf(sum, value) {
    return Number(value) / Number(sum) || 0;
}

function multiplication(propName) {
    return function accumulator(acc, value) {
        return acc += Number(value[propName]) || 0;
    };
}

function formatFloat(digits) {
    return function (num) {
        if (!isNaN(num) && (/\./).test(String(num))) {
            const powered = Math.pow(10, digits);
            const tmp = Math.round(num * powered);

            return tmp / powered;
        }
        return num;
    };
}

const formatUSDPrice = formatFloat(FLOATING_USD);
const formatBTCPrice = formatFloat(FLOATING_BTC);

module.exports = {
    mixin,
    partOf,
    multiplication,
    formatFloat,
    formatUSDPrice,
    formatBTCPrice,
};

