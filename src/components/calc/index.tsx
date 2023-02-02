/** @format */

import { CalculatorFilled } from "@ant-design/icons";
import { Input, Modal } from "antd";
import Contract from "@/store/contract";
import { useEffect, useState } from "react";
import "./style.scss";
import { spawn } from "child_process";
export default () => {
  const [show, setShow] = useState(false);

  useEffect(() => {}, []);

  const calcList = [
    {
      key: "APR",
      title: "APR",
      value: Contract.getRate(),
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
              <div className='calc-item' key={item.key}>
                <span className='title'>{item.title}</span>
                {item.value ? (
                  <span className='app-input calc-input value'>
                    {item.value}
                  </span>
                ) : (
                  <Input className='app-input calc-input' />
                )}
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
};
