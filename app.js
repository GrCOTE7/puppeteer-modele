const puppeteer = require('puppeteer');

const getJobDescription = async page => {
  const target = 'div.descriptionstyles__DescriptionContainer-sc-13ve12b-0.iCEVUR>div';
  await page.waitForSelector(target);

  const jobDescription = await page.evaluate((target) => {
    return document.querySelector(target).innerText;
  }, target);
  return jobDescription;
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


  const jobs = await page.$$('h3 > a.sc-gAjuZT.cUPTNR');
  // console.log(jobs);
  // jobs[0].click();
  // await new Promise(r => setTimeout(r, 4000));

  for (const job in jobs) {
    console.log('------------------------------------------------------------------------');
    console.log('job: ' + job);
    jobs[job].click();
    await new Promise(r => setTimeout(r, 4000));

    const jobDescription = await getJobDescription(page);
    console.log(jobDescription);
  }

  // const allJobs = await page.evaluate(() => {
  //   const jobs = document.querySelectorAll('h3 > a.sc-gAjuZT');
  //   console.log(jobs);
  //   // jobs[1].click();
  //   let allJobs = [];
  //   for (job in jobs) {
  //     console.log('job: ' + job);
  //     allJobs.push(job);
  //   }
  //   return Promise.resolve(allJobs);
  // });
  // console.log('allJob1: ' + allJobs[2]);


  // const jobs = await page.evaluate(()=> document.querySelectorAll('.sc-gAjuZT.cUPTNR'));
  // console.log('jobs: '+jobs);

  await page.evaluate(() => window.scrollBy(0, 100));
  await new Promise(r => setTimeout(r, 5000));

  // const jobDescription = await getJobDescription(page);
  // console.log(jobDescription);

  // for (const job of jobs) {
  //   console.log('Job = '+ job);
  // }




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


  // // document.querySelector('button > span > div');
  // const search = 'button[aria-label="Rechercher"]';
  // // const search = 'ul > li > button';
  // await new Promise(r => setTimeout(r, 8000));
  // await page.waitForSelector(search, {visible: true});
  // await page.click(search);
  // await new Promise(r => setTimeout(r, 5000));

  await new Promise(r => setTimeout(r, 7000));
  await browser.close();
})();

// https://www.youtube.com/watch?v=tLIqYdKhwSc