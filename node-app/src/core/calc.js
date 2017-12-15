const marksData = require('../input/EM.json');

const loggers = require('../loggers');
const {
    mixin,
    partOf,
    multiplication,
    formatUSDPrice,
    formatBTCPrice,
    } = require('./helpers');

const {
    API_ITEM_KEYS,
    INPUT_KEYS,
    ABSOLUTE_MARK,
    RELATIVE_MARK,
    TO_INVEST_USD,
    TO_INVEST_BTC,
    SUM_TO_INVEST_USD,
    SUM_TO_INVEST_BTC,
    BASE_INVESTMENT,
    BTC,
    MINIMAL_BYE_IN_BTC,
    } = require('./constants');

const multiplicationMarketCap = multiplication(API_ITEM_KEYS.MARKET_CAP_USD);
const multiplicationVolume = multiplication(API_ITEM_KEYS.VOLUME_USD_24);
const multiplicationTechMarks = multiplication(INPUT_KEYS.MARK_TECH);
const multiplicationCPMarks = multiplication(INPUT_KEYS.MARK_PC);
const multiplicationMarks = multiplication(ABSOLUTE_MARK);
const multiplicationPricesToInvestBTC = multiplication(TO_INVEST_BTC);
const multiplicationPricesToInvestUSD = multiplication(TO_INVEST_USD);

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

function getValueToInvest(cryptoMarks, data) {
    let currentBtcPrice;
    for (let index = 0; index < data.length; index += 1) {
        const crypto = data[index];
        if (crypto[API_ITEM_KEYS.SYMBOL] === BTC) {
            currentBtcPrice = crypto[API_ITEM_KEYS.PRICE_USD];
            break;
        }
    }

    let investmentCap = BASE_INVESTMENT / currentBtcPrice;
    return cryptoMarks.map((crypto) => {
        let potencialCapToInvest = formatBTCPrice((BASE_INVESTMENT * crypto[RELATIVE_MARK]) / currentBtcPrice);
        if (potencialCapToInvest < MINIMAL_BYE_IN_BTC) {
            potencialCapToInvest = MINIMAL_BYE_IN_BTC;
        }
        if (investmentCap > 0) {
            investmentCap -= potencialCapToInvest;
            return Object.assign(crypto, {
                [TO_INVEST_BTC]: potencialCapToInvest,
                [TO_INVEST_USD]: formatUSDPrice(potencialCapToInvest * currentBtcPrice),
            });
        }
        return Object.assign(crypto, {
            [TO_INVEST_USD]: 0,
            [TO_INVEST_BTC]: 0,
        });
    });
}

function recapResults(prifileData) {
    const prifileFullData = prifileData.slice()
    prifileFullData.push({
        [SUM_TO_INVEST_USD]: prifileData.reduce(multiplicationPricesToInvestUSD, 0),
        [SUM_TO_INVEST_BTC]: prifileData.reduce(multiplicationPricesToInvestBTC, 0),
    });
    return prifileFullData;
}

function calcPortfolio(data) {
    const cryptoMarks = calcRelations(data);
    return recapResults(getValueToInvest(cryptoMarks, data));
}

module.exports = {
    calcPortfolio,
};
