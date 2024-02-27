import { scrape, getCountriesController, insertMarketDataController } from './src/controllers/webscrapperController.js';
import { areas } from './src/assets/staticData.js';
import { writeLog } from './src/utils/log-generator.js'
import ProgressBar from 'progress';
import colors from 'colors';

const now = new Date(); 
const formattedNow = now.toISOString().split('T')[0]; // Format to YYYY-MM-DD

console.log("*** WEBSCRAPP NORD POOL WEB ***".blue)

const processArea = async (area) => {
    const countriesList = await getCountriesController(area.ID);
    const bar = new ProgressBar(':bar :percent :eta'.green, { total: countriesList.length });
    
    for (const country of countriesList) {
        const result = await scrape(country.CountryCode, formattedNow);
        await insertMarketDataController(result);
        result.forEach(logLine => {
            writeLog(JSON.stringify(logLine), formattedNow);
        });
        bar.tick(); // refresh progress bar
    }
};

(async () => {
    for (const area of areas) {
        await processArea(area);
    }
})();
