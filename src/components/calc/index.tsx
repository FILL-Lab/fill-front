/** @format */

import { CalculatorFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import { Input, Modal, Tooltip } from "antd";
import Contract from "@/store/contract";
import { useState } from "react";
import "./style.scss";
import { calcTerm, getObligation, getValueMultiplied } from "@/utils";
export default () => {
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [calcNum, setCalcNum] = useState<string>("");

  const calcList = [
    {
      key: "APR",
      title: (
        <span>
          APR
          <Tooltip title='Interest is compound continuously'>
            <ExclamationCircleOutlined className='tip-icon' />
          </Tooltip>
        </span>
      ),
      value: Contract.getRate() * 100,
      tip: "nterest is compound continuously",
    },
    {
      key: "amount",
      title: "Principal Amount",
      type: "Input",
    },
    {
      key: "term",
      title: "Borrowing Term",
      type: "Input",
      unit: "day",
    },
    {
      key: "Amount",
      title: (
        <span>
          Total Obligation
          <Tooltip title='Principal + Interest'>
            <ExclamationCircleOutlined className='tip-icon' />
          </Tooltip>
        </span>
      ),
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
                {item.type !== "Input" ? (
                  <span className='app-input calc-input value'>
                    {item.value || calcNum}
                  </span>
                ) : (
                  <div className='value-input '>
                    <Input
                      className='app-input  calc-input'
                      onChange={(e) => {
                        // setAmount(e.target.value);
                        if (item.key === "amount") {
                          setAmount(e.target.value);
                        } else {
                          setTerm(e.target.value);
                        }
                        const amountValue =
                          item.key === "amount"
                            ? Number(getValueMultiplied(Number(e.target.value)))
                            : Number(getValueMultiplied(Number(amount)));
                        const termValue =
                          item.key === "term"
                            ? calcTerm(e.target.value)
                            : calcTerm(term);
                        setCalcNum(
                          getObligation(
                            amountValue,
                            Contract.getRate(),
                            termValue
                          )
                        );
                      }}
                    />
                    {item.unit && <span className='unit'>{item.unit}</span>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
};
