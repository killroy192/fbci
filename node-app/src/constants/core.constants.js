module.exports = {
    LIMIT: 1000,
    API: 'https://api.coinmarketcap.com/v1/ticker',
    EXPONENTS: 2,
    BASE_INVESTMENT: 550,
    API_ITEM_KEYS: {
        ID: 'id',
        NAME: 'name',
        SYMBOL: 'symbol',
        RANK: 'rank',
        PRICE_USD: 'price_usd',
        PRICE_BTC: 'price_btc',
        VOLUME_USD_24: '24h_volume_usd',
        MARKET_CAP_USD: 'market_cap_usd',
        AVAILABLE_SUPPLY: 'available_supply',
        TOTAL_SUPPLY: 'total_supply',
        MAX_SUPPLY: 'max_supply',
        PERCENT_CHANGE_1H: 'percent_change_1h',
        PERCENT_CHANGE_24H: 'percent_change_24h',
        PERCENT_CHANGE_7H: 'percent_change_7d',
        LAST_UPDATED: 'last_updated',
    },
    INPUT_KEYS: {
        ID: 'id',
        SYMBOL: 'symbol',
        MARK_TECH: 'markTech',
        MARK_PC: 'markPC',
        INDEX: 'index',
    },
    ABSOLUTE_MARK: 'absoluteMark',
    RELATIVE_MARK: 'relativeMark',
    TO_INVEST_USD: 'to_invest_usd',
    TO_INVEST_BTC: 'to_invest_btc',
    SUM_TO_INVEST_USD: 'sum_to_invest_usd',
    SUM_TO_INVEST_BTC: 'sum_to_invest_btc',
    BTC: 'BTC',
    MINIMAL_BYE_IN_BTC: 0.001,
    FLOATING_BTC: 6,
    FLOATING_USD: 2,
};
