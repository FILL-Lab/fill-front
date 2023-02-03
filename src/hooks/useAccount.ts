import { rootState } from "@/type";
import { useEffect, useState } from "react"
import { shallowEqual, useSelector } from "react-redux";

export const useAccount = () => { 
  const wallet = useSelector((state: rootState) => state?.wallet, shallowEqual);
    
    const [account,setAccount] =useState('')
    useEffect(() => {
    if (wallet.result && wallet.result.length > 0) {
      setAccount(wallet?.result[0]);
    } else {
      setAccount("");
    }
  }, [wallet]);
    return account
}