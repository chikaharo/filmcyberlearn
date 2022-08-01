import React from "react";
import { RightCircleOutlined } from "@ant-design/icons";
import "./FlipFilm.css";
import { NavLink } from "react-router-dom";

const FlipFlim = ({ film }) => {
  return (
    <div className="flip-card mt-2">
      <div className="flip-card-inner " style={{ height: 300 }}>
        <div className="flip-card-front">
          {/* <div
            style={{
              background: `url(${film.hinhAnh}), url('https://i.picsum.photos/id/223/300/300.jpg')`,
              backgroundPosition: "center center",
              backgroundSize: "100%",
            }}
          > */}
          <img
            src={film.hinhAnh}
            alt="thumbnail"
            style={{ width: 300, height: 300 }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://picsum.photos/300/300";
            }}
          />
          {/* </div> */}
        </div>
        <div
          className="flip-card-back"
          style={{ position: "relative", backgroundColor: "rgba(0,0,0,.9)" }}
        >
          <div className="absolute top-0 left-0">
            <img
              src={film.hinhAnh}
              style={{
                height: 300,
                width: 300,
              }}
            ></img>
          </div>
          <div
            className="w-full h-full"
            style={{
              position: "absolute",
              backgroundColor: "rgba(0,0,0,.5)",
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <div>
              <RightCircleOutlined className="text-4xl text-white" />
              <h3 className="text-white mt-2 font-bold text-2xl">
                {film.tenPhim}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <NavLink to={`/detail/${film.maPhim}`}>
        <div className=" text-center cursor-pointer py-2 bg-indigo-500 my-2 text-white font-bold">
          ĐẶT VÉ
        </div>
      </NavLink>
    </div>
  );
};

export default FlipFlim;
