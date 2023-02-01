import { configureStore } from '@reduxjs/toolkit';
import userReducer from './login';
import { walletReducer,contractReducer} from './reduce'
export default configureStore({
    reducer:{
        user: userReducer,
        wallet: walletReducer,
        contract:contractReducer
    }
})