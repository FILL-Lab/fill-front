

export class contract { }

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