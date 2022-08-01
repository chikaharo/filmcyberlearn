import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const HomeLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default HomeLayout;
