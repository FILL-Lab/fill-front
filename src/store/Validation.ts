import Valid from '@/server/Validation_metadata.json';
import {ValidationContract } from '../app_contants'
import Web3 from 'web3';

const web3 = new Web3(window.ethereum);

class Validation {
     contractAbi: any;
    contractAddress: string;
    myContract: any;

 constructor() {
        this.contractAbi = JSON.parse(JSON.stringify(Valid.output.abi));
        this.contractAddress = ValidationContract;
        this.myContract = new web3.eth.Contract(this.contractAbi, this.contractAddress);
    }



    getSigningMsg(type: string) {
        console.log('===2', type)
        //const showValue = web3.utils.hexToBytes(type)
        this.myContract.methods.getSigningMsg(type).call({},(err: any, res: any) => { 
            console.log('--getSigningMsg--3,res',err,res)
        }).on('receipt', (data: any) => {
             console.log('getSigningMsg success', data)
            }).on('error', (err:any,res:any) => { 
                console.log('==getSigningMsg====error======444',err,res)
            })
    }

   

}

const validation = new Validation();
export default validation;