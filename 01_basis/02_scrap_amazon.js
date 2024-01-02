import puppeteer from "puppeteer";
// const puppeteer = require("puppeteer");

export function amazon() {

  const getProductInfos = async page => {
    const targetTitle = 'h2>a>span';
    // const targetDesc = 'div.descriptionstyles__DescriptionContainer-sc-13ve12b-0.iCEVUR>div';
    // const targetUrl = 'h3>a.sc-gAjuZT.cUPTNR';
    await page.waitForSelector(targetTitle);
    const title = await page.$eval((targetTitle) => {
      return document.querySelector(targetTitle).contentText;
    }, targetTitle);
    // const description = await page.evaluate((targetDesc) => {
    //   return document.querySelector(targetDesc).innerText;
    // }, targetDesc);
    // const url = await page.evaluate((targetUrl) => {
    //   return document.querySelector(targetUrl).href;
    // }, targetUrl);
    return {
      title,
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

    for (const [index, pdtHdl] of pdtsHdls.entries()) {
      if (index > 5 && index < 10) {
        // const pdt = await page.evaluate(el=>el.innerText, pdtHdl);
        const titleTarget = 'h2>a>span';
        await page.waitForSelector(titleTarget);
        const titleHdl = await pdtHdl.$(titleTarget);
        const title = await page.evaluate(el => el.innerText, titleHdl);

        const priceTarget = '.a-price .a-offscreen';
        await page.waitForSelector(priceTarget);
        const priceHdl = await pdtHdl.$(priceTarget);
        const price = await page.evaluate(el => el.innerText, priceHdl);

        console.log({ index, title, price });
      }
    }

    // console.log(Eee);
    // (e) => {

    // const productsList = [products];
    // await page.waitForSelector(targetTitle);
    // const productsEls = await page.$$(productsTargets);

    // productsEls.forEach((productEl) => {
    //   const titleTarget = 'h2>a>span';
    //   const titleElt = productEl.querySelector(titleTarget);
    //   const priceTarget = '.a-price .a-offscreen';
    //   const priceElt = productEl.querySelector(priceTarget);
    //   if (titleElt && priceElt) {
    //     const title = titleElt.innerText.trim();
    //     const price = priceElt.innerText.trim();
    //     productsList.push({ title, price });
    //   }
    // });

    //   return productsList;
    // });

    // const p0 = page.e

    // console.log(pdts);

    console.log('Oki: ' + pdts.length + ' products')
    // await browser.close();
  })();
}