export function createJson() {
 const pdts = () => {
  const champs = ['name', 'price'];
  let pdtsArr = [];

  const names = ['Pdt 1 ', 'Pdt 2 '];
  const prices = [10, 20];

  champs.forEach((champ, index) => {
   let pdt = {
    "name": names[index],
    "price": prices[index],
   };
   pdtsArr.push(pdt);
  });

  // console.table(pdtsArr);
  let pdtsJson = JSON.stringify(pdtsArr);

  return pdtsArr;
 }
 let pdtsJson = JSON.stringify(pdts());

 return pdtsJson;
}