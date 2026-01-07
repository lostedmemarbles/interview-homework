'use client'
import Image from "next/image";
import Form from 'next/form'
import { getJSONFromFile, saveShoppingList } from './_data-handling/json-handling';
import ListItem from './_ui/list-item';
import NewItemForm from './_ui/new-item-form';
import { useState, useMemo } from 'react';

export default function Home() {
  const [shoppingList, updateList] = useState(getJSONFromFile());
  const [addingItem, setAddingItem] = useState(false);
  shoppingList.items = sortItems( shoppingList.items);
  const orderedItems = useMemo(() => {
  return sortItems([...shoppingList.items]);
}, [shoppingList.items]);

function onFaveChange(itemId: string, isFave: boolean) {
  shoppingList.items = sortItems(shoppingList.items);
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
function createNewItem() {
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
        
        {addingItem ? (
          <NewItemForm 
          onSubmit={({name, quantity, unit}) => {
            updateList(prev => {
              const newItem = {
                id: 'item-'+shoppingList.items.length+1,
                name,
                quantity,
                unit,
                isFavorite: 0
              };
              return {
                ...prev,
                items: sortItems([...prev.items, newItem])
              };
            });
            setAddingItem(false);
          }}/>
        ) : ''}

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
function sortItems(itemList: any) {
  return (itemList.sort((a,b) => (
    b.isFavorite - a.isFavorite
  )));
}