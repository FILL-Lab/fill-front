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

    const handleAccountsChanged = (accounts: any, other: any) => {
      const objValue = JSON.parse(localStorage?.getItem("login") || "{}");
      if (
        accounts?.length === 0 ||
        (accounts.length > 0 &&
          objValue?.result &&
          objValue?.result.length > 0 &&
          accounts[0] !== objValue?.result[0])
      ) {
        //退出登录
        dispath({
          type: "wallet/change",
          payload: { show: true, wallet: undefined, result: undefined },
        });
        localStorage.removeItem("wallet");
        window.location.reload();
      }
    };

    if (obj.result && obj.wallet) {
      dispath({
        type: "wallet/change",
        payload: {
          ...obj,
        },
      });
    }

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
