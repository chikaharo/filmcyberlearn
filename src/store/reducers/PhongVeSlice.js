import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios/axios";
import { quanLyDatVeInstance } from "../../services/QuanLyDatVeServices";
import { connection } from "../..";

const initialState = {
  danhSachPhongVe: null,
  gheDaDat: [],
  gheKhachDangDat: [],
  status: "idle",
  error: null,
};

export const fetchDanhSachPhongVe = createAsyncThunk(
  "phongVe/fetchDanhSachPhongVe",
  async (maLichChieu) => {
    try {
      const response = await quanLyDatVeInstance.layDanhSachPhongVe(
        maLichChieu
      );
      console.log("fetch DANH SACH PHONG VE DATA: ", response.data);
      if (response.data.statusCode === 200) {
        return response.data;
      }
    } catch (err) {
      console.log("fetchDanhSachPhongVe error: ", err?.message);
    }
  }
);

export const datVe = createAsyncThunk(
  "phongVe/datVe",
  async (thongTinVe, thunkAPI) => {
    try {
      const response = await quanLyDatVeInstance.datVe(thongTinVe);
      console.log("DAT VE PHONGVESLICE DATA: ", response);
      if (response.data.statusCode === 200) {
        thunkAPI.dispatch(fetchDanhSachPhongVe(thongTinVe.maLichChieu));
        const userLogged = thunkAPI.getState().user.loggedUser;
        connection.invoke(
          "datGheThanhCong",
          userLogged.taiKhoan,
          thongTinVe.maLichChieu
        );
        return response.data;
      }
    } catch (err) {
      console.log("DATVE PHONGVESLICE ERROR: ", err?.message);
    }
  }
);

export const chonGheAsync = createAsyncThunk(
  "phongVe/chonGheAsync",
  async (chonGheData, thunkAPI) => {
    console.log("CHON GHE ASYNC");
    const { ghe, maLichChieu } = chonGheData;

    console.log("CHON GHE DATA: ", chonGheData);
    thunkAPI.dispatch(chonGhe(ghe));
    const danhSachGheDangDat = thunkAPI.getState().phongVe.gheDaDat;
    const danhSachGheDangDatStr = JSON.stringify(danhSachGheDangDat);
    const taiKhoan = thunkAPI.getState().user.loggedUser.taiKhoan;

    // console.log(
    //   `DANH SACH GHE DAT - TAI KHOAN: ${danhSachGheDangDatStr} = ${taiKhoan} - ${maLichChieu}`
    // );

    connection.invoke("datGhe", taiKhoan, danhSachGheDangDatStr, maLichChieu);
  }
);

const phongVeSlice = createSlice({
  name: "phongVe",
  initialState,
  reducers: {
    chonGhe: (state, action) => {
      let idxTimMaGhe = state.gheDaDat.findIndex(
        (ghe) => ghe.maGhe === action.payload.maGhe
      );
      if (idxTimMaGhe !== -1) {
        state.gheDaDat.splice(idxTimMaGhe, 1);
      } else {
        state.gheDaDat.push(action.payload);
      }
    },
    setGheKhachDangDat: (state, action) => {
      state.gheKhachDangDat = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchDanhSachPhongVe.fulfilled, (state, action) => {
      state.danhSachPhongVe = action.payload.content;
      state.status = "succeed";
    });
    builder.addCase(fetchDanhSachPhongVe.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchDanhSachPhongVe.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    });
  },
});

export const { chonGhe, setGheKhachDangDat } = phongVeSlice.actions;

export default phongVeSlice.reducer;
