import { GROUPID } from "../utils/settings/config";
import BaseServices from "./baseServices";

class QuanLyNguoiDungServices extends BaseServices {
  constructor() {
    super();
  }

  dangNhap = (loginData) => {
    return this.post(`api/QuanLyNguoiDung/DangNhap`, loginData);
  };

  layThongTinTaiKhoan = () => {
    return this.post("api/QuanLyNguoiDung/ThongTinTaiKhoan");
  };
}

export const quanLyNguoiDungInstance = new QuanLyNguoiDungServices();
