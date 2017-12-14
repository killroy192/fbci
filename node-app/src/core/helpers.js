const loggers = require('../loggers');

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

module.exports = {
    mixin,
    partOf,
    multiplication,
};

