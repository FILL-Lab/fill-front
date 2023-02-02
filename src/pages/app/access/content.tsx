/** @format */

import Contract from "@/store/contract";
import { Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
export default ({ data }: { data: { key: string; label: string } }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    if (!loading) {
      setLoading(true);
      if (value && Number(value)) {
        Contract.access(value, data.key).then((res) => {
          setLoading(false);
        });
      }
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
        {loading ? <LoadingOutlined /> : "confirm"}
      </div>
    </div>
  );
};
