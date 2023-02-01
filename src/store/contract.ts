import { getValueDivide, getValueMultiplied } from '@/utils';import Web3 from 'web3';
import { balancesList, MarketPlaceContract } from '@/app_contants';
import Fill from '@/server/FILL.json'
import store from './modules'
import { Button, notification } from 'antd';


const web3 = new Web3(window.ethereum);

class contract {
    contractAbi: any;
    contractAddress: string;
    myContract: any;
    account: string ='';
    accountBalance: string | undefined;
    rate: number;
    constructor() {
        this.contractAbi = JSON.parse(JSON.stringify(Fill.abi));
        this.contractAddress = MarketPlaceContract || '0x93990056eF7466eA8fDa44fbA728A9560425C10a';
        console.log('====22',this.contractAddress)
        this.myContract = new web3.eth.Contract(this.contractAbi, this.contractAddress);
        this.rate = 1
    }


    getRate() { 
        return this.rate;
    }
   

    getAccountBalance() {
        return this.accountBalance
    }
    // get banlance
     getBalance(acc: string,type?:string) {
        this.account = acc ;
         let promiseArray: Array<any> = [];
        for (const balancesItem of balancesList) {
            switch (balancesItem.key) {
                  case 'FIL':
                     promiseArray.push(
                        new Promise((resolve) => {
                            web3.eth.getBalance('0x5C045CFAfE8387a98eccaCAcCd24b852E95624Ee').then((res) => {
                                const balance = getValueDivide(Number(res), 18,4)
                                this.accountBalance = res;
                                 if (type === "FIL") { 
                                         store.dispatch({
                                            type: 'contract/change',
                                             payload: {FIL:balance}
                                        })
                                    }
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
                                    if (type === "FLE") { 
                                         store.dispatch({
                                            type: 'contract/change',
                                             payload: {FLE:fleBalance}
                                        })
                                    }
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
    
    //存取
    access(value: string | number, type: string) { 
        const number =getValueMultiplied(Number(value),18)
        this.myContract.methods[type](number,1,1).send({
            from: this.account,
            value:number
         },
            (err: any, res: any) => {
             if (!err) { 
               //this.DepositsBalance()
            }
         }) .on('receipt', (data: any) => {
             console.log('receipt success', data)
             // 存 或 取成功
             const typeStr = type === 'deposit' ? 'Deposit' : ''
             const returnValue = data.events[typeStr].returnValues;
             // 转变了多少的 FLE/FIL
             const value = getValueDivide(Number(returnValue[2]), 18)
                          console.log('----3', value,returnValue)
            notification.open({
                message: "",
                description: `Your deposit is completed, get ${value} FLE`,
                duration: null,
                className: "app-notic",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                });
             
            this.getBalance(this.account)
            
        })

    }
    
    DepositsBalance() { 
        this.myContract.methods.depositsBalance().call((err:any, res:any) => {
            console.log('=111===33333',err,res)
         })
    }
    


    
}
 

const Contract = new contract();
export default Contract;

// import abi from "../../../others/abi"

// export default {
//   methods: {
//     async onClickConnectWallet() {
//       const addresses = await window.ethereum.request({method: 'eth_requestAccounts'});
//       console.log("addresses: ", addresses)
//       const provider = new ethers.providers.Web3Provider(window.ethereum)
//       const r = await provider.send("eth_requestAccounts", []);
//       console.log("r: ", r);
//       const signer = provider.getSigner()
//       console.log("signer: ", signer);
//       const contractAddress = "0x284bE89DfADf491844354e6CA5844e366517bE24"
//       const contract = new ethers.Contract(contractAddress, abi, signer)
//       // const miners = await contract.getListMiners()
//       // console.log("miners: ", miners)
//       //
//       // const miner = await contract.getListMinerById("t1")
//       // console.log("miner: ", miner)

//       // const rr = await contract.confirmChangeOwnerToSpex("t2", "0x234", {
//       //   gasLimit: 10000000
//       // })
//       // console.log("rr: ", rr)


//       const rr = await contract.cancelList("t2", {
//         gasLimit: 10000000
//       })
//       console.log("rr: ", rr)
//     }
//   }
// }