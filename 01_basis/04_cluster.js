import puppeteer from 'puppeteer';
import { Cluster } from 'puppeteer-cluster';

export function test() {
  const urls = [
    'https://www.amazon.fr/Green-Cell-Rechargeables-Pr%C3%A9charg%C3%A9e-Auto-d%C3%A9charge/dp/B07TMN61NL/ref=pd_ci_mcx_pspc_dp_d_2_t_1?pd_rd_w=uQOAq&content-id=amzn1.sym.d4cf1f6d-1cc9-4006-b582-64dfe10b1e46&pf_rd_p=d4cf1f6d-1cc9-4006-b582-64dfe10b1e46&pf_rd_r=RJY9CPAK82FANWV75C10&pd_rd_wg=DvW25&pd_rd_r=6c056f56-9b05-45f4-a1b4-deca3603bef3&pd_rd_i=B07TMN61NL',
    'https://www.amazon.fr/Amazon-Basics-Vitesse-Lecture-Maximale/dp/B0B61DGG18/ref=sxin_12_recs_zoco_stores_brand_identity_bs?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&content-id=amzn1.sym.6d55921a-22fe-4204-b179-d1d84a927b8f%3Aamzn1.sym.6d55921a-22fe-4204-b179-d1d84a927b8f&crid=191PGTEWI8R8I&cv_ct_cx=amazon%2Bbasics&keywords=amazon%2Bbasics&pd_rd_i=B0B61DGG18&pd_rd_r=8b4c1ef7-cfd3-4f33-94ef-b86927fbd1d1&pd_rd_w=mrnZ8&pd_rd_wg=VGteK&pf_rd_p=6d55921a-22fe-4204-b179-d1d84a927b8f&pf_rd_r=WSKEZYC6ZJKGF24QR6J9&qid=1704514248&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=amazon%2Bbasicq%2Caps%2C265&sr=1-1-0723f66e-ff99-43ba-a202-1be1089a8603&th=1'
  ];
  (async () => {
    const cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_PAGE,
      maxConcurrency: 2,
      monitor: true,
      puppeteerOptions: {
        headless: false,
        // slowMo: 200,
        defaultViewport: false,
        userDataDir: './tmp',
        devtools: true
      }
    });

    await cluster.task(async ({ page, data: url }) => {
      // console.log(data);
      await page.goto(url);
      // const screen = await page.screenshot({ path: url });
      // Store screenshot, do something else
      await new Promise(r => setTimeout(r, 7000));
    });

    for (const url of urls) {
      await cluster.queue(url);
    }

    // await cluster.idle();
    // await cluster.close();
  })();

};

test();






























export function iteration() {

  let i = 1;
  do {
    console.log(i++);
    // } while (i < 8 && 0)
  } while (i < 8)


};
// iteration();