/** @format */

import { Input } from "antd";
import Credit from "./Credit";
export default ({ data }: { data: { key: string; label: string } }) => {
  const rate = "0.000";
  return (
    <div className=' wallet-content access-content'>
      <div className='text'>
        <Input
          className='app-input'
          placeholder={`Please enter the amount you want to ${data.key}`}></Input>
        <span className='text-detail'>You will receive ~ {rate} FLE</span>
      </div>
      <Credit />
    </div>
  );
};
