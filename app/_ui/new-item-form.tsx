'use client'
import React, { useState } from 'react';
export interface NewItemFormProps {
  onSubmit: (item: {
    name: string;
    quantity: number;
    unit: string;
  }) => void;
}
export default function NewItemForm({onSubmit}: NewItemFormProps) {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unitType, setUnitType] = useState('count');
  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    onSubmit({
        name: itemName.trim(),
        quantity,
        unit: unitType
    });
    setItemName('');
    setQuantity(1);
    setUnitType('count');
}




return (<form onSubmit={handleSubmit} className="flex flex-col px-16 py-16 gap-4 bg-pink-300 border-black sm:items-start sm:text-left">
          <h2>Add New Item</h2>
          <label className=' px-16' htmlFor='item-name'>Item Name</label><input className='shopping-list-input' type='text' value={itemName} onChange={(e) => setItemName(e.target.value)} required id='item-name' autoFocus></input>
          <label className=' px-16' htmlFor='item-name'>Quantity</label> <input className='shopping-list-input' type='number' value={quantity} onChange={(e) => setQuantity(e.target.value)} required id='quantity'></input>
          <label className=' px-16' htmlFor='item-name'>Unit Type</label><input className='shopping-list-input' type='text' value={unitType} onChange={(e) => setUnitType(e.target.value)} required id='unit-type'></input>
          <button className='justify-center' type='submit'>Add</button>
          </form>);
          }