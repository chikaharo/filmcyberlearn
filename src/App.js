import React, { Suspense, useEffect, useLayoutEffect } from "react";
import "./App.css";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import UserTemplate from "./templates/UserTemplate/UserTemplate";
import { Route, Routes, useLocation, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import News from "./pages/News/News";
import Contact from "./pages/Contact/Contact";
import Detail from "./pages/Detail/Detail";
import Loading from "./components/Loading/Loading";
import { useDispatch } from "react-redux";
import checkAuth from "./utils/checkAuth";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Wrapper from "./templates/Wrapper/Wrapper";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import Films from "./pages/Films/Films";
import AddNew from "./pages/Films/AddNew/AddNew";
import AddNewForm from "./pages/Films/AddNew/AddNewForm";

const CheckoutLazy = React.lazy(() =>
  import("./templates/CheckoutTemplate/CheckoutTemplate")
);

function App() {
  checkAuth();

  return (
    // <Wrapper>
    <Routes>
      <Route path="/" element={<HomeTemplate />}>
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/detail/:filmId" element={<Detail />} />
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/" element={<UserTemplate />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="/admin" element={<AdminTemplate />}>
        <Route path="films" element={<Films />} />
        <Route path="films/addNew" element={<AddNewForm />} />
      </Route>
      <Route
        path="/checkout/:id"
        element={
          <Suspense fallback={<div>Loading... </div>}>
            <CheckoutLazy />
          </Suspense>
        }
      ></Route>
    </Routes>
    //  </Wrapper>
  );
}

export default App;
