export function arrayToTable() {
 const pdts = () => {
  const champs = ['name', 'price'];
  const pdtsArr = [];

  const names = ['Pdt 1 ', 'Pdt 2 '];
  const prices = [10, 20];

  champs.forEach((champ, index) => {
   let pdt = {
    name: names[index],
    price: prices[index],
   }
   pdtsArr.push(pdt);
  });

  return pdtsArr;
 }
 console.table(pdts());
};

arrayToTable();