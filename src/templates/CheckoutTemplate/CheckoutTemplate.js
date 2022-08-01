import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  chonGhe,
  chonGheAsync,
  datVe,
  fetchDanhSachPhongVe,
  setGheKhachDangDat,
} from "../../store/reducers/PhongVeSlice";
import {
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import _ from "lodash";
import "./CheckoutTemplate.css";
import { DanhSachVe } from "../../models/quanLyDatVeModel";
import Loading from "../../components/Loading/Loading";
import { getUserInfo } from "../../store/reducers/UserSlice";
import { Tabs } from "antd";
import Moment from "react-moment";
import { connection } from "../..";

const { TabPane } = Tabs;

const CheckoutTemplate = () => {
  const { loggedUser } = useSelector((state) => state.user);
  const { danhSachPhongVe, gheDaDat, gheKhachDangDat } = useSelector(
    (state) => state.phongVe
  );
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const datGhe = (ghe) => {
    dispatch(
      chonGheAsync({
        ghe,
        maLichChieu: id,
      })
    );
  };

  const datVeHandle = () => {
    // const danhSachVe = gheDaDat.map((gheDat) => {
    //   return { maGhe: gheDat.maGhe, giaVe: gheDat.giaVe };
    // });
    const thongTinVe = new DanhSachVe();
    thongTinVe.maLichChieu = id;
    thongTinVe.danhSachVe = gheDaDat;

    dispatch(datVe(thongTinVe));
  };

  const beforeUnloadHandle = (e) => {
    connection.invoke("huyDat", loggedUser?.taiKhoan, id);
  };

  const renderSeats = () => {
    return danhSachPhongVe?.danhSachGhe?.map((ghe, gheIdx) => {
      const classGheVip = ghe?.loaiGhe === "Vip" && "gheVip";
      const classGheDaDat = ghe?.daDat && "gheUnavailabled";
      const classGheChecking =
        gheDaDat?.findIndex((gheDat) => gheDat.maGhe === ghe.maGhe) !== -1 &&
        "gheChecked";
      const classGheNguoiDungDat =
        ghe.taiKhoanNguoiDat === loggedUser?.taiKhoan;

      const classGheKhachDangDat =
        gheKhachDangDat.findIndex((gheKh) => gheKh.maGhe === ghe.maGhe) !==
          -1 && "gheKhachDangDat";

      return (
        <Fragment key={gheIdx}>
          <button
            onClick={() => datGhe(ghe)}
            className={`ghe ${classGheVip} ${classGheDaDat} ${classGheChecking} ${classGheNguoiDungDat} ${classGheKhachDangDat}`}
            key={gheIdx}
          >
            {gheKhachDangDat.findIndex((gheKh) => gheKh.maGhe === ghe.maGhe) !==
            -1 ? (
              <ExclamationCircleOutlined />
            ) : ghe?.taiKhoanNguoiDat === loggedUser?.taiKhoan ? (
              <UserOutlined />
            ) : ghe?.daDat ? (
              <CloseCircleOutlined />
            ) : (
              ghe?.tenGhe
            )}
          </button>
          {(gheIdx + 1) % 16 === 0 && <br />}
        </Fragment>
      );
    });
  };

  useEffect(() => {
    if (!localStorage.getItem("USER_LOGIN")) {
      return navigate("/login");
    }

    if (!loggedUser) {
      return navigate("/login");
    }
  }, []);

  useEffect(() => {
    dispatch(fetchDanhSachPhongVe(id));
    dispatch(getUserInfo());

    connection.on("datVeThanhCong", () => {
      dispatch(fetchDanhSachPhongVe(id));
    });

    connection.invoke("loadDanhSachGhe", id);

    connection.on("loadDanhSachGheDaDat", (danhSachGheDat) => {
      console.log("DANH SACH GHE DAT SOCKET", danhSachGheDat);
      let gheKhachDangDat = [];
      danhSachGheDat
        .filter((dsGhe) => dsGhe.taiKhoan !== loggedUser.taiKhoan)
        .forEach((ghe) => {
          gheKhachDangDat = [
            ...gheKhachDangDat,
            ...JSON.parse(ghe.danhSachGhe),
          ];
        });

      console.log("DANH SACH GHE KH DANG DAT: ", gheKhachDangDat);
      const gheKhachDangDatUnique = _.uniqBy(gheKhachDangDat, "maGhe");
      dispatch(setGheKhachDangDat(gheKhachDangDatUnique));
    });

    window.addEventListener("beforeunload", beforeUnloadHandle);

    return () => {
      beforeUnloadHandle();
      window.removeEventListener("beforeunload", beforeUnloadHandle);
    };
  }, []);

  return (
    <div className="grid grid-cols-12">
      <Loading />
      <div className="col-span-9">
        <div className="flex flex-col w-full items-center">
          {/* <div className=" pt-10"> */}
          <div className="h-5 w-4/5 bg-black"></div>
          <div
            className={`border-b-[50px] border-b-gray-300 border-l-[25px] border-r-[25px] border-l-transparent border-r-transparent h-0 w-4/5 bong`}
          ></div>
          <div className="mt-10">{renderSeats()}</div>
          {/* </div> */}
        </div>
      </div>
      <div className="col-span-3 pr-8">
        <div className="text-center p-4">
          <span className="text-green-700 text-3xl">
            {_.sumBy(gheDaDat, "giaVe")} đ
          </span>
        </div>
        <hr />
        <h3 className="font-bold text-xl ">Ten Phim</h3>
        <p>Địa điểm: </p>
        <p>Ngày chiếu: </p>
        <hr />
        <div className="flex justify-between py-4">
          <div>
            <span className="text-red-600">Ghế</span>
            {_.sortBy(gheDaDat, "stt").map((gheDat, gheDatIdx) => (
              <span key={gheDatIdx} className="text-green-500">
                {" "}
                {gheDat.tenGhe}
              </span>
            ))}
          </div>
          <span>0đ</span>
        </div>
        <hr />
        <div className="py-4">
          <i>
            <strong>Email:</strong>
            {loggedUser?.email}
          </i>
        </div>
        <hr />
        <div className="py-4">
          <i>
            <strong>Phone:</strong>
            {loggedUser?.soDt}
          </i>
          <hr />
        </div>
        <button
          onClick={datVeHandle}
          className="w-full py-4 text-2xl font-bold text-center mt-6 bg-green-500 text-white rounded-xl"
        >
          ĐẶT VÉ
        </button>
      </div>
    </div>
  );
};

const LichSuDatVe = (props) => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <div className="w-full h-full">
      <h2 className="text-2xl font-bold text-center">Lich Sử Đặt Vé Của Bạn</h2>
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          {userInfo?.thongTinDatVe?.map((datVe, datVeIdx) => (
            <div
              className="py-6 px-6 flex space-x-6 w-3/4 rounded shadow-lg mt-6"
              key={datVeIdx}
            >
              <div className=" overflow-hidden w-[150px] h-[150px]">
                <img
                  className="w-full h-full object-cover"
                  src={datVe?.hinhAnh}
                  alt={datVe?.ngayDat}
                />
              </div>
              <div>
                <h3 className="font-bold text-2xl inline">
                  {datVe?.tenPhim} -{" "}
                </h3>
                <span className="text-gray-500 font-bold inline">
                  <Moment format="DD-MM-YYYY hh:mm A">{datVe?.ngayDat}</Moment>
                </span>
                <p className="text-red-600 text-xl font-bold">
                  Giá Vé: {datVe?.giaVe} đ
                </p>
                <p className="font-bold text-xl text-green-600">
                  Ghế:
                  {datVe?.danhSachGhe?.map((ghe, gheIdx) => (
                    <span key={gheIdx} className="ml-4">
                      {ghe.tenGhe}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function (props) {
  const [activeKey, setActiveKey] = useState("1");
  const operations = (
    <NavLink to="/">
      <HomeOutlined className="text-3xl mr-10" />
    </NavLink>
  );

  const onChange = (key) => {
    setActiveKey(key);
  };

  return (
    <Tabs
      defaultActiveKey="1"
      activeKey={activeKey}
      onChange={onChange}
      tabBarExtraContent={operations}
    >
      <TabPane tab="Ghế và đặt vé" key="1">
        <CheckoutTemplate {...props} />
      </TabPane>
      <TabPane tab="Lịch sử đặt vé" key="2">
        <LichSuDatVe {...props} />
      </TabPane>
    </Tabs>
  );
}
