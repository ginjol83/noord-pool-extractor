import { scrape } from './src/webscrapper.js';


const areas = ['EE','LT','LV','UK','FR','AT','BE','NL','PL']

const now = new Date(); 
const formattedNow = now.toISOString().split('T')[0]; // Format to YYYY-MM-DD

areas.map(area => {
    scrape(area, formattedNow).then(result => {
        console.log (result)
    })
})

