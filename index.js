import { 
    scrapeIntraDay, 
    scrapeDayAheadPrices, 
    scrapeDayAheadVolumes,
    scrapeDayAheadSystemPriceTurnover,
    getCountriesController, 
    insertMarketIntraDayDataController, 
    insertMarketDayAheadPricesController, 
    insertMarketDayAheadVolumesController, 
    insertMarketDayAheadSystemPriceTurnoverController,  
        } from './src/controllers/webscrapperController.js';
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
        const resultIntraDay = await scrapeIntraDay(country.CountryCode, formattedNow);
        await insertMarketIntraDayDataController(resultIntraDay);
        resultIntraDay.forEach(logLine => {
            writeLog(JSON.stringify(logLine), formattedNow);
        });
        
        const resultDayAheadPrice = await scrapeDayAheadPrices(country.CountryCode, formattedNow);
        await insertMarketDayAheadPricesController(resultDayAheadPrice);
        resultDayAheadPrice.forEach(logLine => {
            writeLog(JSON.stringify(logLine), formattedNow);
        });

        const resultDayAheadVolumes = await scrapeDayAheadVolumes(country.CountryCode, formattedNow);
        await insertMarketDayAheadVolumesController(resultDayAheadVolumes);
        resultDayAheadVolumes.forEach(logLine => {
            writeLog(JSON.stringify(logLine), formattedNow);
        });
     
        bar.tick(); // refresh progress bar
    }

    const resultDayAheadSystemPriceTurnover = await scrapeDayAheadSystemPriceTurnover(formattedNow);
    await insertMarketDayAheadSystemPriceTurnoverController(resultDayAheadSystemPriceTurnover);
    resultDayAheadSystemPriceTurnover.forEach(logLine => {
        writeLog(JSON.stringify(logLine), formattedNow);
    });
};

(async () => {
    for (const area of areas) {
        await processArea(area);
    }
})();
