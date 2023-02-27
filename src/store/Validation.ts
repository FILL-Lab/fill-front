import Valid from '@/server/Validation_metadata.json';
import { ValidationContract } from '../app_contants'
import { ethers } from 'ethers';

import Web3 from 'web3';
import { sign } from 'crypto';
import { notification } from 'antd';

const web3 = new Web3(window.ethereum);
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner()

class Validation {
    [x: string]: any;
     contractAbi: any;
    contractAddress: string;
    myContract: any;

 constructor() {
        this.contractAbi = JSON.parse(JSON.stringify(Valid.output.abi));
        this.contractAddress = ValidationContract;
     this.myContract_we = new web3.eth.Contract(this.contractAbi, this.contractAddress);
     this.myContract =  new ethers.Contract(this.contractAddress,this.contractAbi,signer)

    }



   async getSigningMsg(type: string) {
       const result = await this.myContract.callStatic.getSigningMsg(type);
       if (result) { 
              notification.open({
                message: "",
                description: `please enter `,
                duration: 10,
                className: "app-notic",
            });
       }
    
   }
}

const validation = new Validation();
export default validation;