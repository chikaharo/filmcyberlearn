import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios/axios";
import { quanLyRapInstance } from "../../services/QuanLyRapServices";

const initialState = {
  data: [],
  status: "idle",
  error: null,
  filmDetail: null,
};

export const fetchCinemaInfo = createAsyncThunk(
  "cinema/fetchCinemaInfo",
  async () => {
    const response = await quanLyRapInstance.layThongTinLichChieuHeThongRap();
    return response.data;
  }
);

export const fetchFilmDetail = createAsyncThunk(
  "cinema/fetchFilmDetail",
  async (filmId) => {
    const response = await quanLyRapInstance.layThongTinLichChieuPhim(filmId);
    console.log("fetchFilmDetail data: ", response.data);
    return response.data;
  }
);

const cinemaSlice = createSlice({
  name: "cinema",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCinemaInfo.fulfilled, (state, action) => {
      state.data = action.payload.content;
      state.status = "succeed";
    });
    builder.addCase(fetchCinemaInfo.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchCinemaInfo.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    });
    builder.addCase(fetchFilmDetail.fulfilled, (state, action) => {
      state.filmDetail = action.payload.content;
    });
    // builder.addCase(fetchFilmDetail.pending, (state, action) => {
    //   state.filmDetail = null;
    // });
  },
});

// export const { dangChieuFetched, sapChieuFetched } = filmSlice.actions;
export default cinemaSlice.reducer;
