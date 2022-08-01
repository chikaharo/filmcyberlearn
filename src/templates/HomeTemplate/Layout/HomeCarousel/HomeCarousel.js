import { Carousel } from "antd";
import React from "react";
import "./HomeCarousel.css";

const contentStyle = {
  height: "600px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  backgroundPosition: "center center",
  backgroundSize: "100%",
};

const content = [
  {
    maBanner: 1,
    maPhim: 1282,
    hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png",
  },
  {
    maBanner: 2,
    maPhim: 1283,
    hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/lat-mat-48h.png",
  },
  {
    maBanner: 3,
    maPhim: 1284,
    hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/cuoc-chien-sinh-tu.png",
  },
];

const HomeCarousel = ({ items }) => (
  <Carousel effect="fade" className="relative z-1">
    {content.map((item, ind) => (
      <div key={ind}>
        <div style={{ ...contentStyle, background: `url(${item.hinhAnh})` }}>
          <img
            className="w-full opacity-0"
            src={item.hinhAnh}
            alt={item.maBanner}
          />
        </div>
      </div>
    ))}
  </Carousel>
);

export default HomeCarousel;
