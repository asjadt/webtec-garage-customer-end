// ===================================
// #00104
// ===================================

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FiMenu, FiX } from "react-icons/fi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContextV2";
import { useNav } from "../../context/NavContext";
import { FaBookmark, FaRegBell } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { IoBookmark, IoNotifications } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
export default function MobileMenu() {
  const { user, logout, handleOpenSignUpPopup, handleOpenLoginPopup } =
    useAuth();

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
      <div className={`grid grid-cols-5 w-full items-end h-full`}>
        {/* MENU TOGGLE BUTTON  */}
        <div
          onClick={() => {
            setIsNavOpen(!isNavOpen);
          }}
          className={`${
            isNavOpen
              ? "text-primary bg-base-300 border-base-300 hover:border-b-primary"
              : "bg-primary text-base-300 border-primary hover:border-b-base-300"
          } flex w-full cursor-pointer flex-col justify-end items-center border-y-4 duration-200 h-full`}
        >
          {isNavOpen ? (
            <FiX
              className={`text-2xl  ${
                isNavOpen ? " text-primary" : " text-base-300"
              }`}
            />
          ) : (
            <FiMenu
              className={`text-2xl   ${
                isNavOpen ? " text-primary" : " text-base-300"
              }`}
            />
          )}

          <span
            className={`text-xs font-medium   ${
              isNavOpen ? " text-primary" : " text-base-300"
            } font-nunito`}
          >
            Menu
          </span>
        </div>

        {/* BOOKING  */}
        <NavLink
          to={"/my-account/my-bookings"}
          className={`${
            isNavOpen
              ? "text-primary bg-base-300 border-base-300 hover:border-b-primary"
              : "bg-primary text-base-300 border-primary hover:border-b-base-300"
          } flex w-full cursor-pointer flex-col justify-end items-center border-y-4 duration-200 h-full`}
        >
          <IoBookmark
            className={`text-2xl text-base-300 ${
              isNavOpen ? " text-primary" : " text-base-300"
            }`}
          />
          <span
            className={`text-xs font-medium text-base-300 font-nunito ${
              isNavOpen ? " text-primary" : " text-base-300"
            }`}
          >
            Booking
          </span>
        </NavLink>

        {/* HOME  */}
        <NavLink
          to={`/`}
          className={`${
            isNavOpen
              ? "text-primary bg-base-300 border-base-300 hover:border-b-primary"
              : "bg-primary text-base-300 border-primary hover:border-b-base-300"
          } flex w-full cursor-pointer flex-col justify-end items-center border-y-4 duration-200 h-full`}
        >
          <GoHomeFill
            className={`text-2xl text-base-300 ${
              isNavOpen ? " text-primary" : " text-base-300"
            }`}
          />
          <span
            className={`text-xs font-medium text-base-300 font-nunito ${
              isNavOpen ? " text-primary" : " text-base-300"
            }`}
          >
            Home
          </span>
        </NavLink>

        {/* NOTIFICATION  */}
        <NavLink
          to={`/my-account/all-notifications`}
          className={`${
            isNavOpen
              ? "text-primary bg-base-300 border-base-300 hover:border-b-primary"
              : "bg-primary text-base-300 border-primary hover:border-b-base-300"
          } flex w-full cursor-pointer flex-col justify-end items-center border-y-4 duration-200 h-full`}
        >
          <IoNotifications
            className={`text-2xl text-base-300 ${
              isNavOpen ? " text-primary" : " text-base-300"
            }`}
          />
          <span
            className={`text-xs font-medium text-base-300 font-nunito ${
              isNavOpen ? " text-primary" : " text-base-300"
            }`}
          >
            Notification
          </span>
        </NavLink>

        {/* PROFILE  */}
        <NavLink
          to={`/my-account/Profile`}
          className={`${
            isNavOpen
              ? "text-primary bg-base-300 border-base-300 hover:border-b-primary"
              : "bg-primary text-base-300 border-primary hover:border-b-base-300"
          } flex w-full cursor-pointer flex-col justify-end items-center border-y-4 duration-200 h-full`}
        >
          <BsPersonCircle
            className={`text-2xl text-base-300 ${
              isNavOpen ? " text-primary" : " text-base-300"
            }`}
          />
          <span
            className={`text-xs font-medium text-base-300 font-nunito ${
              isNavOpen ? " text-primary" : " text-base-300"
            }`}
          >
            My Account
          </span>
        </NavLink>
      </div>
    </motion.nav>
  );
}
