const getCountriesQuery = () => `SELECT * FROM nord_pool_market_scrapp.countries;`

const setMarketDataQuery = () => {
`INSERT INTO nord_pool_market_scrapp.marketdata (
    :DataUUID,
    :CountryID,
    :Period,
    :Market,
    :MaxP,
    :MinValue,
    :MediumValue,
    :Open,
    :Close,
    :VolumeMW
) VALUES (
    :DataUUID,
    :CountryID,
    :Period,
    :Market,
    :MaxP,
    :MinValue,
    :MediumValue,
    :Open,
    :Close,
    :VolumeMW
    );`
}


export { getCountriesQuery, setMarketDataQuery }