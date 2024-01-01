import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from 'url';
// const puppeteer = require("puppeteer");

export function amazon() {
 (async () => {
  const browser = await puppeteer.launch({
   headless: false,
   // slowMo: 200,
   defaultViewport: false,
   userDataDir: ('./tmp'),
  });
  const page = await browser.newPage();
  await page.goto('https://www.amazon.com/s?k=amazon+basics&ref=nav_bb_sb', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  const imageUrls = await page.evaluate(() => {
   const imageUrlList = [];
   const imageElements = document.querySelectorAll('.s-image');

   imageElements.forEach((imageElement) => {
    const imageUrl = imageElement.getAttribute('src');

    if (imageUrl) {
     imageUrlList.push(imageUrl);
    }
   });

   return imageUrlList;
  });

  imageUrls.forEach((imageUrl, index) => {
   const fileName = `product-${index}.jpg`;
   // const filePath = path.resolve(fileURLToPath(import.meta.url), '..', fileName);
   const filePath = path.resolve(fileURLToPath(import.meta.url), '../imgs', fileName);
   
   console.log(filePath);

   const writeStream = fs.createWriteStream(filePath);

   const request = https.get(imageUrl, (response) => {
    response.pipe(writeStream);
   });
  });

  await browser.close();
 })();
}