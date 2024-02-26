import { v4 as uuidv4 } from 'uuid'

replaceCommaWithDot(inputString) {
    return inputString.replace(/,/g, '.');
  }
  
const getCountriesQuery = () => `SELECT * FROM nord_pool_market_scrapp.countries;`

const setMarketDataQuery = (params) => {

    const uuid = uuidv4()

    const countryID = params.countryID ? params.countryID : 1
    const mediumPrice = params.MediumPrice ? params.MediumPrice : 0
    const maxPrice = params.MaxPrice ? params.MaxPrice : 0
    const minPrice = params.MinPrice ? params.MinPrice : 0
    const volumMW = params.VolumMW ? params.VolumMW : 0
    const close = params.Close ? params.Close : 0
    const open = params.Open ? params.Open : 0
    const market = params.Market ? params.Market : ''
    const now = params.now ? params.now : ''
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