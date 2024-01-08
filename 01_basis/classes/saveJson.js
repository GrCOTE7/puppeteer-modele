import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export function saveJson(data, filename) {
 const saveJ = () => {
  const filePath = path.resolve(fileURLToPath(import.meta.url), '../../files/json/' + filename + '.json');
  console.log(filePath);
  fs.writeFile(filePath, data, (err) => {
   if (err) throw err;
   console.log('Le fichier ' + filename + '.json a été créé avec succès!');
  });
 }
 saveJ();
}