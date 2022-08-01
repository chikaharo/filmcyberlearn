import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios/axios";
import { quanLyPhimInstance } from "../../services/QuanLyPhimServices";

const initialState = {
  items: [
    {
      maBanner: 1,
      maPhim: 1282,
      hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png",
    },
  ],
  status: "idle",
  error: null,
};

export const fetchCarousel = createAsyncThunk(
  "carousel/fetchCarousel",
  async () => {
    const response = await quanLyPhimInstance.fetchBanner();
    return response.data;
  }
);

const carouselSlice = createSlice({
  name: "carousel",
  initialState,
  reducers: {
    carouselFetched: (state, action) => {
      state = action.payload.data;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCarousel.fulfilled, (state, action) => {
      state.items = action.payload.content;
      state.status = "succeed";
    });
    builder.addCase(fetchCarousel.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchCarousel.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    });
  },
});

export const { carouselFetched } = carouselSlice.actions;
export default carouselSlice.reducer;
