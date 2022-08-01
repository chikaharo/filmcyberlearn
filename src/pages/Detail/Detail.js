import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { fetchFilmDetail } from "../../store/reducers/CinemaSlice";
import { useDispatch, useSelector } from "react-redux";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import Moment from "react-moment";
import { Tabs } from "antd";
import "../../assets/css-circle/css/circle.css";

const { TabPane } = Tabs;

const Detail = (props) => {
  const { filmDetail } = useSelector((state) => state.cinema);
  let { filmId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (filmId) {
      dispatch(fetchFilmDetail(filmId));
    }

    console.log("film Detail: ", filmDetail);
  }, [filmId]);

  return (
    <div
      className="min-h-screen pt-[100px]"
      style={{
        background: `url(${filmDetail?.hinhAnh})`,
        backgroundPosition: "center center",
        backgroundSize: "!00%",
      }}
    >
      <CustomCard
        className="min-h-screen"
        effectColor="#fff" // required
        color="#fff" // default color is white
        blur={10} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >
        <div className="grid grid-cols-12">
          <div className="col-start-3 col-span-4 flex space-x-4">
            <img src={filmDetail?.hinhAnh} width={150} height={300} />
            <div className="flex flex-col justify-center">
              <Moment format="DD.MM.yyyy">{filmDetail?.ngayKhoiChieu}</Moment>
              <h3 className="text-2xl font-bold text-white">
                {filmDetail?.tenPhim}
              </h3>
              <p>{filmDetail?.moTa}</p>
            </div>
          </div>
          <div className="col-start-8">
            <div class="c100 p50 big">
              <span>50%</span>
              <div class="slice">
                <div class="bar"></div>
                <div class="fill"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-20 container mx-auto">
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Lịch Chiếu" key="1">
              <div className="min-h-[350px] bg-white">
                <Tabs tabPosition="left">
                  {filmDetail?.heThongRapChieu.map((heThong, heThongIdx) => (
                    <TabPane
                      key={heThongIdx}
                      tab={
                        <div className="flex items-center gap-x-4">
                          <img src={heThong?.logo} height={50} width={50} />
                          <p className="font-bold">{heThong?.tenHeThongRap}</p>
                        </div>
                      }
                    >
                      {heThong?.cumRapChieu?.map((cumRap, cumRapIdx) => (
                        <>
                          <div className="mt-5 flex gap-x-4" key={cumRapIdx}>
                            <img
                              src={filmDetail?.hinhAnh}
                              alt="filmCRlogo"
                              width={55}
                              height={55}
                            />
                            <div>
                              <p className="text-xl font-bold ">
                                {cumRap?.tenCumRap}
                              </p>
                              <p className="text-gray-600 ">{cumRap?.diaChi}</p>
                            </div>
                          </div>
                          <div
                            className="grid grid-cols-6 mt-4"
                            key={cumRapIdx}
                          >
                            {cumRap?.lichChieuPhim
                              ?.slice(0, 12)
                              .map((lichChieu, lichChieuIdx) => (
                                <NavLink
                                  key={lichChieuIdx}
                                  to={`/checkout/${lichChieu.maLichChieu}`}
                                  className="text-green-700"
                                >
                                  <Moment key={lichChieuIdx} format="hh:mm A">
                                    {lichChieu.ngayChieuGioChieu}
                                  </Moment>
                                </NavLink>
                              ))}
                          </div>
                        </>
                      ))}
                    </TabPane>
                  ))}
                </Tabs>
              </div>
            </TabPane>
            <TabPane tab="Thông Tin" key="2">
              <div className="min-h-[350px] bg-white">4</div>
            </TabPane>
            <TabPane tab="Đánh GIá" key="3">
              <div className="min-h-[350px] bg-white">4</div>
            </TabPane>
          </Tabs>
        </div>
      </CustomCard>
    </div>
  );
};

export default Detail;
