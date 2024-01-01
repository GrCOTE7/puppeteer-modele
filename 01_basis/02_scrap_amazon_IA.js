import puppeteer from "puppeteer";
// const puppeteer = require("puppeteer");

export function amazon() {

 // const puppeteer = require("puppeteer");

 (async () => {
  const browser = await puppeteer.launch({
   headless: false,
   // slowMo: 200,
   defaultViewport: false,
   userDataDir: ('./tmp'),
  });
  const page = await browser.newPage();
  await page.goto('https://www.amazon.com/s?k=amazon+basics&ref=nb_sb_noss_2', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  const products = await page.evaluate(() => {
   const productList = [];
   const productElements = document.querySelectorAll('.s-result-item');

   productElements.forEach((productElement) => {
    const titleElement = productElement.querySelector('h2 a');
    const priceElement = productElement.querySelector('.a-price .a-offscreen');

    if (titleElement && priceElement) {
     const title = titleElement.innerText.trim();
     const price = priceElement.innerText.trim();

     productList.push({ title, price });
    }
   });

   return productList;
  });

  console.log(products);

  console.log('Oki: ' + products.length + ' products')
  await browser.close();
 })()
}