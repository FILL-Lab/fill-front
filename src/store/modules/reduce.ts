import { createSlice } from "@reduxjs/toolkit";
import { getValueDivide } from '@/utils';import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import { balancesList, MarketPlaceContract } from '@/app_contants';
import Fill from '@/server/FILL.json'
import { walletState,contractState } from "@/type";

const web3 = new Web3(window.ethereum);


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
        loading:false
    },
    reducers: {
        change: (state:contractState, action) => {
          //  console.log('==============3',state,action)
            return { ...state, ...action.payload }
        },
      
    }
})

 const walletReducer = walletSlice.reducer;
 const contractReducer = contractSlice.reducer;


export  {walletReducer,contractReducer}