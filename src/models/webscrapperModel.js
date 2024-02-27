import { getCountriesQuery, setMarketDataQuery } from "../repositories/webscrapperRepository.js"
import { countries } from '../assets/staticData.js'
import mysql from "../adapters/mysql.js"

const findCountryIDByCode = (countryCode) => {
    const country = countries.find(country => country.CountryCode === countryCode);
    return country ? country.ID : null;
}

const getCountriesModel = (conn, id) => {
	return mysql
		.execute(getCountriesQuery(id), conn)
        .then(Result => Result.map(({id, ...resultFiltered }) => resultFiltered))
}

const insertMarketDataModel = ( conn, params ) => {
	params.map(data => {
		if(data.info && data.info.MinPrice){ 
			data.info.countryID = findCountryIDByCode(data.info.area)
			mysql.execute(setMarketDataQuery(data.info), conn, data.info )	
		}
	})	
}

export { getCountriesModel, insertMarketDataModel }