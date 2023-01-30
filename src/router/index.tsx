/** @format */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../pages/app";
import Home from "../pages/home";
export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path='/'></Route>
        <Route element={<App />} path='/home'></Route>
      </Routes>
    </BrowserRouter>
  );
};
