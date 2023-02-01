/** @format */

import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { ITEM } from "./type";

export const MarketPlaceContract = process.env.REACT_MARKET_CONTRACT || "";

export const balancesList: Array<{
  key: "FIL" | "FLE";
  title: any;
  unit: string;
}> = [
  {
    title: "Balance",
    key: "FIL",
    unit: "FIL",
  },
  {
    key: "FLE",
    unit: "FLE",
    title: (
      <span>
        FLE Balance{" "}
        <Tooltip title='该资产为存入FIL后所获得的资产，可用户赎回FIL'>
          <ExclamationCircleOutlined className='icon' />
        </Tooltip>
      </span>
    ),
  },
];

export const itemsChart: Array<ITEM> = [
  {
    key: "1",
    label: `Utilization Rate`,
  },
  {
    key: "2",
    label: `FLE/FIL`,
  },
  {
    key: "3",
    label: `Interest Rate`,
  },
];

export const accessList: Array<ITEM> = [
  {
    key: "deposit",
    label: `Deposit`,
  },
  {
    key: "redeem",
    label: `Withdraw`,
  },
];

export const borrowList: Array<ITEM> = [
  {
    key: "miner",
    label: "Miner",
    width: "20%",
  },
  {
    key: "credit",
    label: "Credit line",
    width: "25%",
  },
  {
    key: "Obligation",
    label: "Obligation",
    width: "25%",
  },
];

export const walletList: Array<ITEM> = [
  {
    key: "metamask",
    label: "Metamask",
    link: "https://metamask.io/",
  },
];
