import React from "react";
import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";
import { Outlet } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const HomeTemplate = (props) => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default HomeTemplate;
