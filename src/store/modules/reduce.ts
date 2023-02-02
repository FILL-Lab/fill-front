import { createSlice } from "@reduxjs/toolkit";
import { walletState,contractState, creditState } from "@/type";



 const walletSlice = createSlice({
  name: "wallet",
    initialState: {
        show: false,
  },
  reducers: {
      change: (state: walletState, action: any) => {
        let newState = { ...state, ...action.payload }
          localStorage.setItem('login', JSON.stringify({result:newState.result,wallet:newState.wallet}))
        return newState;
    },
  },
 });



const contractSlice = createSlice({
    name: 'contract',
    initialState: {
      account: '0x5C045CFAfE8387a98eccaCAcCd24b852E95624Ee',
      FIL: '',
      FLE: "",
      loading:false,
      minerList: [],
        borrowList:[]
    },
    reducers: {
        change: (state:contractState, action) => {
            return { ...state, ...action.payload }
        },
      
    }
})





 const walletReducer = walletSlice.reducer;
const contractReducer = contractSlice.reducer;


export  {walletReducer,contractReducer}