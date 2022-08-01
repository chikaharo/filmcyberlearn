import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { layDanhSachPhimPhanTrang } from "../../store/reducers/FilmSlice";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "Mã Phim",
    dataIndex: "maPhim",
    value: (text, object) => <span>{text}</span>,
    sorter: (a, b) => a.maPhim - b.maPhim,
    sortOrder: "ascend",
  },
  {
    title: "Hình Ảnh",
    dataIndex: "hinhAnh",
    render: (text, film, idx) => (
      <img
        src={film.hinhAnh}
        alt={film.tenPhim}
        width={50}
        height={50}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://picsum.photos/id/${idx}/50/50`;
        }}
      />
    ),
  },
  {
    title: "Tên Phim",
    dataIndex: "tenPhim",
    sorter: {
      compare: (a, b) => {
        let tenA = a.tenPhim.toLowerCase().trim();
        let tenB = b.tenPhim.toLowerCase().trim();
        if (tenA > tenB) {
          return 1;
        }
        return -1;
      },
    },
    render: (text, film) => <>{film.tenPhim}</>,
    sortDirection: ["descend, ascend"],
  },
  {
    title: "Mô Tả",
    dataIndex: "moTa",
    sorter: {
      compare: (a, b) => {
        let tenA = a.moTa.toLowerCase().trim();
        let tenB = b.moTa.toLowerCase().trim();
        if (tenA > tenB) {
          return 1;
        }
        return -1;
      },
    },
    render: (text, film) => (
      <>{film.moTa.length > 50 ? `${film.moTa.substr(50)}...` : film.moTa}</>
    ),
    sortDirection: ["descend, ascend"],
  },
  {
    title: "Hành Động",
    dataIndex: "hanhDong",
    render: (text, film) => (
      <>
        <EditOutlined
          className="text-blue-600 text-2xl"
          style={{ color: "blue" }}
        />
        <DeleteOutlined
          className="text-red-600 text-2xl"
          style={{ color: "red" }}
        />
      </>
    ),
  },
];

const Films = () => {
  const { paginatedFilms } = useSelector((state) => state.film);
  const dispatch = useDispatch();
  const [soTrang, setSoTrang] = useState(1);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  useEffect(() => {
    dispatch(layDanhSachPhimPhanTrang(soTrang));
  }, [soTrang, dispatch]);

  return (
    <div>
      <Button>Add Films</Button>
      <Table
        columns={columns}
        dataSource={paginatedFilms}
        onChange={onChange}
      />
      ;
    </div>
  );
};

export default Films;
