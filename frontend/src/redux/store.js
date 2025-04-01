import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/CartReducer';

export const store = configureStore({
    reducer:{
        cart: cartReducer
    },

});