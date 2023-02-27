/** @format */

import { Input, Modal } from "antd";
import { useMemo, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import Calc from "@/components/calc";
import Contract from "@/store/contract";
import { getValueMultiplied } from "@/utils";
import { shallowEqual, useSelector } from "react-redux";
import { rootState } from "@/type";

interface Props {
  show: boolean;
  title: string;
  record: Record<string, any>;
  onChange: (bool: boolean) => void;
}

export default (props: Props) => {
  const contract = useSelector(
    (state: rootState) => state?.contract,
    shallowEqual
  );

  const { show, onChange, title, record } = props;
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [all, setAll] = useState(false);

  const { contractBalance = 0, contractBalanceRes = 0 } = useMemo(() => {
    return {
      contractBalance: contract?.contractBalance,
      contractBalanceRes: contract?.contractBalanceRes,
    };
  }, [contract?.contractBalance, contract?.contractBalanceRes]);

  // const balance =
  const handleConfirm = async () => {
    if (!loading) {
      setLoading(true);
      const type = title === "Repayment" ? "payback" : "borrow";
      // 借
      const payloadList =
        title === "Repayment"
          ? [record.miner, record.borrowId]
          : [
              record.miner,
              all
                ? record.balanceData.result > contractBalanceRes
                  ? contractBalanceRes
                  : record.balanceData.result
                : getValueMultiplied(Number(value)),
              0.05 * Math.pow(10, 6),
              1 * Math.pow(10, 6),
            ];
      Contract.borrowPay(type, payloadList, record.Obligation).then((res) => {
        setLoading(false);
        onChange(false);
        setValue("");
        setAll(false);
      });
    }
  };
  return (
    <>
      <Modal
        width={600}
        onCancel={() => {
          if (!loading) {
            onChange(false);
            setValue("");
            setAll(false);
          }
        }}
        wrapClassName='app-modal-wrap access-modal borrow-modal'
        title={title}
        footer={
          <>
            <div
              className='connect-btn'
              onClick={() => {
                if (!loading) {
                  onChange(false);
                  setValue("");
                  setAll(false);
                }
              }}>
              cancel
            </div>
            <div className='connect-btn confirm-btn' onClick={handleConfirm}>
              {loading ? <LoadingOutlined /> : "confirm"}
            </div>
          </>
        }
        open={show}>
        <div className='modal-content'>
          {title === "Credit line" && <div>Borrowing amount:</div>}
          <div className='input-value-content'>
            <Input
              value={value}
              onChange={(e) => {
                setAll(false);
                setValue(e.target.value);
              }}
              className='app-input app-inputNumber access-input'
              placeholder={
                title === "Repayment"
                  ? "Enter the amount of FIL to repay"
                  : "Enter the amount of FIL to borrow"
              }
            />
            <span
              className='unit'
              onClick={() => {
                const value =
                  title === "Repayment"
                    ? record.Obligation
                    : contractBalance && contractBalance > record?.credit
                    ? record?.credit
                    : contractBalance;
                setValue(value);
                setAll(true);
              }}>
              {title === "Repayment" ? "Repay" : "Borrow"} all
            </span>
          </div>

          <p className='detail'>
            {title === "Credit line" && <Calc />}
            {title === "Credit line" ? (
              <span>
                Max:
                {contractBalance && contractBalance > record?.credit
                  ? record?.credit
                  : contractBalance}{" "}
                FIL
              </span>
            ) : (
              <span>Pending repayment:{record.Obligation} FIL</span>
            )}
          </p>
        </div>
      </Modal>
    </>
  );
};
