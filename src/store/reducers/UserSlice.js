import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quanLyNguoiDungInstance } from "../../services/QuanLyNguoiDungServices";

const initialState = {
  loggedUser: null,
  userInfo: null,
  token: null,
  status: "idle",
  error: null,
};

// loginData: {taiKhoan, matKhau}
export const login = createAsyncThunk("user/login", async (loginData) => {
  console.log("LOGIN DATA: ", loginData);
  try {
    const response = await quanLyNguoiDungInstance.dangNhap(loginData);

    console.log("RESPONSE LOGIN DATA: ", response);

    if (response.data.statusCode === 200) {
      localStorage.setItem("USER_LOGIN", JSON.stringify(response.data.content));
      localStorage.setItem(
        "TOKEN",
        JSON.stringify(response.data.content.accessToken)
      );

      return response.data.content;
    } else {
      throw new Error(response.data.message);
    }
  } catch (err) {
    console.log("LOGIN USERSLICE ERROR: ", err);
  }
});

export const getUserInfo = createAsyncThunk("user/getUserInfo", async () => {
  try {
    const response = await quanLyNguoiDungInstance.layThongTinTaiKhoan();

    console.log("GET USER INFO: ", response);

    if (response.data.statusCode === 200) {
      return response.data.content;
    }
  } catch (err) {
    throw new Error(err?.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.loggedUser = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("USER_LOGIN");
      localStorage.removeItem("TOKEN");
      state = initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("LOGIN FULLFILLED ACTION", action.payload);
      state.loggedUser = action.payload;

      state.status = "succeed";
    });
    builder.addCase(login.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loggedUser = {};
      state.status = "failed";
      state.error = action.payload.message;
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
  },
});

export const { authenticate, logout } = userSlice.actions;
export default userSlice.reducer;
