import { scrape, getCountriesController,insertMarketDataController } from './src/controllers/webscrapperController.js';
import { writeLog } from './src/utils/log-generator.js'
import ProgressBar from 'progress';
import colors from 'colors'

const areas= getCountriesController()

const now = new Date(); 
const formattedNow = now.toISOString().split('T')[0]; // Format to YYYY-MM-DD

areas.then(areasList => {
    const bar = new ProgressBar(':bar :percent :eta'.green, { total: areasList.length });
    console.log("*** WEBSCRAPP NORD POOL WEB ***".blue)

    areasList.map(area => {
        scrape(area.CountryCode, formattedNow).then(result => {
            insertMarketDataController(result)
            result.map(logLine => {
                writeLog(JSON.stringify(logLine),formattedNow)
            })
            bar.tick(); // refresh progress bar
        })
    })
})