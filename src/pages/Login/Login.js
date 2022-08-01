import React from "react";
import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/reducers/UserSlice";

const Login = () => {
  const { loggedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required("Bắt buộc"),
      matKhau: Yup.string()
        .min(6, "Mật khẩu phải từ 6 kí tự trở lên")
        .required("Bắt buộc"),
    }),
    onSubmit: (values) => {
      // console.log("LOGIN VALUSE: ", values);
      dispatch(login(values));

      if (loggedUser) {
        return navigate("/");
      }
    },
  });

  return (
    <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
      <h2
        className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
        xl:text-bold"
      >
        Log in
      </h2>
      <div className="mt-12">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div className="text-sm font-bold text-gray-700 tracking-wide">
              Tài khoản
            </div>
            <input
              id="taiKhoan"
              name="taiKhoan"
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type
              placeholder="mike@gmail.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.taiKhoan}
            />
          </div>
          <div className="mt-8">
            <div className="flex justify-between items-center">
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Mật khẩu
              </div>
              <div>
                <a
                  className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                            cursor-pointer"
                >
                  Quên mật khẩu?
                </a>
              </div>
            </div>
            <input
              id="matKhau"
              name="matKhau"
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="password"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.matKhau}
            />
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                    font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                    shadow-lg"
            >
              Đăng nhập
            </button>
          </div>
        </form>
        <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
          Chưa có tài khoản?{" "}
          <NavLink
            to="/register"
            className="cursor-pointer text-indigo-600 hover:text-indigo-800"
          >
            Đăng ký
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
