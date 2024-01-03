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

    const pdts = [];
    const PdtsSelector = '.s-result-item';
    const nameSelector = 'h2>a>span';
    const priceSelector = '.a-price .a-offscreen';
    const imgSelector = '.s-image';
    const nextSelectorActive = 'a.s-pagination-next';
    const nextSelectorDisabled = 'span.s-pagination-next.s-pagination-disabled[aria-disabled="true"]';

    const url = 'https://www.amazon.com/s?k=amazon+basics&crid=108FDURC75YPC&sprefix=amazon+basics%2Caps%2C197&ref=nb_sb_noss_2';
    // const url = 'https://www.amazon.com/s?k=amazon+basics&page=6&ref=sr_pg_6';
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    let is_next_btn_disabled = false;
    let i2 = 0;

    let name = null;
    let price = null;
    let img = null;
    let i = 0;

    do {
      await new Promise(r => setTimeout(r, 2000));

      let is_next_btn_disabled = await page.$(nextSelectorDisabled) !== null;
      console.log(i2++ + ' ( ' + i + ' ): ' + is_next_btn_disabled);
      const nextSelector = (is_next_btn_disabled ? nextSelectorDisabled : nextSelectorActive);

      await page.waitForSelector(nextSelector, { visible: true });

      const pdtsHdls = await page.$$(PdtsSelector);

      for (const pdtHdl of pdtsHdls) {

        try {
          name = await page.evaluate(
            (el, nameSelector) => el.querySelector(nameSelector).textContent.substring(0, 70),
            pdtHdl, nameSelector
          );
        } catch (error) { }

        try {
          price = await page.evaluate(
            (el, priceSelector) => el.querySelector(priceSelector).textContent,
            pdtHdl, priceSelector
          );
        } catch (error) { }

        try {
          img = await page.evaluate(
            (el, imgSelector) => el.querySelector(imgSelector).getAttribute('src'),
            pdtHdl, imgSelector
          );
        } catch (error) { }

        if (name) {
          pdts.push({ name, price, img });
          i++;
        }
      }

      if (!is_next_btn_disabled) {
        await Promise.all([
          page.click(nextSelector),
          page.waitForNavigation({ waitUntil: "networkidle2" }),
        ]);
      } else {
        break;
      }

      // } while (!is_next_btn_disabled && i2++ < 10);
    } while (true);

    console.table(pdts);
    console.log('Oki: ' + pdts.length + ' products')
    await browser.close();
  })();
}

amazon();