import puppeteer from "puppeteer";
// const puppeteer = require("puppeteer");

export function amazon() {

  const getProductInfos = async page => {
    const targetname = 'h2>a>span';
    // const targetDesc = 'div.descriptionstyles__DescriptionContainer-sc-13ve12b-0.iCEVUR>div';
    // const targetUrl = 'h3>a.sc-gAjuZT.cUPTNR';
    await page.waitForSelector(targetname);
    const name = await page.$eval((targetname) => {
      return document.querySelector(targetname).contentText;
    }, targetname);
    // const description = await page.evaluate((targetDesc) => {
    //   return document.querySelector(targetDesc).innerText;
    // }, targetDesc);
    // const url = await page.evaluate((targetUrl) => {
    //   return document.querySelector(targetUrl).href;
    // }, targetUrl);
    return {
      name,
      // description,
      // url
    }
  }

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
    const pdtsHdls = await page.$$(pdtsTgs);

    var i = 0;
    for (const [index, pdtHdl] of pdtsHdls.entries()) {
      // if (index > 5 && index < 10) {
      // const pdt = await page.evaluate(el=>el.innerText, pdtHdl);
      const nameTarget = 'h2>a>span';
      await page.waitForSelector(nameTarget);
      const nameHdl = await pdtHdl.$(nameTarget);
      const priceTarget = '.a-price .a-offscreen';
      await page.waitForSelector(priceTarget);
      const priceHdl = await pdtHdl.$(priceTarget);

      if (nameHdl && priceHdl) {
        const name = (await page.evaluate(el => el.innerText, nameHdl)).substring(0,50);
        const price = await page.evaluate(el => el.innerText, priceHdl);

        console.log({ i, name, price });
        pdts.push({ i, name, price });
        i++;
        // }
      }
    }

    console.log('Oki: ' + pdts.length + ' products')
    console.table(pdts);
    // await browser.close();
  })();
}