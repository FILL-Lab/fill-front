/** @format */
import { Button } from "antd";
import { useEffect, useMemo, useState } from "react";
import NoData from "@/components/NoData";
import { useSelector, shallowEqual } from "react-redux";
import { rootState } from "@/type";
import { getAccount, getObligation, getValueDivide } from "@/utils";
import Credit from "./Credit";
import { useInterval } from "@/hooks/Interval";

export default () => {
  const wallet = useSelector((state: rootState) => state?.wallet, shallowEqual);

  const contract = useSelector(
    (state: rootState) => state?.contract,
    shallowEqual
  );
  const [show, setShow] = useState(false);
  const [showTitle, setTitle] = useState("");
  const [minerList, setMinerList] = useState([]);
  const [record, setRecord] = useState({});

  const account = useMemo(() => {
    return getAccount(wallet);
  }, [wallet?.result]);

  useEffect(() => {
    if (contract.borrowList && borrowList.length > 0) {
      const data: any = [];
      contract.borrowList.forEach((minerData: any) => {
        const timer =
          Math.trunc(new Date().getTime() / 1000) - minerData.borrowTime;
        // console.log("-timer---3", minerData);
        const obj = {
          miner: minerData.minerAddr,
          miner_f: minerData.miner_f,
          credit: getValueDivide(minerData?.balanceData?.result),
          Obligation: getObligation(
            minerData.amount,
            minerData.interestRate,
            timer
          ),
          borrowTime: minerData.borrowTime,
          interestRate: minerData.interestRate,
          amount: minerData.amount,
          borrowId: minerData.id,
        };
        data.push(obj);
      });
      setMinerList(data);
    } else {
      setMinerList([]);
    }
  }, [contract.borrowList]);

  const handleChange = (bool: boolean) => {
    setShow(bool);
  };

  const borrowList = [
    {
      key: "miner_f",
      label: "Miner",
      width: "20%",
    },
    {
      key: "credit",
      label: "Credit line",
      width: "25%",
    },
    {
      key: "Obligation",
      label: "Obligation",
      width: "25%",
      render: (text?: string, record?: any) => {
        //  const value =getObligation(record.credit,)
        return <span>{text}</span>;
      },
    },
    {
      key: "edit",
      width: "30%",
      label: "",
      render: (text?: string, record?: any) => {
        return (
          <div className='edit'>
            <Button
              className='fill-btn'
              onClick={() => {
                setShow(true);
                setTitle("Credit line");
                setRecord(record);
              }}>
              Brrow
            </Button>
            <Button
              className='fill-btn-border'
              onClick={() => {
                setShow(true);
                setTitle("Obligation");
                setRecord(record);
              }}>
              Repay
            </Button>
          </div>
        );
      },
    },
  ];

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
            {minerList.map((dataItem: any, index: number) => {
              return (
                <div className='content-item' key={index}>
                  {borrowList.map((headerItem) => {
                    return (
                      <div
                        key={headerItem.key + index}
                        className='content-item-value'
                        style={{ width: headerItem?.width }}>
                        {headerItem?.render
                          ? headerItem?.render(
                              dataItem[headerItem.key],
                              dataItem
                            )
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
      <Credit
        show={show}
        onChange={handleChange}
        title={showTitle}
        record={record}
      />
    </div>
  );
};
