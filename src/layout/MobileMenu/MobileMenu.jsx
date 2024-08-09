// ===================================
// #00104
// ===================================

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FiArrowRightCircle, FiMenu, FiUserPlus, FiX } from "react-icons/fi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContextV2";
import { useNav } from "../../context/NavContext";
import { FaBookmark, FaRegBell } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { IoBookmark, IoNotifications } from "react-icons/io5";
import { BsFillFuelPumpFill, BsPersonCircle } from "react-icons/bs";
export default function MobileMenu() {
  const { isLoading, handleOpenSignUpPopup, handleOpenLoginPopup } = useAuth();

  const { isNavOpen, setIsNavOpen } = useNav();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [profileToggle, setProfileToggle] = useState(false);
  const location = useLocation();

  // NOTIFICATION RELATED WORK
  // FILTERS
  const [filters, setFilters] = useState({
    perPage: 20,
    page: 1,
  });

  // GET ALL DATA
  const [notifications, setNotifications] = useState({});
  const [totalUnreadNotifications, setTotalUnreadNotifications] = useState(0);
  const [isNotificationLoading, setIsNotificationLoading] = useState(true);
  const [isNotificationDropdownOn, setIsNotificationDropdownOn] =
    useState(false);

  useEffect(() => {
    setProfileToggle(false);
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      data-cy="header_nav"
      style={{
        boxShadow: "0px 2px 10px 5px rgba(0, 0, 0, 0.3)",
      }}
      className="w-full h-[3.5rem] z-50 shadow-lg bottom-0 left-0 flex sm:hidden items-center justify-center fixed bg-primary"
    >
      {isLoading ? (
        <div className={`grid grid-cols-5 w-full items-end h-full`}>
          <div className={`h-full w-full bg-primary-focus animate-pulse`}></div>
          <div className={`h-full w-full bg-primary animate-pulse`}></div>
          <div className={`h-full w-full bg-primary-focus animate-pulse`}></div>
          <div className={`h-full w-full bg-primary animate-pulse`}></div>
          <div className={`h-full w-full bg-primary-focus animate-pulse`}></div>
        </div>
      ) : (
        <div className={`grid grid-cols-5 w-full items-end h-full`}>
          {/* MENU TOGGLE BUTTON  */}
          <div
            onClick={() => {
              setIsNavOpen(!isNavOpen);
            }}
            className={`${
              isNavOpen
                ? "bg-primary-focus border-t-primary-focus border-b-primary-focus"
                : "bg-primary text-base-300 border-primary"
            } flex w-full cursor-pointer  hover:border-b-base-300 flex-col justify-end items-center border-y-4 duration-200 h-full`}
          >
            {isNavOpen ? (
              <FiX className={`text-2xl text-base-300`} />
            ) : (
              <FiMenu className={`text-2xl text-base-300`} />
            )}

            <span className={`text-xs font-medium text-base-300 font-nunito`}>
              Menu
            </span>
          </div>

          {/* FUEL STATION & BOOKING  */}
          {!JSON.parse(localStorage.getItem("user_data")) ? (
            // IF NOT LOGGED IN
            <NavLink
              to={"/fuel-station"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "bg-primary-focus border-t-primary-focus border-b-primary-focus"
                    : "bg-primary text-base-300 border-primary"
                } flex w-full cursor-pointer  hover:border-b-base-300 flex-col justify-end items-center border-y-4 duration-200 h-full`
              }
            >
              <BsFillFuelPumpFill className={`text-2xl text-base-300`} />
              <span
                className={`text-xs font-medium text-base-300 font-nunito `}
              >
                Fuel Stations
              </span>
            </NavLink>
          ) : (
            // IF LOGGED IN
            <NavLink
              to={"/my-account/my-bookings"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "bg-primary-focus border-t-primary-focus border-b-primary-focus"
                    : "bg-primary text-base-300 border-primary"
                } flex w-full cursor-pointer  hover:border-b-base-300 flex-col justify-end items-center border-y-4 duration-200 h-full`
              }
            >
              <IoBookmark className={`text-2xl text-base-300`} />
              <span
                className={`text-xs font-medium text-base-300 font-nunito `}
              >
                Booking
              </span>
            </NavLink>
          )}

          {/* HOME  */}
          <NavLink
            to={`/`}
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-primary-focus border-t-primary-focus border-b-primary-focus"
                  : "bg-primary text-base-300 border-primary"
              } flex w-full cursor-pointer  hover:border-b-base-300 flex-col justify-end items-center border-y-4 duration-200 h-full`
            }
          >
            <GoHomeFill className={`text-2xl text-base-300 `} />
            <span className={`text-xs font-medium text-base-300 font-nunito `}>
              Home
            </span>
          </NavLink>

          {/* NOTIFICATION  */}
          {!JSON.parse(localStorage.getItem("user_data")) ? (
            <div
              onClick={handleOpenSignUpPopup}
              className={`${"bg-primary text-base-300 border-primary"} flex w-full cursor-pointer  hover:border-b-base-300 flex-col justify-end items-center border-y-4 duration-200 h-full`}
            >
              <FiUserPlus className={`text-2xl text-base-300`} />
              <span
                className={`text-xs font-medium text-base-300 font-nunito `}
              >
                Register
              </span>
            </div>
          ) : (
            <NavLink
              to={`/my-account/all-notifications`}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "bg-primary-focus border-t-primary-focus border-b-primary-focus"
                    : "bg-primary text-base-300 border-primary"
                } flex w-full cursor-pointer  hover:border-b-base-300 flex-col justify-end items-center border-y-4 duration-200 h-full`
              }
            >
              <IoNotifications className={`text-2xl text-base-300`} />
              <span
                className={`text-xs font-medium text-base-300 font-nunito `}
              >
                Notification
              </span>
            </NavLink>
          )}

          {/* PROFILE  */}
          {!JSON.parse(localStorage.getItem("user_data")) ? (
            <div
              onClick={handleOpenLoginPopup}
              className={`${"bg-primary text-base-300 border-primary"} flex w-full cursor-pointer  hover:border-b-base-300 flex-col justify-end items-center border-y-4 duration-200 h-full`}
            >
              <FiArrowRightCircle className={`text-2xl text-base-300 `} />
              <span className={`text-xs font-medium text-base-300 font-nunito`}>
                Login
              </span>
            </div>
          ) : (
            <NavLink
              to={`/my-account/Profile`}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "bg-primary-focus border-t-primary-focus border-b-primary-focus"
                    : "bg-primary text-base-300 border-primary"
                } flex w-full cursor-pointer  hover:border-b-base-300 flex-col justify-end items-center border-y-4 duration-200 h-full`
              }
            >
              <BsPersonCircle className={`text-2xl text-base-300 `} />
              <span className={`text-xs font-medium text-base-300 font-nunito`}>
                My Account
              </span>
            </NavLink>
          )}
        </div>
      )}
    </motion.nav>
  );
}
