/** @format */

import { CalculatorFilled } from "@ant-design/icons";
import { Input, Modal } from "antd";
import Contract from "@/store/contract";
import { useState } from "react";
import "./style.scss";
import { getObligation, getValueMultiplied } from "@/utils";
export default () => {
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState("");
  const [calcNum, setCalcNum] = useState("");

  const calcList = [
    {
      key: "APR",
      title: "APR",
      value: Contract.getRate() * 100,
      tip: "nterest is compound continuously",
    },
    {
      key: "term",
      title: "Borrowing Term",
    },
    {
      key: "amount",
      title: "Principal Amount",
    },
    {
      key: "Amount",
      title: "Total Obligation",
      tip: "Principal + Interest",
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
        title='Borrowing Interset Calculator'
        footer={null}
        onCancel={() => {
          setShow(false);
        }}>
        <div className='calc-content'>
          {calcList.map((item) => {
            return (
              <div className='calc-item' key={item.key}>
                <span className='title'>{item.title}</span>
                {item.key !== "term" ? (
                  <span className='app-input calc-input value'>
                    {item.value || calcNum}
                  </span>
                ) : (
                  <Input
                    className='app-input calc-input'
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setCalcNum(
                        getObligation(
                          Number(getValueMultiplied(Number(e.target.value))),
                          Contract.getRate(),
                          1
                        )
                      );
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
};
