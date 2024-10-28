import React, { useState } from 'react'

import { FaRedoAlt, FaShoppingBasket } from "react-icons/fa";
import { FaTrash } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { removeFromCart, resetCart } from '../redux/cartReducer';
export default function Cart() { 
  const [cartList,setCartList]=useState(false)
  function handeShowCartList(e){
    setCartList((e)=>!e)
  }
const products=useSelector(state=>state.cart.products)
const dispatch=useDispatch()
const totalCount = products?.reduce((total, item) => total + item.price , 0);
  return (
    <div className='flex justify-center fixed right-[25px] z-[99]'>
        
        <div>
        <div className='text-white text-[35px]' ><FaShoppingBasket onClick={handeShowCartList}/></div>
        <div className=' bg-[rgb(200,20,20)] rounded-[50%] w-[20px] aspect-square grid place-content-center font-bold  absolute top-0 right-[70%]'>{products.length}</div>
        {cartList ?
        
        <ul className='bg-white text-black] p-0 font-bold w-[max-content] absolute right-0 before:rotate-[45px] before:top-[-3px] before:right-[4px] before:absolute before:bg-white   before:size-[20px]' >
         
         
         {products.map((product)=>
          <li key={product.id} className='flex items-center gap-[10px] p-[15px] border-b-2 divide-solid border-b-[#a4a4a4] cursor-pointer hover:bg-[#c8c8c8] justify-between'>
          <img src={"http://localhost:1337"+product.image} className='rounded-[50%] aspect-square w-[40px] '></img>
          <span>{product.Title} </span>
          <span className='bg-[#1c582c] text-[#e3e3e3] rounded-[5px pl-[7px] pr-[7px] top-[3px] bottom-[3px]'>{product.price}</span>
          <span><FaTrash className='text-red-600'
          
          onClick={()=>dispatch(removeFromCart({
            id:product.id,
          
      
      
          }))}
          
          /></span>
        
        </li>





         )}
           <span className='justify-center items-center flex font-serif p-3'>
            الإجمالي:{totalCount}
           </span>
          <span className='justify-center items-center flex'><FaRedoAlt onClick={()=>
            dispatch(resetCart())
          }/></span>

        </ul>
        :""}
        </div>
    </div>
    
  )
}
