


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
          console.log('=====333',res)
           resove(res)   
        });
     })
      
    }
}

export {loginMarck}
