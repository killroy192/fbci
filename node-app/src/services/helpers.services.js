const codes = require('constants/code.constants');

function stringifyMongoError(e) {
    switch (true) {
    case e.code === 11000:
        return {
            name: codes.ERROR_TYPE,
            code: codes.USER_ALREADY_EXIST.code,
            massages: [codes.USER_ALREADY_EXIST.str],
        };
    default:
        return {
            name: codes.ERROR_TYPE,
            code: codes.UNKNOWN_ERROR.code,
            massages: [codes.UNKNOWN_ERROR.str],
        };
    }
}

function stringifyValidationError(e) {
    return Object.keys(e.errors).map((key) => {
        return e.errors[key].message || codes.VALIDATION_ERROR.str;
    });
}


function customizeErrors(e) {
    switch (true) {
    case (e.name === 'ValidationError'):
        return {
            name: codes.ERROR_TYPE,
            code: codes.VALIDATION_ERROR.code,
            massages: stringifyValidationError(e),
        };
    case (e.name === 'MongoError'):
        return stringifyMongoError(e);
    case (e.name === 'CustomError'):
        return {
            name: codes.ERROR_TYPE,
            code: e.code,
            massages: [e.str],
        };
    default:
        return {
            name: codes.ERROR_TYPE,
            code: codes.UNKNOWN_ERROR.code,
            massages: [codes.UNKNOWN_ERROR.str],
        };
    }
}

module.exports = {
    customizeErrors,
};

