import { getValueDivide } from '@/utils';
import { resolve } from 'path/posix';
import Web3 from 'web3';
import { balancesList, MarketPlaceContract } from '../app_contants';
import Fill from '../server/FILL.json'

const web3 = new Web3(window.ethereum);
class contract {
    contractAbi: any;
    contractAddress: string;
    myContract: any;
    account: string ='';
    accountBalance: string | undefined;
    constructor() {
        this.contractAbi = JSON.parse(JSON.stringify(Fill.abi));
        this.contractAddress = MarketPlaceContract || '0x52D32b00DFd3844e090A4540e108bbc20f476a1F';
        this.myContract = new web3.eth.Contract(this.contractAbi, this.contractAddress);
    }

   

    getAccountBalance() {
        return this.accountBalance
    }
    // get banlance
     getBalance(acc: string) {
        this.account = acc ;
        let promiseArray: Array<any> = [];
        for (const balancesItem of balancesList) {
            switch (balancesItem.key) {
                case 'FLE':
                    promiseArray.push(
                        new Promise((resolve) => {
                            this.myContract.methods.fleBalanceOf(this.account).call((err: any, res: any) => {
                                if (!err) {
                                    resolve(res)
                                } else {
                                    return 'error'
                                }
                                
                            });
                        }))
                    break;
                case 'FIL':
                     promiseArray.push(
                        new Promise((resolve) => {
                            web3.eth.getBalance(this.account).then((res) => { 
                                const balance = getValueDivide(Number(res), 18)
                                this.accountBalance= balance;
                                resolve(balance)
                            })
                        }))
                    break;

             
            }
        }
        if (promiseArray.length) { 
            return new Promise((resolve, reject) => {
                 Promise.all(promiseArray).then(res => { 
               console.log('====2', res)
               resolve (res)
            })
             })  
        }
     }
    
    async setDeposit (value: number | string) {
        console.log('===223',this.account)
        this.myContract.methods.deposit(Number(1*Math.pow(10,9))).send({
            from: this.account,
            value:Number(1*Math.pow(10,9))
        }).on('receipt', (data:any) => {
            console.log('====2=22',data)
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