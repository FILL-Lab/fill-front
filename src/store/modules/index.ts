import { configureStore } from '@reduxjs/toolkit';
import userReducer from './login';
import  walletReducer from './reduce'
export default configureStore({
    reducer:{
        user: userReducer,
        wallet:walletReducer,
    }
})