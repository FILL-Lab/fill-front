/** @format */

import Contract from "@/store/contract";
import { useEffect, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { rootState } from "@/type";
import { balancesList } from "@/app_contants";

export default () => {
  const wallet = useSelector((state: rootState) => state?.wallet, shallowEqual);
  const contract = useSelector(
    (state: rootState) => state?.contract,
    shallowEqual
  );
  const [balance, setBalance] = useState<{
    FIL: string | number;
    FLE: string | number;
  }>({
    FIL: "0",
    FLE: "0",
  });
  useEffect(() => {
    const account = wallet?.result && wallet.result[0];
    if (account) {
      Contract.getBalance(account);
    }
  }, [wallet.result]);

  useEffect(() => {
    setBalance({ FIL: contract.FIL, FLE: contract.FLE });
  }, [contract.FIL, contract.FLE]);
  return (
    <div className='account-card app-card'>
      <div className='title'>My account</div>
      <div className='balance'>
        {balancesList.map((item) => {
          return (
            <div key={item.key} className='balance-item'>
              <div className='title-item'>
                {item.title} <span></span>{" "}
              </div>
              <div className='value'>
                {balance[item.key]}
                <span className='value-unit'>{item.unit}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
