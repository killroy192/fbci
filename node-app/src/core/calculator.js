const marksData = require('../input/EM.json');

const parthOf = (sum, value) => value / sum;

const calculator = (data) => {
    // calc market cap
    const currentFullMarktCap = data.reduce((acc, crypto) => {
        return acc += Number(crypto.market_cap_usd) || 0;
    }, 0);
    // calc market volume
    const currentFullVolume = data.reduce((acc, crypto) => {
        return acc += Number(crypto['24h_volume_usd']) || 0;
    }, 0);
    // calc tech marks
    const currentFullThechMarks = marksData.reduce((acc, crypto) => {
        return acc += Number(crypto.markTech) || 0;
    }, 0);
    // calc community and public interest marks
    const currentFullCPMarks = marksData.reduce((acc, crypto) => {
        return acc += Number(crypto.markPC) || 0;
    }, 0);
    // mix data
    const interstData = data.map((crypto) => {
        const additionalDateOfCurrentCrypto = marksData.find((marksCrypto) => {
            return marksCrypto.symbol === crypto.symbol;
        });

        return additionalDateOfCurrentCrypto ?
            Object.assign(crypto, additionalDateOfCurrentCrypto) :
            null;
    }).filter(crypto => !!crypto);

    return interstData
        .map((crypto) => {
            const result = Object.assign(crypto, {
                specificWeight: parthOf(currentFullMarktCap, Number(crypto.price_usd)),
                specificVolume: parthOf(currentFullVolume, Number(crypto['24h_volume_usd'])),
                specificThechMark: parthOf(currentFullThechMarks, Number(crypto.markTech)),
                specificCPMark: parthOf(currentFullCPMarks, Number(crypto.markPC)),
            });

            return result;
        })
        .map((crypto) => {
            const mark = crypto.specificWeight + crypto.specificVolume + crypto.specificThechMark + crypto.specificCPMark;
            return {
                symbol: crypto.symbol,
                mark,
            };
        })
        .sort((firstCrypto, secondCrypto) => {
            return secondCrypto.mark - firstCrypto.mark;
        });
};

module.exports = {
    calculator,
};
