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
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path='/'></Route>
        <Route element={<App />} path='/home'></Route>
      </Routes>
    </BrowserRouter>
  );
};
