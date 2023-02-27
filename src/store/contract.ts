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
//import { ethers } from 'ethers';

const web3 = new Web3(window.ethereum);
//const request= util.promisify(requests);
   // const provider = new ethers.providers.Web3Provider(window.ethereum)
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
             //   const signer = provider.getSigner()
        // this.contractAbi = JSON.parse(JSON.stringify(Fill.abi));
        // this.contractAddress = '0x75AfF4881B535a5a363157ba7dBDA68f31EB9e25';

        this.contractAbi = JSON.parse(JSON.stringify(Fill1.output.abi));
        this.contractAddress = MarketPlaceContract;
        this.myContract = new web3.eth.Contract(this.contractAbi, this.contractAddress);
        //this.myContract_e=  new ethers.Contract(this.contractAddress,this.contractAbi,signer)

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
                                    console.log('FLE====3',err)
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
     async access(value: string | number, type: string) { 
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
    


    // stakingMiner
   async stakingMiner(miner: string) { 
          this.myContract.methods.stakingMiner(miner).send({from: this.account},(err: any, res: any) => {
             if (err) { 
                console.log(err)
                throw new Error(err);
            }
            }).on('receipt', (data: any) => {
                console.log('receipt stakingMiner success', data)
                notification.open({
                message: "",
                description: `Successfully Staking Miner`,
                duration: 10,
                className: "app-notic",
            });
            }).on('error', (err:any,res:any) => { 
                console.log('==stakingMiner====error======444',err,res)
            })

    }

    // borrow or payback
    async borrowPay(type: string, payloadList: Array<any>, repayNum: number | BigNumber) { 
       
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
    bindMiner(minerAddr: string, signature: string) { 
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
            }).on('error', (err: any, res: any) => { 
                                throw new Error(err);

            })
     }
    // unbind miner
    unbindMiner(minerAddr:string) { 
        this.myContract.methods.unbindMiner(minerAddr).send({ from: this.account,},(err: any, res: any) => {
             if (err) { 
                    console.log(err)
               // resolve(true);
                throw new Error(err);
            }
            }).on('receipt', (data: any) => {
             console.log('unbindMiner receipt success', data)
            }).on('error', (err:any,res:any) => { 
             throw new Error(err);
            })
    }
   

    // all borrow and miner
     getMinerBorrow() { 
        //let promiseArray: Array<any> = [];
         this.minerList = [];
        const acc = this.account;
         this.myContract.methods.userBorrows(acc).call(async (err: any, res: any) => { 
             console.log('miner---', res)
             if (!err) { 
                const minerList =[]
                 for (const item of res) { 
                     let isPayback = false;
                     if (item.borrows && item.borrows.length > 0) { 
                         for (const itemBorrw of item.borrows) {
                             if (!itemBorrw.isPayback) {
                                 const obj = { ...itemBorrw }
                                 const addrHex = item.minerAddr;
                                 const newAdree = fa.newAddress(0, utils.arrayify(utils.hexStripZeros(addrHex)));
                                 const filBalance = await this.callRpc("Filecoin.WalletBalance", [newAdree.toString()]);
                                 obj.balanceData = filBalance;
                                 obj.miner_f = newAdree.toString();
                                 minerList.push(obj)
                             } else { 
                                 isPayback= true
                             }
                         }
                         
                     }
                     if (!isPayback) { 
                        const obj = {...item}
                        const addrHex = item.minerAddr;
                        const newAdree = fa.newAddress(0, utils.arrayify(utils.hexStripZeros(addrHex)));
                        const filBalance = await this.callRpc("Filecoin.WalletBalance", [newAdree.toString()]); 
                        obj.balanceData = filBalance;
                         obj.miner_f = newAdree.toString();
                    minerList.push(obj)
                                    }
                            }
                 
                 this.minerList = minerList;
                   store.dispatch({
                    type: 'contract/change',
                    payload: {
                        minerList: this.minerList,
                        borrowList:[]
                    }
                })
             
               
            }
        })
     }
    

    allBalance() { 
        this.myContract.methods.allBorrows().call(async (err: any, res: any) => { 
               if (!err) { 
                   const myBorrowList = []
                   const myMinerList = Object.keys(this.minerList) || [];
                   
                   if (myMinerList.length > 0) { 
                       for (const mine of myMinerList) { 
                        //    if(mine  ===  )
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
                       }
                
                store.dispatch({
                    type: 'contract/change',
                    payload: {
                        minerList: this.minerList,
                        borrowList:myBorrowList
                    }
                })
                   } 
              
            }
        })
    }


    contractBalance() { 
        web3.eth.getBalance(this.contractAddress).then((res: any) => { 
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