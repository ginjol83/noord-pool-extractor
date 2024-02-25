import puppeteer from 'puppeteer';
import cheerio from 'cheerio';

//Delay function
const delay = (time) => new Promise(resolve => setTimeout(resolve, time));

//URL nordpoolgroup 
const url = 'https://data.nordpoolgroup.com/intraday?deliveryDate=2024-02-23&deliveryArea=DK1';

//Webscrapping function
async function scrape() {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Delay force
    await delay(3000);

    console.log("Go to nordpool data url"); //TODO Send to log file

    // Extract HTML
    const bodyHTML = await page.evaluate(() => {
        return document.body.innerHTML;
    });

    //  Delay force
    await delay(3000);

    // Close
    await browser.close();
    console.log("Close nav");//TODO Send to log file


    // Load HTML file in cheerie object
    const $ = cheerio.load(bodyHTML);


    // Crear un array para almacenar los objetos JSON de cada fila
    const data = [];

    // TODO Refactor with map function
    $('tr').slice(4).each((i, elem) => {
        // Extract row value
        const row = $(elem).find('td').map((i, el) => $(el).text()).get();

        const record = {
            Period: row[0],
            Market: row[1],
            MaxValue: row[3],
            MinValue: row[4],
            MediumValue: row[5],
            Open: row[6],
            Close: row[7],
            VolumMW: row[8],
        };

        data.push(record);
    });

    console.log(tableJson);
    //TODO Send result to log file 
}

scrape();