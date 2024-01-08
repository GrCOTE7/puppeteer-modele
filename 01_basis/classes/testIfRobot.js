import puppeteer from "puppeteer";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export function testIfRobot(filename) {
 const test = () => {
  const filePath = path.resolve(fileURLToPath(import.meta.url), '../../imgs/' + filename + '.png');
  console.log(filePath);
  // fs.writeFile(filePath, data, (err) => {
  //  if (err) throw err;
  //  console.log('Le fichier ' + filename + '.json a été créé avec succès!');
  // });

  (async () => {
   const browser = await puppeteer.launch({
    // headless: false,
    // slowMo: 200,
    defaultViewport: false,
    // userDataDir: './tmp',
    // devtools: true
   });
   console.log('Running test...');
   const page = await browser.newPage();
   await page.goto('https://bot.sannysoft.com', { waitUntil: 'networkidle2' });
   await new Promise(r => setTimeout(r, 5000));
   await page.screenshot({ path: filePath, fullpage: true });

   console.log('Oki.')
   await browser.close();
  })()

 }
 test();
}