/** @format */
import { Modal } from "antd";
import { getSvg } from "@/svgTpes";
import { ITEM, rootState } from "@/type";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { walletList } from "@/app_contants";
import { loginMarck } from "@/store/server";

export default () => {
  const wallet = useSelector((state: rootState) => state?.wallet, shallowEqual);
  const dispath = useDispatch();

  const connectWallet = (wallet: ITEM) => {
    //连接钱包
    loginMarck()?.then((res) => {
      dispath({
        type: "wallet/change",
        payload: {
          show: false,
          wallet: wallet.key,
          result: res,
        },
      });
    });
  };
  return (
    <Modal
      open={wallet.show}
      wrapClassName='app-modal-wrap'
      title='Connect Wallet'
      footer={null}
      onCancel={() => {
        dispath({
          type: "wallet/change",
          payload: { show: false },
        });
      }}>
      {walletList.map((wallet) => {
        return (
          <p
            className='wallet-item'
            key={wallet.key}
            onClick={() => connectWallet(wallet)}>
            <span className='icon'>{getSvg(`wallect_${wallet.key}`)}</span>
            {wallet.label}
          </p>
        );
      })}
    </Modal>
  );
};
