'use client'
import Image from "next/image";
import Form from 'next/form'
import { getJSONFromFile, saveShoppingList } from './_data-handling/json-handling';
import ListItem from './_ui/list-item';
import { useState } from 'react';

export default function Home() {
 var itemName = '';
 var quantity = 1;
 var unitType = '';
  function setItemName(val: string) {
    itemName = val;
  }
  function setQuantity(val: number) {
    quantity = val;
  }
  function setUnitType(val: string) {
    unitType = val;
  }
  const [shoppingList, updateList] = useState(getJSONFromFile());
  const [addingItem, setAddingItem] = useState(false);
  shoppingList.items = sortItems( shoppingList.items);
  const [orderedList, refreshList] = useState(createListItems(shoppingList, onFaveChange));
function onFaveChange(itemId: string, isFave: boolean) {
  console.log('ONCHANGE', itemId, isFave);
  shoppingList.items.find(item => item.id == itemId).isFavorite = isFave ? 1 : 0;
  //saveShoppingList(shoppingList);
  shoppingList.items = sortItems(shoppingList.items);
  console.log(shoppingList.items);
  updateList(shoppingList);
  refreshList(createListItems(shoppingList, onFaveChange));
}
function handleNewItem(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  var itemId = 'item-'+shoppingList.items.length+1;
  var newItem = {      "id": itemId,
      "name": itemName,
      "quantity": quantity,
      "unit": unitType,
      "isFavorite": 0};
      console.log('ADDING NEW ITEM');
  shoppingList.items.push(newItem);
  shoppingList.items = sortItems(shoppingList.items);
  updateList(shoppingList);
  refreshList(createListItems(shoppingList, onFaveChange));
  setAddingItem(false);
}
function createNewItem() {
  setAddingItem(true);
  setUnitType('');
  setQuantity(1);
  setUnitType('');
}
  return (
    <div className="flex min-h-screen  justify-center bg-pink-300 font-sans dark:bg-gray-800">
      <main className="flex min-h-screen w-full max-w-4xl flex-col  justify-between py-16 px-16 bg-pink-200 dark:bg-gray-500 sm:items-start">
        <Image
          className="dark:invert"
          src="/shopping-list.svg"
          alt="shopping list icon"
          width={100}
          height={20}
          priority
        />
        
        {addingItem ? (<form onSubmit={handleNewItem} className="flex flex-col  gap-2 color-gray-300 border-black sm:items-start sm:text-left">
          <label htmlFor='item-name'>Item Name</label><input  type='text' onChange={(e) => setItemName(e.target.value)}
          required id='item-name'></input>
          <label htmlFor='item-name'>Quantity</label><input type='number' onChange={(e) => setQuantity(e.target.value)} required></input>
          <label htmlFor='item-name'>Unit Type</label><input  type='text' onChange={(e) => setUnitType(e.target.value)} required id='item-name'></input>
          <button type='submit'>Add</button>
          </form>) : ''}

         {!!shoppingList ? (
        <div className="flex flex-col  gap-2 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold tracking-tight text-black dark:text-pink-200">
            {shoppingList.title}
          </h1>
          <div id='list-items' className="max-w-lg text-lg text-pink-600 dark:text-pink-400">
            <ol>{orderedList}</ol>
          </div>
        </div>) : <div className="flex flex-col  gap-2 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold tracking-tight text-black dark:text-pink-200">
            No list detected.
          </h1>
        </div>
        }
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <button onClick={createNewItem}>New Item</button>
        </div>
      </main>
    </div>
  );
}
function createListItems(shoppingList: any, onChange: any) {
  return (
    shoppingList.items.map((item) => (
    <ListItem itemName={item.name} isFave={!!item.isFavorite} itemId={item.id} key={item.id} quantity={item.quantity} unit={item.unit} onChangeFave={onChange}/>
  )));
}
function sortItems(itemList: any) {
  console.log('SORTING');
  return (itemList.sort((a,b) => (
    b.isFavorite - a.isFavorite
  )));
}