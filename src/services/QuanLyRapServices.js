import { GROUPID } from "../utils/settings/config";
import BaseServices from "./baseServices";

class QuanLyRap extends BaseServices {
  constructor() {
    super();
  }

  layThongTinLichChieuHeThongRap = () => {
    return this.get(
      `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`
    );
  };

  layThongTinHeThongRap = () => {
    return this.get(`/api/QuanLyRap/LayThongTinHeThongRap`);
  };

  layThongTinLichChieuPhim = (filmId) => {
    return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${filmId}`);
  };
}

export const quanLyRapInstance = new QuanLyRap();
