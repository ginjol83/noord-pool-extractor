import { v4 as uuidv4 } from 'uuid'

const replaceCommaWithDot = (inputString) => {
    return inputString.replace(/,/g, '.');
}

const removeSpaces = (str) => {
    return str.replace(/\s/g, '');
}

const getCountriesQuery = (id) => `SELECT * FROM nord_pool_market_scrapp.countries where AreaID=${id};`

const setMarketIntraDayDataQuery = (params) => {
    const uuid = uuidv4()
    const countryID = params.countryID ? params.countryID : 1
    const mediumPrice = params.MediumPrice ? removeSpaces(replaceCommaWithDot(params.MediumPrice)) : 0
    const maxPrice = params.MaxPrice ? removeSpaces(replaceCommaWithDot(params.MaxPrice)) : 0
    const minPrice = params.MinPrice ? removeSpaces(replaceCommaWithDot(params.MinPrice)) : 0
    const volumMW = params.VolumMW ? removeSpaces(replaceCommaWithDot(params.VolumMW)) : 0
    const close = params.Close ? removeSpaces(replaceCommaWithDot(params.Close)) : 0
    const open = params.Open ? removeSpaces(replaceCommaWithDot(params.Open)) : 0
    const market = params.Market ? params.Market : ''
    const period = params.Period ? params.Period : ''

    return `INSERT INTO nord_pool_market_scrapp.MarketIntraDayData (
        DataUUID,
        CountryID,
        Period,
        Market,
        MaxPrice,
        MinPrice,
        MediumPrice,
        Open,
        Close,
        VolumeMW
    ) VALUES (
        '${uuid}',
        ${countryID},
        '${period}',
        '${market}',
        ${maxPrice},
        ${minPrice},
        ${mediumPrice},
        ${open},
        ${close},
        ${volumMW}
        );`
}

const setMarketDayAheadPricesQuery = (params) => {
    const uuid = uuidv4()
    const countryID = params.countryID ? params.countryID : 1
    const Price = params.Price ? removeSpaces(replaceCommaWithDot(params.Price)) : 0
    const period = params.Period ? params.Period : ''

    return `INSERT INTO nord_pool_market_scrapp.MarketDayAheadPrices (
        DataUUID,
        CountryID,
        Period,
        Price
    ) VALUES (
        '${uuid}',
        ${countryID},
        '${period}',
        ${Price}
        );`
}

const setMarketDayAheadVolumesQuery = (params) => {
    const uuid = uuidv4()
    const countryID = params.countryID ? params.countryID : 1
    const period = params.Period ? params.Period : ''

    const SellVolume = params.SellVolume ? removeSpaces(replaceCommaWithDot(params.SellVolume)) : 0
    const BuyVolume = params.BuyVolume ? removeSpaces(replaceCommaWithDot(params.BuyVolume)) : 0

    return `INSERT INTO nord_pool_market_scrapp.MarketDayAheadVolumes (
        DataUUID,
        CountryID,
        Period,
        SellVolume,
        BuyVolume
    ) VALUES (
        '${uuid}',
        ${countryID},
        '${period}',
        ${SellVolume},
        ${BuyVolume}
        );`
}

const setMarketDayAheadSystemPriceTurnoverQuery = (params) => {
    const uuid = uuidv4()
    const period = params.Period ? params.Period : ''

    const SystemPrice = params.SystemPrice ? removeSpaces(replaceCommaWithDot(params.SystemPrice)) : 0
    const SystemTurnover = params.SystemTurnover ? removeSpaces(replaceCommaWithDot(params.SystemTurnover)) : 0

    return `INSERT INTO nord_pool_market_scrapp.MarketDayAheadSystemPriceTurnover (
        DataUUID,
        Period,
        SystemPrice,
        SystemTurnover
    ) VALUES (
        '${uuid}',
        '${period}',
        ${SystemPrice},
        ${SystemTurnover}
        );`
}



export { getCountriesQuery, setMarketIntraDayDataQuery, setMarketDayAheadPricesQuery, setMarketDayAheadSystemPriceTurnoverQuery, setMarketDayAheadVolumesQuery }