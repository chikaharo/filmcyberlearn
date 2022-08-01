import { configureStore } from "@reduxjs/toolkit";
import carouselReducer from "./reducers/CarouselSlice";
import filmReducer from "./reducers/FilmSlice";
import cinemaReducer from "./reducers/CinemaSlice";
import userReducer from "./reducers/UserSlice";
import phongVeReducer from "./reducers/PhongVeSlice";

export const store = configureStore({
  reducer: {
    carousel: carouselReducer,
    film: filmReducer,
    cinema: cinemaReducer,
    user: userReducer,
    phongVe: phongVeReducer,
  },
});
