/** @format */

import { Divider, Input, Modal } from "antd";
import { useState } from "react";
import Calc from "@/components/calc";
import Contract from "@/store/contract";
export default () => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");

  // const balance =
  const handleConfirm = () => {
    console.log("---2", value);
    console.log("handleConfirm");
    Contract.setDeposit(value);
  };
  return (
    <>
      <div
        className='connect-btn'
        onClick={() => {
          setShow(true);
        }}>
        confirm
      </div>
      <Modal
        width={600}
        onCancel={() => {
          setShow(false);
        }}
        wrapClassName='app-modal-wrap access-modal'
        title={"Credit line"}
        footer={
          <>
            <div
              className='connect-btn'
              onClick={() => {
                setShow(false);
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
          <div>Borrowing amount:</div>
          <Input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className='app-input app-inputNumber access-input'
            placeholder='Enter the amount you want to lend'
          />
          <p className='detail'>
            <Calc />
            <span> Max:0 FIL</span>
          </p>
        </div>
      </Modal>
    </>
  );
};
