/** @format */

import { Divider, Input, Modal } from "antd";
import { useState } from "react";
import Calc from "@/components/calc";
export default () => {
  const [show, setShow] = useState(true);

  const handleConfirm = () => {
    console.log("handleConfirm");
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
            className='app-input app-inputNumber access-input'
            placeholder='Enter the amount you want to lend'
          />
          <p className='detail'>
            <Calc />
            <span> Max：1000.0000 FIL</span>
          </p>
        </div>
      </Modal>
    </>
  );
};
