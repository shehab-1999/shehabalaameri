import { useState,useEffect, Fragment} from 'react'
import { useFetch } from '../hooks/useFetch'
import Check from './check'
import Checkbox from './Checkbox'


function Cateogaries() {
 
    const [cateogaries,setCateogaries]=useState([]) 
    const {data,loading,}=useFetch("/cateogaries?populate=*")

    useEffect(()=>{
        {data&& setCateogaries(data)} 
       
  
},[data])
  
  return (
    <div className='font-serif'>

{loading
?"loading..."
 :cateogaries.map(cateogary=> (
  
    <Fragment key={cateogary.id}>

    <Checkbox category={cateogary}/>
    </Fragment>
   
     
      
))}

    </div>
  )
}

export default Cateogaries