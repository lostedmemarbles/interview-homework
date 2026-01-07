'use client'
import Image from "next/image";
import Form from 'next/form'
import { getJSONFromFile, saveShoppingList } from './_data-handling/json-handling';
import ListItem from './_ui/list-item';
import { useState, useMemo } from 'react';

export default function Home() {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unitType, setUnitType] = useState('count');
  const [shoppingList, updateList] = useState(getJSONFromFile());
  const [addingItem, setAddingItem] = useState(false);
  shoppingList.items = sortItems( shoppingList.items);
  const orderedItems = useMemo(() => {
  return sortItems([...shoppingList.items]);
}, [shoppingList.items]);

function onFaveChange(itemId: string, isFave: boolean) {
  console.log('ONCHANGE', itemId, isFave);
  shoppingList.items = sortItems(shoppingList.items);
  console.log(shoppingList.items);
  updateList(prev => ({
    ...prev,
    items: sortItems(
      prev.items.map(item =>
        item.id === itemId
          ? { ...item, isFavorite: isFave ? 1 : 0 }
          : item
      )
    )
  }));
}
function handleNewItem(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  var itemId = 'item-'+shoppingList.items.length+1;
  updateList(prev => {
    const newItem = {
      "id": itemId,
      "name": itemName,
      "quantity": quantity,
      "unit": unitType,
      "isFavorite": 0
    };
    return {...prev,
      items: sortItems([...prev.items, newItem])
    };
  });
  setAddingItem(false);
}
function createNewItem() {
  setItemName('');
  setQuantity(1);
  setUnitType('count');
  setAddingItem(true);
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
        
        {addingItem ? (<form onSubmit={handleNewItem} className="flex flex-col px-16 py-16 gap-4 bg-pink-300 border-black sm:items-start sm:text-left">
          <h2>Add New Item</h2>
          <label className=' px-16' htmlFor='item-name'>Item Name</label><input className='shopping-list-input' type='text' value={itemName} onChange={(e) => setItemName(e.target.value)} required id='item-name' autoFocus></input>
          <label className=' px-16' htmlFor='item-name'>Quantity</label> <input className='shopping-list-input' type='number' value={quantity} onChange={(e) => setQuantity(e.target.value)} required id='quantity'></input>
          <label className=' px-16' htmlFor='item-name'>Unit Type</label><input className='shopping-list-input' type='text' value={unitType} onChange={(e) => setUnitType(e.target.value)} required id='unit-type'></input>
          <button className='justify-center' type='submit'>Add</button>
          </form>) : ''}

         {!!shoppingList ? (
        <div className="flex flex-col  gap-2 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold tracking-tight text-black dark:text-pink-200">
            {shoppingList.title}
          </h1>
          <div id='list-items' className="max-w-lg text-lg text-pink-600 dark:text-pink-400">
            <ol>
              {orderedItems.map(item => (
                <ListItem
                  key={item.id}
                  itemName={item.name}
                  quantity={item.quantity}
                  unit={item.unit}
                  isFave={!!item.isFavorite}
                  itemId={item.id}
                  onChangeFave={onFaveChange}
                />
              ))}
  </ol>
          </div>
        </div>) : <div className="flex flex-col  gap-2 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold tracking-tight text-black dark:text-pink-200">
            No list detected.
          </h1>
        </div>
        }
        <div className="flex flex-col gap-1 text-base font-medium sm:flex-row">
          <button onClick={createNewItem}  className='grid grid-cols-2 '>
            <Image
          className="dark:invert gap-1 col-start-1 py-3"
          src="/plusSign.svg"
          alt="add item icon"
          width={40}
          height={40}
          priority
        />
        <label className='flex col-start-2 py-5'>New Item</label></button>
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