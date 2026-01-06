'use client'
import React, { useState } from 'react';
export interface ListItemProps {
  isFave: boolean;
  itemId: string;
  itemName: string;
  quantity: number;
  unit: string;
  onChangeFave: any;
}
export default function ListItem(props: ListItemProps) {
    const [isFave, setIsFave] = useState(props.isFave == true);
    const handleChange = (event: { target: { checked: boolean, id: string ; }; }) => {
        setIsFave(event.target.checked);
        props.onChangeFave(event.target.id, event.target.checked)
    };
  return (
    <li className="flex font-sans grid grid-cols-4 gap-2 px-16">
    <input className='peer col-start-1 appearance-none' checked={isFave} onChange={handleChange} id={props.itemId} type='checkbox'/>
        
    <svg
      className="absolute w-4 h-4 pointer-events-none stroke-white fill-none peer-checked:!fill-red-500 mt-1"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
    <label className={'col-span-2 col-start-2 ' + (isFave ? 'text-pink-400' : 'text-gray-500')} htmlFor={props.itemId}>
      {props.itemName}
    </label>
    <label className={'col-start-4 ' + (isFave ? 'text-pink-400' : 'text-gray-500')} htmlFor={props.itemId}>
      ({props.quantity} {props.unit})
    </label>
    </li>
  );
}
