/** @format */

import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { ITEM } from "./type";

export const MarketPlaceContract =
  process.env.REACT_MARKET_CONTRACT ||
  "0x8426ccfe6D9524742fc4755EF4E54B674543bD1E";
export const ValidationContract =
  process.env.REACT_MARKET_VALIDATION ||
  "0x715d890F377cDfE4eEFd4129dbAaF19e8b0e2Ea3";

export const balancesList: Array<{
  key: "FIL" | "FLE";
  title: any;
  unit: string;
}> = [
  {
    title: "FIL Balance",
    key: "FIL",
    unit: "FIL",
  },
  {
    key: "FLE",
    unit: "FLE",
    title: (
      <span>
        FLE Balance
        <Tooltip title='This asset is a deposit certificate, can be obtained by FIL deposit and used for FIL redemption '>
          <ExclamationCircleOutlined className='tip-icon' />
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
    label: `FIL/FLE`,
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

export const walletList: Array<ITEM> = [
  {
    key: "metamask",
    label: "Metamask",
    link: "https://metamask.io/",
  },
];
