import { LoadingOutlined } from "@ant-design/icons";
import React from "react";

const Loading = ({ onOpen = false }) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,.8)",
        position: "absolute",
        display: onOpen ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        top: 0,
        left: 0,
        zIndex: 10000,
      }}
    >
      <LoadingOutlined className="text-xl text-white" />
      <h3 className="text-3xl text-white">Loading...</h3>
    </div>
  );
};

export default Loading;
