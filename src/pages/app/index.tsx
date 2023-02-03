/** @format */

import Header from "@/components/header";
import Wallet from "@/components/wallet";
import Account from "./account";
import "./style.scss";
import "./common.scss";
import Chart from "./Charts";
import Access from "./access";
import Borrow from "./borrow";
export default () => {
  return (
    <div className='fill-app'>
      <Header />
      <div className='main'>
        {/* <div className='menu'>Dashbord</div> */}
        <div className='content'>
          <Account />
          <Chart />
          <Access />
          <Borrow />
        </div>
        <Wallet />
      </div>
    </div>
  );
};
