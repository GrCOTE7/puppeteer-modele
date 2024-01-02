import puppeteer from "puppeteer";
// const puppeteer = require("puppeteer");

export function amazon() {
  (async () => {
    const browser = await puppeteer.launch({
      headless: false,
      // slowMo: 200,
      defaultViewport: false,
      userDataDir: './tmp',
      devtools: true
    });

    const url = 'https://www.amazon.com/s?k=amazon+basics&crid=108FDURC75YPC&sprefix=amazon+basics%2Caps%2C197&ref=nb_sb_noss_2';

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    // await new Promise(r => setTimeout(r, 2000));

    const pdts = [];
    const pdtsTgs = '.s-result-item';
    const nameTarget = 'h2>a>span';
    const priceTarget = '.a-price .a-offscreen';
    const imgTarget = '.s-image';

    const pdtsHdls = await page.$$(pdtsTgs);

    let name = null;
    let price = null;
    let img = null;
    let i = 0;

    for (const pdtHdl of pdtsHdls) {

      try {
        name = await page.evaluate(
          (el, nameTarget) => el.querySelector(nameTarget).textContent.substring(0, 15),
          pdtHdl, nameTarget
        );
      } catch (error) {
      }
      
      try {
        price = await page.evaluate(
          (el, priceTarget) => el.querySelector(priceTarget).textContent,
          pdtHdl, priceTarget
        );
      } catch (error) {
      }
      
      try {
        img = await page.evaluate(
          (el, imgTarget) => el.querySelector(imgTarget).getAttribute('src'),
          pdtHdl, imgTarget
        );
      } catch (error) {
      }

      if (name && price && img) {
        pdts.push({ i, name, price, img });
        i++;
      }
    }
    console.table(pdts);
    console.log('Oki: ' + pdts.length + ' products')
    // await browser.close();
  })();
}