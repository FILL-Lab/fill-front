/** @format */

import { useEffect } from "react";
import Header from "../../components/header";
import Account from "./account";
import { loginMarck } from "../../store/server";
import "./style.scss";
import Chart from "./Charts";
export default () => {
  console.log("====2");
  useEffect(() => {
    // loginMarck();
  }, []);
  return (
    <div className='fill-app'>
      <Header />
      <div className='main'>
        <div className='menu'>Dashbord</div>
        <div className='content'>
          <Account />
          <Chart />
        </div>
      </div>

      {/* <input type='text' id='toAddress' placeholder='to transfer address' />
      <input
        type='button'
        onClick={() => {
          loginMarck();
        }}
        value='有签名转账（无需提供privateKey）需要metamask解锁'
      /> */}
    </div>
  );
};
