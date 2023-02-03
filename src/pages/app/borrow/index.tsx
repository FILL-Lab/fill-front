/** @format */
import { Button, Tooltip } from "antd";
import { useEffect, useMemo, useState } from "react";
import NoData from "@/components/NoData";
import { useSelector, shallowEqual } from "react-redux";
import { rootState } from "@/type";
import { getAccount, getObligation, getValueDivide } from "@/utils";
import Credit from "./Credit";
import { useInterval } from "@/hooks/Interval";
import Contract from "@/store/contract";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { text } from "stream/consumers";

export default () => {
  const wallet = useSelector((state: rootState) => state?.wallet, shallowEqual);
  const intervalList: NodeJS.Timer[] = [];
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
    if (account) {
      Contract.getMinerBorrow();
    }
  }, [account]);

  useEffect(() => {
    if (contract.borrowList && borrowList.length > 0) {
      const data: any = [];
      contract.borrowList.forEach((minerData: any) => {
        const timer =
          Math.trunc(new Date().getTime() / 1000) - minerData.borrowTime;
        //console.log("-timer---3", minerData);
        const obj = {
          miner: minerData.minerAddr,
          miner_f: minerData.miner_f,
          credit: getValueDivide(minerData?.balanceData?.result),
          Obligation: getObligation(
            minerData.amount,
            Contract.getRate(),
            timer
          ),
          balanceData: minerData?.balanceData,
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
    return () => {
      if (intervalList && intervalList.length > 0) {
        intervalList.forEach((intervalListItem) => {
          clearInterval(intervalListItem);
        });
      }
    };
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
      unit: "FIL",
    },
    {
      key: "Obligation",
      label: (
        <span>
          Obligation
          <Tooltip title='Principal + Interest Accrued'>
            <ExclamationCircleOutlined className='tip-icon' />
          </Tooltip>
        </span>
      ),
      width: "25%",
      unit: "FIL",
      render: (text?: string, record?: any, index?: number) => {
        //const value = getObligation(record.credit);
        let showtext = text;
        let key = `Obligation_${index}`;
        //  console.log("====3", showtext);
        return <span id={key}>{calcNum(record, key)}</span>;
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
                setTitle("Repayment");
                setRecord(record);
              }}>
              Repay
            </Button>
          </div>
        );
      },
    },
  ];

  const calcNum = (record: any, key: string) => {
    let text = record.Obligation || "";
    const timer = setInterval(() => {
      const time = Math.trunc(new Date().getTime() / 1000) - record.borrowTime;
      text = getObligation(record.amount, Contract.getRate(), time);
      const dom = document.getElementById(key);
      if (dom) {
        dom.innerText = text;
      }
    }, 3000);
    intervalList.push(timer);
    return text;
  };

  return (
    <div className='tabs-list app-card borrow-card'>
      <div className='title'>Borrow / Repay</div>
      {account ? (
        <div className='account-count'>
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
                              dataItem,
                              index
                            )
                          : dataItem[headerItem.key]}
                        {headerItem.unit && (
                          <span className='unit'>{headerItem.unit}</span>
                        )}
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
