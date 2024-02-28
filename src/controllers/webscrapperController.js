import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import { getCountriesModel, 
         insertMarketIntraDayDataModel, 
         insertMarketDayAheadPricesModel, 
         insertMarketDayAheadVolumesModel, 
         insertMarketDayAheadSystemPriceTurnoverModel } from "../models/webscrapperModel.js"
import mysql from "../adapters/mysql.js"
import config from '../config/development.js'


const conn = mysql.start(config)

const getCountriesController = (id) => getCountriesModel(conn, id).then(result => result)

const insertMarketIntraDayDataController = (params) => insertMarketIntraDayDataModel(conn, params)

const insertMarketDayAheadPricesController = (params) => insertMarketDayAheadPricesModel(conn, params)

const insertMarketDayAheadVolumesController = (params) => insertMarketDayAheadVolumesModel(conn, params)

const insertMarketDayAheadSystemPriceTurnoverController = (params) => insertMarketDayAheadSystemPriceTurnoverModel(conn, params)

//Delay function
const delay = (time) => new Promise(resolve => setTimeout(resolve, time));

//Webscrapping function
async function scrapeIntraDay(area,formattedNow) {

    //URL nordpoolgroup 
    const url = `https://data.nordpoolgroup.com/intraday?deliveryDate=${formattedNow}&deliveryArea=${area}`; //TODO to config file

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Delay force
    await delay(3000);

    // Extract HTML
    const bodyHTML = await page.evaluate(() => {
        return document.body.innerHTML;
    });

    //  Delay force
    await delay(3000);

    // Close
    await browser.close();

    // Load HTML file in cheerie object
    const $ = cheerio.load(bodyHTML);

    const data = []//[{area: area}];

    // TODO Refactor with map function
    $('tr').slice(4).each((i, elem) => {
        // Extract row value
        const row = $(elem).find('td').map((i, el) => $(el).text()).get();
        if(row[0]!=='' && row[1]!=='' ){
            const record = {
                Period: row[0],
                Market: row[1],
                MaxPrice: row[3],
                MinPrice: row[4],
                MediumPrice: row[5],
                Open: row[6],
                Close: row[7],
                VolumMW: row[8],
                area: area
            };
    
            data.push({info:record});
        }
    });
    return data;
}


//Webscrapping function
async function scrapeDayAheadPrices(area,formattedNow) {

    //URL nordpoolgroup 
    const url = `https://data.nordpoolgroup.com/auction/day-ahead/prices?deliveryDate=${formattedNow}&deliveryAreas=${area}&currency=EUR&aggregation=Hourly`
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Delay force
    await delay(3000);

    // Extract HTML
    const bodyHTML = await page.evaluate(() => {
        return document.body.innerHTML;
    });

    //  Delay force
    await delay(3000);

    // Close
    await browser.close();

    // Load HTML file in cheerie object
    const $ = cheerio.load(bodyHTML);

    const data = []//[{area: area}];

    // TODO Refactor with map function
    $('tbody[role="presentation"] > tr').slice(4).each((i, elem) => {
        // Extract row value
        const row = $(elem).find('td').map((i, el) => $(el).text()).get();
        if(row[0]!=='' && row[1]!=='' ){
            const record = {
                Period: row[0],
                Price: row[1],
                area: area
            };
    
            data.push({info:record});
        }
    });
    return data;
}

//Webscrapping function
async function scrapeDayAheadVolumes(area,formattedNow) {

    //URL nordpoolgroup 
    const url = `https://data.nordpoolgroup.com/auction/day-ahead/volumes?deliveryDate=${formattedNow}&deliveryArea=${area}`

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Delay force
    await delay(3000);

    // Extract HTML
    const bodyHTML = await page.evaluate(() => {
        return document.body.innerHTML;
    });

    //  Delay force
    await delay(3000);

    // Close
    await browser.close();

    // Load HTML file in cheerie object
    const $ = cheerio.load(bodyHTML);

    const data = []

    // TODO Refactor with map function
    $('tbody[role="presentation"] > tr').slice(4).each((i, elem) => {
        // Extract row value
        const row = $(elem).find('td').map((i, el) => $(el).text()).get();
        if(row[0]!=='' && row[1]!=='' ){
            const record = {
                Period: row[0],
                BuyVolume: row[1],
                SellVolume: row[2],
                area: area
            };
    
            data.push({info:record});
        }
    });
    return data;
}

//Webscrapping function
async function scrapeDayAheadSystemPriceTurnover(area,formattedNow) {

    //URL nordpoolgroup 
    const url = `https://data.nordpoolgroup.com/auction/day-ahead/system?deliveryDate=${formattedNow}&currency=EUR`

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Delay force
    await delay(3000);

    // Extract HTML
    const bodyHTML = await page.evaluate(() => {
        return document.body.innerHTML;
    });

    //  Delay force
    await delay(3000);

    // Close
    await browser.close();

    // Load HTML file in cheerie object
    const $ = cheerio.load(bodyHTML);

    const data = []

    // TODO Refactor with map function
    $('tbody[role="presentation"] > tr').slice(4).each((i, elem) => {
        // Extract row value
        const row = $(elem).find('td').map((i, el) => $(el).text()).get();
        if(row[0]!=='' && row[1]!=='' ){
            const record = {
                Period: row[0],
                SystemPrice: row[1],
                SystemTurnover: row[2],
            };
    
            data.push({info:record});
        }
    });
    return data;
}




export { 
    scrapeIntraDay, 
    scrapeDayAheadPrices, 
    scrapeDayAheadVolumes,
    scrapeDayAheadSystemPriceTurnover,
    getCountriesController, 
    insertMarketIntraDayDataController, 
    insertMarketDayAheadPricesController, 
    insertMarketDayAheadVolumesController, 
    insertMarketDayAheadSystemPriceTurnoverController,  
}