import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios/axios";
import { quanLyPhimInstance } from "../../services/QuanLyPhimServices";

const initialState = {
  arrFilms: [],
  defaultFilms: [],
  paginatedFilms: [],

  dangchieu: true,
  status: "idle",
  error: null,
};

export const fetchFilms = createAsyncThunk("film/fetchFilms", async () => {
  const response = await quanLyPhimInstance.fetchFilms();
  return response.data;
});

export const layDanhSachPhimPhanTrang = createAsyncThunk(
  "film/layDanhSachPhimPhanTrang",
  async (soTrang) => {
    const response = await quanLyPhimInstance.fetchPaginatedFilms(soTrang);

    console.log("lay danh sach phim phan trang: ", response);
    return response.data;
  }
);

const filmSlice = createSlice({
  name: "film",
  initialState,
  reducers: {
    dangChieuFetched: (state) => {
      state.arrFilms = state.defaultFilms.filter(
        (film) => film.dangChieu === true
      );
      state.dangchieu = true;
    },
    sapChieuFetched: (state) => {
      state.arrFilms = state.defaultFilms.filter(
        (film) => film.sapChieu === true
      );
      state.dangchieu = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchFilms.fulfilled, (state, action) => {
      state.arrFilms = action.payload.content;
      state.defaultFilms = action.payload.content;
      state.status = "succeed";
    });
    builder.addCase(fetchFilms.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchFilms.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    });
    builder.addCase(layDanhSachPhimPhanTrang.fulfilled, (state, action) => {
      state.paginatedFilms = action.payload.content.items;

      state.status = "succeed";
    });
    builder.addCase(layDanhSachPhimPhanTrang.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(layDanhSachPhimPhanTrang.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    });
  },
});

export const { dangChieuFetched, sapChieuFetched } = filmSlice.actions;
export default filmSlice.reducer;
