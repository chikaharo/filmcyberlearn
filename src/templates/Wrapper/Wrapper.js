import React, { useLayoutEffect, useLocation } from "react";

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return <>{children}</>;
};

export default Wrapper;
