import React from "react";
import { NavLink } from "react-router-dom";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../store/reducers/UserSlice";

const { Option } = Select;

const Header = () => {
  const { loggedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  let activeStyle = {
    borderBottom: "2px solid",
  };

  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };

  const onLogoutHandle = () => {
    dispatch(logout());
    window.location.reload();
  };

  return (
    <header className="p-4 bg-gray-800 bg-opacity-40 dark:text-gray-100 fixed w-full z-50">
      <div className="container flex justify-between h-16 mx-auto">
        <NavLink
          rel="noopener noreferrer"
          to="/"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <img
            className="w-[90px]"
            src="https://amc-theatres-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,w_240/v1524171371/amc-cdn/general/amc-classic-brand-creative/amc_logo_1200x856.png"
            alt="logo"
          />
        </NavLink>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink
              rel="noopener noreferrer"
              to="/"
              // className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-violet-400 dark:border-violet-400"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className={`flex items-center px-4 -mb-1  dark:border-transparent ${({
                isActive,
              }) => (isActive ? "border-b-2" : undefined)}`}
            >
              {t("home")}
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              rel="noopener noreferrer"
              to="/news"
              className={`flex items-center px-4 -mb-1  dark:border-transparent ${({
                isActive,
              }) => (isActive ? "border-b-2" : "border-b-2")}`}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              {t("news")}
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              rel="noopener noreferrer"
              to="/contact"
              // className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className={`flex items-center px-4 -mb-1  dark:border-transparent ${(
                props
              ) => (props.isActive ? "border-b-2" : undefined)}`}
            >
              {t("contact")}
            </NavLink>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          {loggedUser ? (
            <>
              <p className="text-white text-2xl font-bold leading-none m-0">
                {t("hello")}, {loggedUser.taiKhoan}
              </p>
              <button
                onClick={onLogoutHandle}
                className="self-center px-8 py-3 rounded text-white"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="self-center px-8 py-3 rounded text-white"
              >
                {t("signin")}
              </NavLink>
              <NavLink
                to="/register"
                className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 text-white"
              >
                {t("signup")}
              </NavLink>
            </>
          )}
          <Select
            defaultValue="vi"
            style={{ width: 120 }}
            onChange={handleChange}
          >
            <Option value="vi">Tiếng Việt</Option>
            <Option value="en">English</Option>
          </Select>
        </div>
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
