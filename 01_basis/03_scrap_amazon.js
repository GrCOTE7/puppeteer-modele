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

    const pdtsHdls = await page.$$(pdtsTgs);

    let nameO = null;
    let price = 'Null';
    let img = 'Null';
    let i = 0;

    for (const pdtHdl of pdtsHdls) {

      try {
        name = await page.evaluate(
          (el, nameTarget) => el.querySelector(nameTarget).textContent.substring(0, 140),
          pdtHdl, nameTarget
        );
      } catch (error) {
      }

      if (name) {
        pdts.push({ i, name });
        i++;
      }
    }
    console.table(pdts);
    console.log('Oki: ' + pdts.length + ' products')
    // await browser.close();
  })();
}