import puppeteer from "puppeteer-extra";
import proxyPlugin from 'puppeteer-extra-plugin-proxy';
import useProxy from 'puppeteer-page-proxy';
import dotenv from "dotenv";
dotenv.config({ path: './.env' });


export function myProxy() {
  (async () => {
    console.log('User: ' + process.env.HIDEME_USER);
    //  puppeteer.use(ProxyPlugin({
    //   address: '123.123.123.123',
    //   port: 48220
    //  }));

    // const proxy = process.env.HIDEME_USER;
    // const proxy = '162.23.125.31:8080';

    const browser = await puppeteer.launch({
      headless: false,
      // slowMo: 200,
      defaultViewport: false,
      userDataDir: './tmp',
      // devtools: true
      // See chrome parameters in chrome'url: chrome://version
      // executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
      // userDataDir: "C:/Users/utilisateur/AppData/Local/Google/Chrome/User Data/Default",
      // proxy: {
      //   host: '127.0.0.1',
      //   port: '8080',
      //   username: process.env.HIDEME_USER,
      //   password: process.env.HIDEME_PASS
      // },
      args: [
        `--proxy-server=${proxy}`,
        // '--no-sandbox',
        // '--disable-setuid-sandbox'
      ],
    });

    console.log('Running test... Proxy ' + proxy);

    const page = await browser.newPage();

    await page.goto('https://www.mon-ip.com', { waitUntil: 'networkidle2' });

    console.log('Done.')

    await new Promise(r => setTimeout(r, 21000));
    await browser.close();
  })();
}

// myProxy();