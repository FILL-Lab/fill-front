import { getValueDivide, getValueMultiplied } from '@/utils';
import Web3 from 'web3';
import { balancesList, MarketPlaceContract } from '@/app_contants';
import Fill from '@/server/FILL.json'
import Fill1 from '@/server/FILL_metadata.json';

import store from './modules'
import { notification } from 'antd';
import { BigNumber, utils } from "ethers";
import axios from 'axios';
import fa from "@glif/filecoin-address";

const web3 = new Web3(window.ethereum);
//const request= util.promisify(requests);

class contract {
    contractAbi: any;
    contractAddress: string;
    myContract: any;
    account: string ='';
    accountBalance: string | undefined;
    rate: number|string|undefined;
    myBorrowList: Array<any> =[];
    minerList: Record<string,any> = {};
    constructor() {
        
        this.contractAbi = JSON.parse(JSON.stringify(Fill.abi));
        this.contractAddress = '0x75AfF4881B535a5a363157ba7dBDA68f31EB9e25';

        // this.contractAbi = JSON.parse(JSON.stringify(Fill1.output.abi));
        // this.contractAddress = MarketPlaceContract || '0x935b696978f479234A0dA1Fc2F2a724CE1aBE8A0';
        this.myContract = new web3.eth.Contract(this.contractAbi, this.contractAddress);
        this.getInterestRate();
        this.contractBalance();
    }


    getRate() { 
        return Number(this.rate);
    }
   

    getAccountBalance() {
        return this.accountBalance;
    }
    // get rate
    getInterestRate() { 
        this.myContract.methods.interestRate().call((err: any, res: any) => { 
            this.rate = getValueDivide(Number(res), 6)
        })
    }
    // get banlance 
     getBalance(acc: string,type?:string) {
         this.account = acc;
         let promiseArray: Array<any> = [];
        for (const balancesItem of balancesList) {
            switch (balancesItem.key) {
                  case 'FIL':
                     promiseArray.push(
                        new Promise((resolve) => {
                            web3.eth.getBalance(this.account).then((res) => {
                                const balance = getValueDivide(Number(res), 18, 4)
                                this.accountBalance = res;
                                store.dispatch({
                                            type: 'contract/change',
                                             payload: {FIL:balance}
                                        })
                                resolve(balance)
                            })
                        }))
                    break;
                case 'FLE':
                    promiseArray.push(
                        new Promise((resolve) => {
                            this.myContract.methods.fleBalanceOf(this.account).call((err: any, res: any) => {
                                if (!err) {
                                    const fleBalance = getValueDivide(Number(res), 18);
                                     store.dispatch({
                                            type: 'contract/change',
                                             payload: {FLE:fleBalance}
                                        })
                                    resolve(fleBalance)
                                } else {
                                    return 'error'
                                }
                                
                            });
                        }))
                    break;
              

             
            }
        }
        if (promiseArray.length && !type) { 
                Promise.all(promiseArray).then(res => { 
                    store.dispatch({
                        type: 'contract/change',
                        payload: {
                           FIL : res[0],
                            FLE:res[1]
                        }
                    })
            }) 
        }
     }
    
    //access or  redeem
     access(value: string | number, type: string) { 
         const number = getValueMultiplied(value, 18);
        const obj = type === 'deposit' ? {
            value:number
        } : {

        }
        return new Promise((resolve, reject) => { 
             this.myContract.methods[type](number,1,1).send({
                 from: this.account,
                 ...obj
         },
            (err: any, res: any) => {
                if (err) { 
                resolve(true);
                throw new Error(err);
            }
            }).on('receipt', (data: any) => {
             console.log('receipt success', data)
             // success
                const typeStr = type === 'deposit' ? 'Deposit' : 'Redeem';
                const notiStr = type === 'deposit' ? 'Deposit' : 'Redemption';
             const returnValue = data.events[typeStr].returnValues;
             // FLE/FIL
             const value = getValueDivide(Number(returnValue[2]), 18)
            notification.open({
                message: "",
                description: `${notiStr} is completed, ${value} ${type === 'deposit' ?'FLE received':'FIL withDrawn' }`,
                duration: 10,
                className: "app-notic",
            });
                setTimeout(() => {
             this.getBalance(this.account);
                 },3000)
             return resolve(true);

        })
        })
    }
    

    // borrow or payback
    borrowPay(type: string, payloadList: Array<any>,repayNum:number|BigNumber) {
        return new Promise((resolve, reject) => { 
        this.myContract.methods[type](...payloadList).send({
                 from: this.account,
        }, (err: any, res: any) => { 
            if (err) { 
                resolve(true);
                throw new Error(err);
            }
        }).on('receipt', (data: any) => {
             console.log('borrow receipt success', data)
             // success
             const typeStr = type === 'payback' ? 'Payback' : 'Borrow'
             const returnValue = data.events[typeStr].returnValues;
             //  FLE/FIL
             const value = getValueDivide(Number(returnValue[3]), 18)
            notification.open({
                message: "",
                description: `Successfully ${type === 'payback' ? `repaid ${repayNum}`:`borrowed ${value}`}  FIL`,
                duration: 10,
                className: "app-notic",
            });
            this.getMinerBorrow();
            this.contractBalance()
            return resolve(true)
        })
        })
     
    }
    

    // add miner
     bindMiner(minerAddr:string,signature:string) { 
         this.myContract.methods.bindMiner(minerAddr, signature).send({
              from: this.account,
         }, (err: any, res: any) => {
             if (err) { 
                    console.log(err)
               // resolve(true);
                throw new Error(err);
            }
            }).on('receipt', (data: any) => {
             console.log('receipt success', data)
            }).on('error', (err:any,res:any) => { 
                console.log('======error======444',err,res)
            })
    }
   

    // all borrow and miner
     getMinerBorrow() { 
        //let promiseArray: Array<any> = [];
         this.minerList = [];
        const acc = this.account;
        this.myContract.methods.userMiners(acc).call((err:any, res:any) => { 
            if (!err) { 
                res.forEach((item: string) => { 
                    if (item.startsWith('0x') && !item.endsWith('00') && item.length > 2) { 
                        // main miner
                        this.minerList[item] = {
                            show:true
                        }
                    }
                    this.allBalance();
                })
               
            }
        })
     }
    

    allBalance() { 
           this.myContract.methods.allBorrows().call( async (err:any, res:any) => { 
               if (!err) { 
                   const myBorrowList = []
                   // console.log('=====2allBalance',res)
                   for (const item of res) { 
                    const minerAdr = item.minerAddr;
                    if (this.minerList[minerAdr] && item.account.toLocaleLowerCase() === this.account && !item.isPayback) { 
                        const obj = {...item}
                        const addrHex = item.minerAddr;
                        const newAdree = fa.newAddress(0, utils.arrayify(utils.hexStripZeros(addrHex)));
                        const filBalance = await this.callRpc("Filecoin.WalletBalance", [newAdree.toString()]); 
                        obj.balanceData = filBalance;
                        obj.miner_f = newAdree.toString();
                         myBorrowList.push(obj)
                        }
                }
                store.dispatch({
                    type: 'contract/change',
                    payload: {
                        minerList: this.minerList,
                        borrowList:myBorrowList
                    }
                })
            }
        })
    }


    contractBalance() { 
        web3.eth.getBalance(this.contractAddress ).then((res:any) => { 
            if (res) { 
                store.dispatch({
                    type: 'contract/change',
                    payload: {
                        contractBalanceRes:res,
                        contractBalance: getValueDivide(Number(res), 18)
                    }
                })
            }
        })
    }

    async  callRpc(method:string, params: any) {
    const options = {
      method: "POST",
      url: 'https://api.hyperspace.node.glif.io/rpc/v1',
      headers: {
          "Content-Type": "application/json",
      },
      data: JSON.stringify({
        jsonrpc: "2.0",
        method: method,
        params: params,
        id: 1,
      }),
    };
        const res = await axios(options);
        return res.data;
  }


    
}
 

const Contract = new contract();
export default Contract;