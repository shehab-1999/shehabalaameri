import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products:[]
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state,action) => { 
        const product=state.products.find(item=>item.id===action.payload.id)
           !product && state.products.push(action.payload)
    
    },
    removeFromCart:(state,action)=>{
        state.products=state.products.filter(item=>item.id!==action.payload.id)
    },
    resetCart:(state)=>{
state.products=[]
    }
   
  },
})



export const {addToCart,removeFromCart,resetCart } = cartSlice.actions

export default cartSlice.reducer


