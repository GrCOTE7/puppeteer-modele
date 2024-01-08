import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export function testIfRobot(filename) {
 const test = () => {
  const filePath = path.resolve(fileURLToPath(import.meta.url), '../../imgs/' + filename + '.png');
  console.log(filePath);

  (async () => {

   puppeteer.use(StealthPlugin());

   const browser = await puppeteer.launch({
    headless: false,
    // slowMo: 200,
    // defaultViewport: false,
    // userDataDir: './tmp',
    // devtools: true
    executablePath:"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
   });
   console.log('Running test...');
   const page = await browser.newPage();
   await page.goto('https://bot.sannysoft.com', { waitUntil: 'networkidle2' });
   await new Promise(r => setTimeout(r, 5000));
   await page.screenshot({ path: filePath, fullPage: true });

   console.log('Screenshot done.')
   await browser.close();
  })()

 }
 test();
}