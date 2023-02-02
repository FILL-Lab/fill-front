/** @format */

import { Input, Modal } from "antd";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import Calc from "@/components/calc";
import Contract from "@/store/contract";
import { getValueMultiplied } from "@/utils";

interface Props {
  show: boolean;
  title: string;
  record: Record<string, any>;
  onChange: (bool: boolean) => void;
}

export default (props: Props) => {
  const { show, onChange, title, record } = props;
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  // const balance =
  const handleConfirm = () => {
    if (!loading) {
      setLoading(true);
      const type = title === "Repayment" ? "payback" : "borrow";
      // 借
      const payloadList =
        title === "Repayment"
          ? [record.miner, record.borrowId]
          : [
              record.miner,
              Number(getValueMultiplied(Number(value))),
              0.05 * Math.pow(10, 6),
              1 * Math.pow(10, 6),
            ];
      Contract.borrowPay(type, payloadList).then((res) => {
        setLoading(false);
        onChange(false);
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
          }
        }}
        wrapClassName='app-modal-wrap access-modal'
        title={title}
        footer={
          <>
            <div
              className='connect-btn'
              onClick={() => {
                if (!loading) {
                  onChange(false);
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

          <Input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className='app-input app-inputNumber access-input'
            placeholder={
              title === "Repayment"
                ? "Enter the amount of FIL to repay"
                : "Enter the amount of FIL to borrow"
            }
          />
          <p className='detail'>
            {title === "Credit line" && <Calc />}
            {title === "Credit line" ? (
              <span> Max:{record?.credit} FIL</span>
            ) : (
              <span>Pending repayment:{record?.credit} FIL</span>
            )}
          </p>
        </div>
      </Modal>
    </>
  );
};
