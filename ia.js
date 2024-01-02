import puppeteer from 'puppeteer';

async function amazon() {
  const browser = await puppeteer.launch({
    headless: false,
    // slowMo: 200,
    defaultViewport: false,
    userDataDir: './tmp',
    devtools: true
  });
  const page = await browser.newPage();
  await page.goto('https://www.amazon.com/s?k=amazon+basics&crid=1HVKS8GW5OVGS&sprefix=amazon+basic%2Caps%2C267&ref=nb_sb_noss_2');
  await page.waitForSelector('.s-result-item');
  const allProductsH = await page.$$('.s-result-item');

  const pdtsHTML = [];

  for (const [i, pdtHdl] of allProductsH.entries()) {
    const titleTarget = 'h2>a>span';
    const titleElt = await pdtHdl.$(titleTarget);
    const priceTarget = '.a-price.a-offscreen';
    const priceElt = await page.$(priceTarget);
    if (titleElt && priceElt) {
      const title = $eval(titleElt, el=>el.innerText.trim());
      // const price = priceElt.innerText.trim();
      const price = 777;
      pdtsHTML.push({ i, title, price });
    }
  }
  console.log(pdtsHTML);

  await browser.close();
}

export { amazon };