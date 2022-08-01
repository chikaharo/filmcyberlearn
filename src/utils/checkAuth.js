import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate, login } from "../store/reducers/UserSlice";

export default () => {
  // const { loggedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("USER_LOGIN")) {
      const userData = JSON.parse(localStorage.getItem("USER_LOGIN"));
      console.log("TAI KHOAN: ", userData.taiKhoan);

      dispatch(authenticate(userData));
    }
  }, []);
};
