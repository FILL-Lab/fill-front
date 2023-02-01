/** @format */
import { Button, Divider, Popover } from "antd";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { rootState } from "@/type";
import { setStr } from "@/utils";
import "./style.scss";
export default () => {
  const wallet = useSelector((state: rootState) => state?.wallet, shallowEqual);

  const dispath = useDispatch();

  const connectWallet = () => {
    dispath({
      type: "wallet/change",
      payload: { show: true },
    });
  };

  const outContent = (
    <ul className='out-content'>
      <li className='out-item'>sign out</li>
    </ul>
  );

  return (
    <div className='app-header'>
      <div className='logo'>FILL</div>
      {wallet.wallet ? (
        <Popover content={outContent} overlayClassName='pop-wrap'>
          <Button
            type='primary'
            className='fill-btn-border'
            onClick={() => {
              dispath({
                type: "wallet/change",
                payload: { show: true, wallet: undefined, result: undefined },
              });
              localStorage.removeItem("wallet");
              window.location.reload();
            }}>
            {setStr(wallet.result[0])}
          </Button>
        </Popover>
      ) : (
        <Button className='fill-btn' onClick={connectWallet}>
          Connect Wallet
        </Button>
      )}
    </div>
  );
};
