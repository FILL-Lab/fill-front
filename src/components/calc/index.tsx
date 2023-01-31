/** @format */

import { CalculatorFilled } from "@ant-design/icons";
import { Input, Modal } from "antd";
import { useState } from "react";
import "./style.scss";
export default () => {
  const [show, setShow] = useState(false);

  const calcList = [
    {
      key: "APR",
      title: "APR",
    },
    {
      key: "term",
      title: "Borrowing term",
    },
    {
      key: "Amount",
      title: "Repayment Amount",
    },
  ];
  return (
    <>
      <span className='calc-icon'>
        <CalculatorFilled
          onClick={() => {
            setShow(true);
          }}
        />
      </span>

      <Modal
        wrapClassName='app-modal-wrap'
        open={show}
        width={650}
        title='rate calculation'
        footer={null}
        onCancel={() => {
          setShow(false);
        }}>
        <div className='calc-content'>
          {calcList.map((item) => {
            return (
              <div className='calc-item'>
                <span className='title'>{item.title}</span>
                <Input className='app-input calc-input' />
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
};
