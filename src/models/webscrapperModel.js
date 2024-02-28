import { getCountriesQuery, setMarketIntraDayDataQuery, setMarketDayAheadPricesQuery, setMarketDayAheadSystemPriceTurnoverQuery, setMarketDayAheadVolumesQuery } from "../repositories/webscrapperRepository.js"
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

const insertMarketIntraDayDataModel = ( conn, params ) => { 
	params.map(data => { 
		if(data.info && data.info.MinPrice){ 
			data.info.countryID = findCountryIDByCode(data.info.area) 
			mysql.execute(setMarketIntraDayDataQuery(data.info), conn, data.info )  
		} 
	}) 
} 

const insertMarketDayAheadPricesModel = ( conn, params ) => {
	params.map(data => {
		if(	data.info && data.info.Price && 
			data.info.Price.replace(/\s+/g, '') != '' &&
			data.info.Period.replace(/\s+/g, '') != 'Min:Max:Average:'){ 

			data.info.countryID = findCountryIDByCode(data.info.area)
			mysql.execute(setMarketDayAheadPricesQuery(data.info), conn, data.info )	
		}
	})	
}

const insertMarketDayAheadSystemPriceTurnoverModel = ( conn, params ) => {
	params.map(data => {
		if(	data.info && 
			data.info.SystemPrice && data.info.SystemPrice.replace(/\s+/g, '') != '' && 
			data.info.SystemTurnover && data.info.SystemTurnover.replace(/\s+/g, '') != '' &&
			data.info.Period != 'Min:Max:Average:Total (MWh):'){ 

			mysql.execute(setMarketDayAheadSystemPriceTurnoverQuery(data.info), conn, data.info )	
		}
	})	
}

const insertMarketDayAheadVolumesModel = ( conn, params ) => {
	params.map(data => {
		if(		data.info && 
				data.info.SellVolume && data.info.SellVolume.replace(/\s+/g, '') != '' && 
				data.info.BuyVolume && data.info.BuyVolume.replace(/\s+/g, '') != '' &&
				data.info.Period != 'Min:Max:Average:Total (MWh):'){ 

			data.info.countryID = findCountryIDByCode(data.info.area)
			mysql.execute(setMarketDayAheadVolumesQuery(data.info), conn, data.info )	
		}
	})	
}

export { getCountriesModel, insertMarketIntraDayDataModel, insertMarketDayAheadPricesModel, insertMarketDayAheadVolumesModel, insertMarketDayAheadSystemPriceTurnoverModel }