


// 链接钱包
import Web3 from 'web3';
import Fill from '../server/FILL.json'


// 登录
const loginMarck = () => { 
if (!window.ethereum) {
      //未下载钱包 下载钱包 链接钱包
      window.open(`https://metamask.io/`);
    } else {
      // 链接钱包
    return new Promise((resove, reject) => {
        window?.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res: any) => {  
           resove(res)   
        });
     })
      
    }
}


const send = async () =>{
      const web3 = new Web3(window.ethereum);
     // ethereum.enable()
      //获取地址
      let accounts = await web3.eth.getAccounts();
      console.log('=====3333',accounts)
      let account = accounts[0];
      console.log("地址:"+account)
      // 返回指定地址账户的余额
      let balance = await web3.eth.getBalance(account);
      console.log("账户余额:"+balance)
        let contractAbi  = JSON.parse(JSON.stringify(Fill.abi));
      let contractAddress = '0x52D32b00DFd3844e090A4540e108bbc20f476a1F'
      let myContract = new web3.eth.Contract(contractAbi, contractAddress)
    let a = 1000000



    
    // myContract.getPastEvents('Deposit', {
    //     filter: {}, fromBlock: 0, toBlock: 'latest' }).then((res) => {
    //         console.log('=4444====',res)
    //     })
    
      myContract.methods.fleBalanceOf(account).call((error: any, transactionHash: any)=> {
        if (!error) {
            console.log('transactionHash is ---' + transactionHash);
        } else {
            console.log('==111223==333',error);
        }
      })
    
    myContract.methods.deposit(1000).send({from:account,gas:3000000,value:1000}, (error: any, transactionHash: any)=> {
        if (!error) {
            console.log('deposit is ---' + transactionHash);
        } else {
            console.log('==111223=deposit=333',error);
        }
    })
       
   
    
      

    //   let toAddress = document?.getElementById("toAddress")?.value ||'';
    //   console.log("转账地址:"+toAddress)
    //   myContract.methods.transfer(toAddress, 1 * a,).send({from: account}, function(error: any, transactionHash: string){
    //     if(!error) {
    //       console.log('transactionHash is' + transactionHash);
    //     } else {
    //       console.log(error);
    //     }
    //   });
    } 


export {loginMarck }
