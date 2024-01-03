import puppeteer from "puppeteer";

export function amazon() {
 (async () => {
  const browser = await puppeteer.launch({
   headless: false,
   // slowMo: 200,
   defaultViewport: false,
   userDataDir: './tmp',
   devtools: true
  });

  const url = 'https://www.amazon.com/s?k=Amazon+basics&crid=3OBMRW144CWX8&sprefix=amazon+basics%2Caps%2C220&ref=nb_sb_noss_2';
  // const url = 'https://www.amazon.com/s?k=amazon+basics&page=7&ref=sr_pg_7';

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 2000));
  
  const nextSelector = 'span.s-pagination-next.s-pagination-disabled[aria-disabled="true"]';

  const is_next_btn_disabled = await page.$(nextSelector) !== null;
  
  // Ne marche que dans le cas dernière page car présence de aria-disabled, et sinon, par → error
  // const is_next_btn_disabled = await page.$eval(nextSelector, el => el ? true : false);
  
 
  console.log(await page.$(nextSelector));
  console.log('next button disabled ? : '+ is_next_btn_disabled);
  
  
  // const pdts = [];
  // console.table(pdts);
  // console.log('Oki: ' + pdts.length + ' products')
  // await browser.close();
 })();
}

amazon();