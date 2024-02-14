const boxrec = require("boxrec").Boxrec;
const fastcsv = require('fast-csv');
const fs = require('fs');
const axios = require('axios');

async function downloadAndLogCSV(url) {
    try {
        const response = await axios.get(url);
        const csvData = response.data;

        fastcsv
            .parseString(csvData, { headers: true })
            .on('data', (data) => {
                console.log(data);
            })
            .on('end', () => {
                console.log('Finished reading the CSV data');
            });
    } catch (error) {
        console.error('Error downloading or parsing CSV:', error);
    }
}

const csvDownloadUrl = 'https://raw.githubusercontent.com/EmmS21/SpringboardCapstoneBoxingPredictionWebApp/master/boxingdata/readdata.csv';
downloadAndLogCSV(csvDownloadUrl);


// async function getCookieJar(){
//     try {
//         const cookieJar = await boxrec.login('***','***');
//         return cookieJar;
//     } catch (e) {
//         console.log("Login error: " + e);
//     }
// };
// async function writeData() {
//     const csv = require('csv-parser')
//     const results = [];
//     fs.createReadStream('C:\\Users\\User\\Documents\\GitHub\\Springboard Capstone BoxingPredictionWebApp\\boxingdata\\readdata.csv')
//         .pipe(csv())
//         .on('data',(data)=> results.push(data))
//         .on('end', async () => {
//           const cookieJar = await getCookieJar();
//           const promises = [];
//           results.forEach((data) => {
//             promises.push(boxrec.getPersonById(cookieJar,data.id));
//           })
//           const fighters = await Promise.all(promises); 
//           fighters.forEach((fighter) => {
//               let data = '';
//               for (const key in fighter.output) {
//                   if (Array.isArray(fighter.output[key])) {
//                       data += JSON.stringify(fighter.output[key]) + ',';
//                   } else if (typeof fighter.output[key] === 'object') {
//                       data += JSON.stringify(fighter.output[key]) + ',';
//                   } else {
//                       data += fighter.output[key] + ',';
//                   }
//               }
//               data = data.replace(/(^,)|(,$)/g, "");
//               data += '\n';
              
//               fs.appendFile('C:\\Users\\User\\Documents\\datatest.csv',data, (err) => {
//                   if (err) throw err;
//               });
//           });
//         });
//     };
// try {
//     writeData();
// } catch (error) {
//     console.log("Error in writeData: " + error);
// }