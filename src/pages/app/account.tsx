/** @format */
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { spawn } from "child_process";

const balancesList = [
  {
    title: "Balance",
    value: "1000",
    key: "Balance",
  },
  {
    key: "FLE",
    title: (
      <span>
        FLE Balance{" "}
        <Tooltip title='该资产为存入FIL后所获得的资产，可用户赎回FIL'>
          <ExclamationCircleOutlined className='icon' />
        </Tooltip>
      </span>
    ),
    value: "200",
  },
];
export default () => {
  return (
    <div className='account-card'>
      <h3 className='title'>My account</h3>
      <div className='balance'>
        {balancesList.map((item) => {
          return (
            <div key={item.key} className='balance-item'>
              <div className='title-item'>
                {item.title} <span></span>{" "}
              </div>
              <div className='value'>{item.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
