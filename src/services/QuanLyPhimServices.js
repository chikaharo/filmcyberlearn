import { GROUPID } from "../utils/settings/config";
import BaseServices from "./baseServices";

class QuanLyPhimServices extends BaseServices {
  constructor() {
    super();
  }

  fetchBanner = () => {
    return this.get(`/api/QuanLyPhim/LayDanhSachBanner`);
  };

  fetchFilms = () => {
    return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`);
  };

  fetchPaginatedFilms = (soTrang, soPhanTu = 10) => {
    return this.get(
      `api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=${GROUPID}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTu}`
    );
  };
}

export const quanLyPhimInstance = new QuanLyPhimServices();
