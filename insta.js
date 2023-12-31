const puppeteer = require('puppeteer');
const nodemailer = require("nodemailer");
require("dotenv").config();

const url = "https://www.instagram.com";

(async () => {
 const browser = await puppeteer.launch({
  headless: false,
  defaultViewport: null
 });
 const page = await browser.newPage();
 // await page.setViewport({ width: 1780, height: 8000 })
 await page.goto(url, { waitUntil: "networkidle2" });

 // Accepte cookies
 await page.click('div[role=dialog] >div > button');
 
 // Login
 await page.type('input[name=username]', process.env.INSTA_USER, { delay: 250 })
 await page.type('input[name=password]', process.env.INSTA_PASS, { delay: 350 })
 
 // Valid login form
 await page.click('button[type=submit]');
 
 
 var buttons = ['div._ac8f > [role=button]', '._a9-z > button + button'];
 
 // Later Save login data
 await page.waitForSelector(buttons[0], {visible: true});
 await page.click(buttons[0]);
 
 // Notifications later
 // document.querySelector('._a9-z > button + button')
 await page.waitForSelector(buttons[1], {visible: true});
 await page.click(buttons[1]);
 
 // const price = await page.$eval('fpPrice price priceColor jsMainPrice jsProductPrice hideFromPro', el => el.innerText);

 // await browser.close();
})();