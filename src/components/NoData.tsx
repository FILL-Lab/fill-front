/** @format */

import { useDispatch } from "react-redux";

//没有登录wallet
export default () => {
  const dispath = useDispatch();
  return (
    <div className='wallet-content'>
      <div className='text'>Please connect your wallet</div>
      <div
        className='connect-btn'
        onClick={() => {
          dispath({
            type: "wallet/change",
            payload: { show: true },
          });
        }}>
        Connect Wallet
      </div>
    </div>
  );
};
