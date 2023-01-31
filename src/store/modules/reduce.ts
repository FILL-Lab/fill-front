import { createSlice } from "@reduxjs/toolkit";
import { walletState } from "../../type";

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

export default walletSlice.reducer;
