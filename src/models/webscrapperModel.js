import { getCountriesQuery, setMarketDataQuery } from "../repositories/webscrapperRepository.js"
import mysql from "../adapters/mysql.js"
import moment from "moment"

const getCountriesModel = (conn) => {
	return mysql
		.execute(getCountriesQuery(), conn)
        .then(Result => Result.map(({id, ...resultFiltered }) => resultFiltered))
}


const insertMarketDataModel = ({ conn, ...params }) => {
	const uuid = uuidv4()
	const now = moment.utc().format('YYYY-MM-DD HH:mm:ss')

	/*const requiredFields = params.name && params.type && params.brand && params.model && params.registration_date && params.status
	
	if(!requiredFields) { 
		return Promise.resolve()
	}*/

	return mysql
			.execute(setMarketDataQuery({ ...params, uuid, now }), conn, { ...params, uuid, now })
			.then(queryResult => queryResult[1].map(({ ...resultFiltered }) => resultFiltered))
		
}


export { getCountriesModel, insertMarketDataModel }
