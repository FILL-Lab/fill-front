/** @format */

import Contract from "@/store/contract";
import { rootState } from "@/type";
import { Input, notification } from "antd";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
export default ({ data }: { data: { key: string; label: string } }) => {
  const [value, setValue] = useState("");
  const dispath = useDispatch();
  const contract = useSelector(
    (state: rootState) => state?.contract,
    shallowEqual
  );

  const handleClick = () => {
    if (value && Number(value)) {
      Contract.access(value, data.key);
    }
  };

  return (
    <div className=' wallet-content access-content'>
      <div className='text'>
        <Input
          className='app-input'
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder={`Please enter the amount you want to ${data.key}`}
        />
        <span className='text-detail'>
          You will receive ~{" "}
          <span className='number'>
            {value ? Contract.getRate() * Number(value) : "000"}
          </span>{" "}
          {data.key === "deposit" ? "FLE" : "FIL"}
        </span>
      </div>
      <div className='connect-btn' onClick={handleClick}>
        confirm
      </div>
    </div>
  );
};
