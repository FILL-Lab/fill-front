import BigNumber from 'bignumber.js';
import { walletState } from './type';
  
export const setStr = (str: string) => { 
    return `${String(str).slice(0, 6)}...${String(
            str
          ).slice(-4)}`
}

const bignumberFormat = (num: BigNumber) => {
  return num.toFormat(1, { groupSeparator: '', decimalSeparator: '.' }).split('.')[0];
};

const bignumberToInt = (num: BigNumber) => {
  return Number(bignumberFormat(num));
};

export function getValueDivide(num: number,pow:number =18,unit:number=6 ) {
  let res = new BigNumber(num || 0).dividedBy(Math.pow(10, pow));
  return res.toFixed(unit);
}

export function getValueMultiplied(num: number,pow:number =18) {
  return new BigNumber(num).multipliedBy(Math.pow(10, pow));
}

export function getAccount(wallet:walletState) { 
    if (wallet.result) { 
        if (Array.isArray(wallet.result)) { 
            return wallet.result[0]
        }
    }
}



export function getObligation(amount: number, rate: number, timer: number|BigNumber) {
  const newTime = getTimes(timer);
  const tNum = BigNumber(rate * 100).multipliedBy(newTime);
  const numValue = BigNumber(amount).multipliedBy(BigNumber(Math.exp(Number(tNum.toString())))).dividedBy(Math.pow(10,18));
  return numValue.toFixed(6);
}
 

export function getTimes(time:number|BigNumber) { 
  return  BigNumber(time).dividedBy(BigNumber(365*864000))
}



export function calcTerm(time: number|string) {
  // time 是几天 ,返回xs
 return BigNumber(time).multipliedBy(86400)
 }