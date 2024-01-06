import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const fakePdts = [
 { name: 'pdt 1', price: '10', img: 'url1' },
 { name: 'pdt 2', price: '20', img: 'url2' },
 { name: 'pdt 3', price: '50', img: 'url3' },
];

export function test() {

 console.table(fakePdts);

 const filePath = path.resolve(fileURLToPath(import.meta.url), '../csv/results.csv');
 console.log('filepath = ' + filePath);

 // if (fs.existsSync(filePath)) {
 //  fs.rm(filePath, { recursive: true });
 //  fs.rm(path.dirname(filePath), { recursive: true });
 //  console.log(`Deleted dir ${filePath}`);
 // }

 // if (!fs.existsSync(path.dirname(filePath))) {
 //  fs.mkdirSync(path.dirname(filePath), { recursive: true });
 // }

 // if (!fs.existsSync(dirPath)) {
 // fs.mkdirSync(path.dirname(filePath));
 //  console.log(`created dir ${dirPath}`);
 // }
 // if (fs.existsSync(filePath)) {
 //  // fs.unlinkSync(filePath + '/results.csv');
 //  fs.unlinkSync(filePath);
 // }


 // Note: Real case: `{title.replace('/,/g, "."')}`;

 // GPT: array_map()
 // fs.appendFile(filePath, `${fakePdts.map(pdt => `${pdt.name}, ${pdt.price}, ${pdt.img}`).join('\n')}\n`, function (err) {
 //  if (err) throw err;
 //  console.log(`Saved ${fakePdts.length} products`);
 // });

 // Video: while() → Here foreach

 fakePdts.forEach(pdt => {
  console.log(`${pdt.name}, ${pdt.price}, ${pdt.img}`);
 });
 
 let i = 0;
 let nbPdts = fakePdts.length;
 while (i<nbPdts){
    console.log(`${fakePdts[i].name}, ${fakePdts[i].price}, ${fakePdts[i].img}`);
    i++;
 }
 // fs.appendFile(filePath, `${fakePdts.map(pdt => `${pdt.name}, ${pdt.price}, ${pdt.img}`).join('\n')}\n`, function (err) {
 //  if (err) throw err;
 //  console.log(`Saved ${fakePdts.length} products`);
 // });

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