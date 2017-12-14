const marksData = require('../input/EM.json');

const loggers = require('../loggers');
const { mixin, partOf, multiplication } = require('./helpers');

const {
    API_ITEM_KEYS,
    INPUT_KEYS,
    ABSOLUTE_MARK,
    RELATIVE_MARK,
    TO_INVEST,
    BASE_INVESTMENT,
    EXPONENTS,
    } = require('./constants');

const multiplicationMarketCap = multiplication(API_ITEM_KEYS.MARKET_CAP_USD);
const multiplicationVolume = multiplication(API_ITEM_KEYS.VOLUME_USD_24);
const multiplicationTechMarks = multiplication(INPUT_KEYS.MARK_TECH);
const multiplicationCPMarks = multiplication(INPUT_KEYS.MARK_PC);
const multiplicationMarks = multiplication(ABSOLUTE_MARK);

function calcAbsoluteCryptoMarks(apiData, mixedData) {
    const currentFullMarketCap = apiData.reduce(multiplicationMarketCap, 0);
    const currentFullVolume = apiData.reduce(multiplicationVolume, 0);
    const currentFullTechMarks = marksData.reduce(multiplicationTechMarks, 0);
    const currentFullCPMarks = marksData.reduce(multiplicationCPMarks, 0);

    return mixedData.map((crypto) => {
        const specificWeight = partOf(currentFullMarketCap, crypto[API_ITEM_KEYS.MARKET_CAP_USD]);
        const specificVolume = partOf(currentFullVolume, crypto[API_ITEM_KEYS.VOLUME_USD_24]);
        const specificTechMark = partOf(currentFullTechMarks, crypto[INPUT_KEYS.MARK_TECH]);
        const specificCPMark = partOf(currentFullCPMarks, crypto[INPUT_KEYS.MARK_PC]);

        const absoluteMark = specificWeight + specificVolume + specificTechMark + specificCPMark;

        return {
            symbol: crypto[INPUT_KEYS.SYMBOL],
            absoluteMark,
        };
    });
}

function calcRelations(data) {
    // mix data
    const symbolEq = (item, itemToMix) => {
        return item[API_ITEM_KEYS.SYMBOL] === itemToMix[INPUT_KEYS.SYMBOL];
    };
    const mixedData = mixin(data, [symbolEq], marksData);

    // calculate
    const cryptosWithAbsoluteMarks = calcAbsoluteCryptoMarks(data, mixedData);

    const currentFullMarks = cryptosWithAbsoluteMarks.reduce(multiplicationMarks, 0);

    return cryptosWithAbsoluteMarks
        .map((crypto) => {
            return {
                symbol: crypto[INPUT_KEYS.SYMBOL],
                [RELATIVE_MARK]: partOf(currentFullMarks, crypto[ABSOLUTE_MARK]),
            };
        })
        .sort((firstCrypto, secondCrypto) => {
            return secondCrypto[RELATIVE_MARK] - firstCrypto[RELATIVE_MARK];
        });
}

function calcPortfolio(data) {
    const cryptoMarks = calcRelations(data);
    return cryptoMarks.map((crypto) => {
        return Object.assign(crypto, {
            [TO_INVEST]: BASE_INVESTMENT * crypto[RELATIVE_MARK],
        });
    });
}

module.exports = {
    calcPortfolio,
};
