import { v4 as uuidv4 } from 'uuid'

const replaceCommaWithDot = (inputString) => {
    return inputString.replace(/,/g, '.');
}

const removeSpaces = (str) => {
    return str.replace(/\s/g, '');
}

const getCountriesQuery = (id) => `SELECT * FROM nord_pool_market_scrapp.countries where AreaID=${id};`

const setMarketDataQuery = (params) => {
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

    return `INSERT INTO nord_pool_market_scrapp.marketdata (
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


export { getCountriesQuery, setMarketDataQuery }