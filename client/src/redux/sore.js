// import { configureStore } from '@reduxjs/toolkit'
// import cartReducer from './cartReducer'



// export const store = configureStore({
//     reducer: {
//       cart:cartReducer
//     },
//   })
  
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartReducer'

 import{
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
 }from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web



const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, cartReducer)

export  const store = configureStore({
    reducer: {
      cart:persistedReducer
    },
    middleware:(getDefualtMiddleware)=>
      getDefualtMiddleware({
        serializableCheck:{
        
       ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
        }
      })
  })
  


export let persistor = persistStore(store)

