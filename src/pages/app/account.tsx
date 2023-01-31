/** @format */

import Contract from "@/store/contract";
import { useEffect, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { rootState } from "@/type";
import { balancesList } from "@/app_contants";

export default () => {
  const wallet = useSelector((state: rootState) => state?.wallet, shallowEqual);
  const [balance, setBalance] = useState<{
    FIL: string | undefined;
    FLE: string;
  }>({
    FIL: "0",
    FLE: "0",
  });
  useEffect(() => {
    const account = wallet?.result && wallet.result[0];
    if (account) {
      Contract.getBalance(account)?.then((res: any) => {
        if (res && res.length > 0) {
          setBalance({ FIL: res[0], FLE: res[1] });
        }
      });
    }
  }, [wallet.result]);
  return (
    <div className='account-card app-card'>
      <h3 className='title'>My account</h3>
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
