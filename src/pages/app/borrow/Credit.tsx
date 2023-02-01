/** @format */

import { Button, Divider, Input, Modal } from "antd";
import { useState } from "react";
import Calc from "@/components/calc";
import Contract from "@/store/contract";
import { spawn } from "child_process";

interface Props {
  show: boolean;
  title: string;
  onChange: (bool: boolean) => void;
}

const objText = {
  "Credit line": {
    InputLabel: "Borrowing amount",
    InputPlace: "  Enter the amount you want to lend",
  },
  Obligation: {
    InputLabel: "",
    InputPlace: "Enter the amount you want to lend",
  },
};

export default (props: Props) => {
  const { show, onChange, title } = props;
  const [value, setValue] = useState("");

  // const balance =
  const handleConfirm = () => {
    console.log("handleConfirm");
  };
  return (
    <>
      <Modal
        width={600}
        onCancel={() => {
          onChange(false);
        }}
        wrapClassName='app-modal-wrap access-modal'
        title={title}
        footer={
          <>
            <div
              className='connect-btn'
              onClick={() => {
                onChange(false);
              }}>
              cancel
            </div>
            <div className='connect-btn confirm-btn' onClick={handleConfirm}>
              confirm
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
            placeholder='Enter the amount you want to lend'
          />
          <p className='detail'>
            {title === "Credit line" && <Calc />}
            {title === "Credit line" ? (
              <span> Max:0 FIL</span>
            ) : (
              <span>Pending repayment:1000.0000 FIL</span>
            )}
          </p>
        </div>
      </Modal>
    </>
  );
};
