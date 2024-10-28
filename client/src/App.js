
import StoreContext from "./hooks/storeContext"
import Cateogaries from "./Components/Categories"
import Products from "./Components/Products"
import { useEffect, useState } from "react"
import Cart from "./Components/Cart"
import Check from "./Components/check"


 


function App(){
  const [selectedCategories,setSelectedCategories]=useState([])
 const [filter,setFilter]=useState("http://localhost:1337/api/products?populate=*")  
 

  return(
  
  
  <div  className="bg-[#1f1919] pt-3 ">

  
  <StoreContext.Provider value={
    {filter,setFilter,selectedCategories,setSelectedCategories}
    
    } >
      <div className="flex justify-between">
      
      <Cateogaries/>
      <Cart/>
      </div>


<Products/>

<Check></Check>
  </StoreContext.Provider>

  
  
  
    
    
   
  </div>)
}
export default App