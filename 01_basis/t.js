export function amazon() {
 const pdts = () => {
  const champs = ['name', 'price'];
  const pdtsE = [];

  const names = ['Pdt 1 ', 'Pdt 2 '];
  const prices = [10, 20];

  champs.forEach((champ, index) => {
   let pdt = {
    name: names[index],
    price: prices[index],
   }
   pdtsE.push(pdt);
  });

  return pdtsE;
 }
 console.table(pdts());
};