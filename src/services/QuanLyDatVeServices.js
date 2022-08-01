import { GROUPID } from "../utils/settings/config";
import BaseServices from "./baseServices";

class QuanLyDatVe extends BaseServices {
  constructor() {
    super();
  }

  layDanhSachPhongVe = (maLichChieu) => {
    return this.get(
      `api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
      maLichChieu
    );
  };

  datVe = (thongTinVe) => {
    return this.post("api/QuanLyDatVe/DatVe", thongTinVe);
  };
}

export const quanLyDatVeInstance = new QuanLyDatVe();
