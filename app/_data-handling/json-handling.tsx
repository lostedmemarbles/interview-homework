import shoppingList from '../../public/shopping-list.json';
const fs = require('fs');
const fileName = '../../public/shopping-list.json';
const listFile = require(fileName);
export function getJSONFromFile() {
    return shoppingList;
}
export function saveShoppingList(listData: any) {
    fs.writeFile(fileName, JSON.stringify(listData), function writeJSON(err) {
  if (err) return console.log(err);
});
}