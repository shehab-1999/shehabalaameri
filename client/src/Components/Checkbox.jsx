import StoreContext from "../hooks/storeContext"
import React, { useContext, useEffect, useState } from "react"
import qs from 'qs'
import Cateogaries from "./Categories"
export default function Checkbox({category}) {

  
const {filter,setFilter,selectedCategories,setSelectedCategories}=useContext(StoreContext)
useEffect(()=>{

  const  query=qs.stringify({

    filters:{
        cateogaries:{
          id:{
            $in:selectedCategories
          }
          
                    }
      
          }
          
      })
      setFilter("http://localhost:1337/api/products?populate=*&"+query)
      
    

},[selectedCategories])

const  handleFilterCategory= (e)=>{
  const selctedID=e.target.dataset.category
  const isChecked=e.target.checked
  

setSelectedCategories(
  selectedCategories=>{
    if(isChecked) return [...selectedCategories,selctedID]
    return selectedCategories.filter(id=>id!==selctedID)

  }
 )

   

     

     
  }  

      return (
      <div className="">
      
      <label className="">
  <input type="checkbox" data-category={category.id} className="sr-only peer" onChange={handleFilterCategory} />
  <div className="w-12 h-6 bg-gray-200 rounded-full shadow-inner peer-checked:bg-green-500  transition-colors duration-300 ease-in-out">
   
    
  <div className=" h-[90%] w-[40%] ml-[1%] justify-center bg-white rounded-full shadow-md -translate-x-1 transform transition-transform duration-300 ease-in-out peer-checked:m-12">

  <div className="pl-16 text-white">{category.attributes.title}</div>
  
  </div>
  </div>
  
</label>


 
      </div>  

    
    )
  }
  React.memo(Checkbox)