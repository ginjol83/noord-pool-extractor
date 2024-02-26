import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import { getCountriesModel, insertMarketDataModel } from "../models/webscrapperModel.js"
import mysql from "../adapters/mysql.js"
import config from '../config/development.js'


const conn = mysql.start(config)

const getCountriesController = () => getCountriesModel(conn).then(result => result)

const insertMarketController = (params) => insertMarketDataModel(conn, params).then(result => result)

//Delay function
const delay = (time) => new Promise(resolve => setTimeout(resolve, time));

//Webscrapping function
async function scrape(area,formattedNow) {

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

    const data = [{area: area}];

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
            };
    
            data.push({info:record});
        }
    });
    return data;
}

export { scrape, getCountriesController, insertMarketController }