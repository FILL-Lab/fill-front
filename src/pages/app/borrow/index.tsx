/** @format */
import { Button, Tabs } from "antd";
import { useMemo, useState } from "react";
import { accessList, borrowList } from "@/app_contants";
import NoData from "@/components/NoData";
import { useSelector, shallowEqual } from "react-redux";
import { rootState } from "@/type";
import { getAccount } from "@/utils";
import Credit from "./Credit";

const data: Record<string, any> = [
  {
    miner: "f02438",
    credit: "100",
    Obligation: "1",
  },
];

export default () => {
  const wallet = useSelector((state: rootState) => state?.wallet, shallowEqual);
  const account = useMemo(() => {
    return getAccount(wallet);
  }, [wallet?.result]);

  const [show, setShow] = useState(false);
  const [showTitle, setTitle] = useState("");
  const handleChange = (bool: boolean) => {
    setShow(bool);
  };

  const edit = {
    key: "edit",
    width: "30%",
    label: "",
    render: () => {
      return (
        <div className='edit'>
          <Button
            className='fill-btn'
            onClick={() => {
              setShow(true);
              setTitle("Credit line");
            }}>
            Brrow
          </Button>
          <Button
            className='fill-btn-border'
            onClick={() => {
              setShow(true);
              setTitle("Obligation");
            }}>
            Repay
          </Button>
        </div>
      );
    },
  };

  return (
    <div className='tabs-list app-card borrow-card'>
      <div className='title'>Borrow / Repay</div>
      {account ? (
        <div>
          <div className='borrow-content-header'>
            {borrowList.map((item) => {
              return (
                <div
                  className='header-item'
                  key={item.key}
                  style={{ width: item.width }}>
                  {item.label}
                </div>
              );
            })}
          </div>
          <div className='borrow-content'>
            {data.map((dataItem: any, index: number) => {
              return (
                <div className='content-item' key={index}>
                  {[...borrowList, edit].map((headerItem) => {
                    return (
                      <div
                        key={headerItem.key + index}
                        className='content-item-value'
                        style={{ width: headerItem?.width }}>
                        {headerItem?.render
                          ? headerItem?.render()
                          : dataItem[headerItem.key]}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <NoData />
      )}
      {account && <div className='miner-btn'>Add Miner</div>}
      <Credit show={show} onChange={handleChange} title={showTitle} />
    </div>
  );
};
