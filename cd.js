const puppeteer = require('puppeteer');
const nodemailer = require("nodemailer");
require("dotenv").config();

const url = "https://www.cdiscount.com/informatique/achat-pc-ordinateur/pc-de-bureau-gamer-medion-erazer-engineer-p10-md35/f-1070853-auc4061275197914.html#mpos=0|cd";
// const url = "https://www.cdiscount.com/informatique/achat-pc-ordinateur/vist-kit-gaming-ryzen-7-5700g-ram-32go-rx-vega/f-1070853-vis1698399165507.html#mpos=0|mp";

(async () => {
 const browser = await puppeteer.launch({
  headless: false,
  defaultViewport: null
 });
 const page = await browser.newPage();
 // await page.setViewport({ width: 1780, height: 8000 })
 await page.goto(url, { waitUntil: "networkidle2" });
 
 await page.click('#footer_tc_privacy_button_2');

 // const price = await page.$eval('fpPrice price priceColor jsMainPrice jsProductPrice hideFromPro', el => el.innerText);

 // fpPrice price priceColor jsMainPrice jsProductPrice displayToPro


 const result = await page.evaluate(() => {
  let price = document.querySelector('span[itemprop=price]').getAttribute('content');
  let PriceString = document.querySelector('span[itemprop=price]').innerText;

  let title = document.querySelector('h1').innerText;
  //  let price = document.querySelector('fpPrice price priceColor jsMainPrice jsProductPrice hideFromPro').innerText;

  return {
   title,
   PriceString,
   price
  };
 });

 console.table(result);

 if (parseInt(result['price']) < 800) {
  console.log('Price is less than 800 !');
  // sendNotification(result['price']);
 }

 async function sendNotification(price) {
  let transporter = nodemailer.createTransport({
   service: "gmail",
   auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
   },
   tls: {
    rejectUnauthorized: false, // Désactiver la vérification du certificat SSL
   }
  });

  let info = await transporter
   .sendMail({
    from: 'PC Cdiscount <' + process.env.MAIL_USER + '>',
    to: process.env.MAIL_USER,
    subject: "Prix à " + price + "€",
    html: "Le prix de la tour est de <b>" + price + "€</b>",
   })
   .then(() => console.log("Message envoyé"));

  console.log(info);
 }


 // let bodyHTML = await page.evaluate(() => document.body.innerHTML);
 // console.log(bodyHTML);

 // await page.pdf({
 //  path: 'page.pdf',
 //  format: 'A4',
 //  printBackground: true
 // })

 // await page.screenshot({
 //  path: 'page.png'
 // })

 // await page.click('footer_tc_privacy_button_2');

 await browser.close();
})();