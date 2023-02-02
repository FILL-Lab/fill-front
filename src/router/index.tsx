/** @format */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../pages/app";
import Home from "../pages/home";
export default () => {
  const dispath = useDispatch();
  useEffect(() => {
    const obj = JSON.parse(localStorage?.getItem("login") || "{}");
    if (obj.result && obj.wallet) {
      dispath({
        type: "wallet/change",
        payload: {
          ...obj,
        },
      });
    }
  }, []);

  useEffect(() => {
    const handleAccountsChanged = (accounts: any, other: any) => {
      console.log("===========3", accounts);
      //   if (accounts.length === 0 || accounts[0] !== public_key) {
      //     //退出登录
      //     dispath({
      //       type: "user/login",
      //       payload: { cancel: true },
      //     });
      //   }
    };
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    } else {
      console.log("=不支持钱包");
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path='/'></Route>
        <Route element={<App />} path='/home'></Route>
      </Routes>
    </BrowserRouter>
  );
};
