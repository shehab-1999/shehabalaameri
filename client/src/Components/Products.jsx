import { useState,useEffect, useContext} from 'react'
import { useFetch } from '../hooks/useFetch'
import StoreContext from '../hooks/storeContext'
import { addToCart } from '../redux/cartReducer'
import { useDispatch } from 'react-redux'
function Products() {


  const {filter}=useContext(StoreContext)
 const dispatch=useDispatch()
  
    const [products,setProducts]=useState([]) 
  
    const {data,loading,error}=useFetch(filter)

    useEffect(()=>{
        {data&& setProducts(data)} 
     
  
},[data])
  
 
  return (<>
    <div className={`flex-wrap flex gap-[15px] justify-center`}>

{loading  
?"loading..."
 :products.map((product) => (
  <div key={product.id}  >
  <div  className=' relative overflow-hidden group font-serif'>
    <h1 className='text-white'>{product.attributes.Title}</h1>
    
    <div className='font-bold text-[22px] rounded-md text-white absolute right-0 bg-red-950 p-[5px]'>{product.attributes.price}</div> 
    <img className='w-[100%] cursor-pointer rounded-[15px] ' src={`http://localhost:1337${product.attributes.image.data.attributes.url}`} alt={product.attributes.Title} />
    <div className='transition-all duration-[40ms]  text-white p-[15px] bg-[rgba(0,0,0,0.8)] bottom-[-100] w-[100%] font-[3px]   absolute group-hover:bottom-0 '>{product.attributes.Desc}</div> 
    
   
    </div> 
    
    <button className=" block text-white  font-serif" onClick={()=>{
  
    
    dispatch(addToCart({
      id:product.id,
      Title:product.attributes.Title,
      Desc:product.attributes.Desc,
      price:product.attributes.price,
      image:product.attributes.image.data.attributes.url,


    }

    ))}}>add to cart</button>
     </div>  
      
))}
 
    </div>
    
    </>
  )
}

export default Products