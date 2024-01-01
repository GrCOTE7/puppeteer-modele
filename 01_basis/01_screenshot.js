import puppeteer from "puppeteer";
// const puppeteer = require("puppeteer");

export function basis() {

 // const puppeteer = require("puppeteer");

 (async () => {
  const browser = await puppeteer.launch({
   headless: false,
   // slowMo: 200,
   defaultViewport: null
  });
  const page = await browser.newPage();
  await page.goto('https://www.example.com', { waitUntil: 'networkidle2' });
  // await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'example.png' });

  console.log('Oki.')
  await browser.close();
 })()
}