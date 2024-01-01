const puppeteer = require('puppeteer');

const getJobInfos = async page => {
  const targetTitle = 'h2.headerstyle__JobViewHeaderTitle-sc-1ijq9nh-5.gmZFGf.JobViewTitle';
  const targetDesc = 'div.descriptionstyles__DescriptionContainer-sc-13ve12b-0.iCEVUR>div';
  const targetUrl = 'h3>a.sc-gAjuZT.cUPTNR';
  await page.waitForSelector(targetDesc);
  const title = await page.evaluate((targetTitle) => {
    return document.querySelector(targetTitle).innerText;
  }, targetTitle);
  const description = await page.evaluate((targetDesc) => {
    return document.querySelector(targetDesc).innerText;
  }, targetDesc);
  const url = await page.evaluate((targetUrl) => {
    return document.querySelector(targetUrl).href;
  }, targetUrl);
  return {
    title,
    description,
    // url
  }
}
(async () => {
  // console.log('oki');
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    userDataDir: ('./user_data'),
    headless: false,
    // slowMo: 200,
    defaultViewport: null
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 900 });

  // await page.goto('https://www.monster.fr', { waitUntil: 'networkidle2' });
  await page.goto('https://www.monster.fr/emploi/recherche?q=developpeur+web&where=Paris%2C+%C3%8Ele-de-France&page=1&so=m.s.sh', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 5000));

  // document.querySelector('[class*='descriptionBody'])
  // Scroll wheel by X:0, Y:300

  // Click on <a> "Alternance Developpeur We..."
  // const job1 = '.sc-blKGMR:nth-child(4) [data-testid="jobTitle"]';

  // await page.waitForSelector(job1, {visible: true});
  // await page.click(job1);

  await page.evaluate(() => window.scrollBy(0, 100));

  // Click on <span> "Charger plus"
  // await page.waitForSelector('.hYqokn > span');
  // await Promise.all([
  //   page.click('.hYqokn > span'),
  //   page.waitForNavigation()
  // ]);

  const results = [];
  const target = 'h3 > a.sc-gAjuZT.cUPTNR';
  const jobs = await page.$$(target);
  
  const urls = await page.$$eval(target, els => {
    return els.map(e=>e.href)
  });
  
  for (const job in jobs) {
    // let uuu = document.querySelector('h3 > a.sc-gAjuZT.cUPTNR');
    // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'+(document.querySelector('[href]')));
    console.log('-'.repeat(128));
    jobs[job].click();
    // console.log ('cliiiiiiiiiiicked', jobs[job].url);
    await new Promise(r => setTimeout(r, 2000));

    const jobInfos = await getJobInfos(page);
    

    // const jobUuu = await page.evaluate(el => {
    //   if (el) {
    //     return el.innerText;
    //   }
    //   return '';
    // }, job);
    console.log('job ' + job + ': ' + jobInfos.title);
    console.log('-'.repeat(64));
    console.log(jobInfos.description);
    // console.log('jobUuu: ' + jobUuu);

    results.push({
      title: jobInfos.title,
      // description: jobInfos.description,
      url: urls[job].slice(0,90)
    });
  }

  await page.evaluate(() => window.scrollBy(0, 100));
  await new Promise(r => setTimeout(r, 5000));

  console.log('-'.repeat(128) + 'Results: ' + '-'.repeat(119));
  console.table(results);

  // const aHandle = await page.evaluate(() => 2);
  // console.log(aHandle);
  // const a = 7;
  // const result = await page.evaluate(
  //   (a) => Promise.resolve(8 * a)
  //   , a);
  // console.log(result); // prints "56"

  // const result2 = await page.evaluate((a) => {
  //   return Promise.resolve(8 * a);
  // }, a);
  // console.log(result2); // prints "56"

  // const jobs = await page.evaluate((a) => {
  //   return "OK " + a;
  // }, a)
  // console.log(jobs);

  // const searchInput = 'input[name="q"]'
  // // console.log(searchInput);

  // await page.click(searchInput);
  // await page.type(searchInput, 'developpeur react', { delay: 350 });
  // await new Promise(r => setTimeout(r, 5000));


  await new Promise(r => setTimeout(r, 7000));
  await browser.close();
})();

// https://www.youtube.com/watch?v=tLIqYdKhwSc