import { createJson } from './classes/createJson.js';
import { saveJson } from './classes/saveJson.js';
export function test() {
 const pdtsJson = createJson();
 console.log(pdtsJson);
 saveJson(pdtsJson, 'pdts');
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