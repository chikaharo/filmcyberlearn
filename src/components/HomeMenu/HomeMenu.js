import { Radio, Space, Tabs } from "antd";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Moment from "react-moment";

const { TabPane } = Tabs;

const HomeMenu = ({ cinemaData }) => {
  const [tabPosition, setTabPosition] = useState("left");

  const renderCinemas = () => {
    return cinemaData?.map((cinema, ind) => {
      return (
        <TabPane
          tab={<img src={cinema.logo} height={50} width={50} />}
          key={ind}
        >
          <Tabs tabPosition={tabPosition}>
            {cinema.lstCumRap?.map((cumrap, cumrapIdx) => (
              <TabPane
                tab={
                  <div className="flex">
                    <img src={cinema.logo} height={50} width={50} />
                    <div className="ml-2">
                      <p>{cumrap.tenCumRap}</p>
                      <span className="text-gray-600"></span>
                    </div>
                  </div>
                }
                key={cumrapIdx}
              >
                {cumrap.danhSachPhim?.slice(0, 12).map((phim, phimIdx) => (
                  <div key={phimIdx} className="my-5">
                    <div className="flex ">
                      <div className="w-[75px] h-[75px] mr-5">
                        <img
                          src={phim.hinhAnh}
                          className="w-full h-full object-cover"
                          alt={phim.maPhim}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://picsum.photos/75/75";
                          }}
                        />
                      </div>
                      <div className="">
                        <h1 className="text-2xl text-green-700">
                          {phim.tenPhim}
                        </h1>
                        <p className="font-bold">{cumrap.diaChi}</p>

                        <div className="grid grid-cols-6 gap-4">
                          {phim.lstLichChieuTheoPhim
                            ?.slice(0, 12)
                            .map((lichchieu, lichchieuIdx) => (
                              <NavLink
                                key={lichchieuIdx}
                                to={`checkout/${lichchieu.maLichChieu}`}
                                className="text-xl "
                              >
                                <Moment format="hh:mm A">
                                  {lichchieu.ngayChieuGioChieu}
                                </Moment>
                              </NavLink>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </TabPane>
            ))}
          </Tabs>
        </TabPane>
      );
    });
  };

  return (
    <div className="mt-20">
      <Tabs tabPosition={tabPosition}>
        {renderCinemas()}
        {/* <TabPane tab="Tab 1" key="1">
          Content of Tab 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab 3
        </TabPane> */}
      </Tabs>
    </div>
  );
};

export default HomeMenu;
