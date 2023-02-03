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
      if (value) {
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
          placeholder={`Enter the amount of ${
            data.key === "deposit" ? "FIL" : "FLE"
          } to ${data.key}`}
        />
        <span className='text-detail'>
          You will receive approx. {""}
          <span className='number'>{value ? Number(value) : "0.000"}</span>{" "}
          {data.key === "deposit" ? "FLE" : "FIL"}
        </span>
      </div>
      <div className='connect-btn' onClick={handleClick}>
        {loading ? (
          <LoadingOutlined />
        ) : (
          `${data.key === "deposit" ? "Deposit" : "Redeem"}`
        )}
      </div>
    </div>
  );
};
