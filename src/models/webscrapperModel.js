import { getCountriesQuery, setMarketDataQuery } from "../repositories/webscrapperRepository.js"
import mysql from "../adapters/mysql.js"
import moment from "moment"

const getCountriesModel = (conn) => {
	return mysql
		.execute(getCountriesQuery(), conn)
        .then(Result => Result.map(({id, ...resultFiltered }) => resultFiltered))
}


const insertMarketDataModel = ( conn, params ) => {
	
	const now = moment.utc().format('YYYY-MM-DD HH:mm:ss')
	const area = params[0].area

	params.map(data => {
		if(data.info){ mysql.execute(setMarketDataQuery(data.info), conn, data.info )	}
	})	
}

export { getCountriesModel, insertMarketDataModel }