// ===================================
// #00104
// ===================================

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiAlignLeft, FiX } from "react-icons/fi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { OutsideClickHandler } from "../../components/OutsideClickHandler";
import { useNav } from "../../context/NavContext";
import { formatRole } from "../../utils/formatRole";
import { getFullImageLink } from "../../utils/getFullImageLink";
import { useAuth } from "../../context/AuthContextV2";
import { TbLogout2 } from "react-icons/tb";
import ButtonLoading from "../../components/ButtonLoading";

export default function Navbar() {
  const { user, logout } = useAuth();

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
      className="pl-4  w-full z-50 pr-8 md:rounded-[15px] shadow-sm h-20 flex items-center justify-between relative bg-base-300"
    >
      <div className="flex flex-row w-full items-center justify-start gap-x-5 ">
        {/* toggle btn  */}
        <motion.button
          data-auto={`navbar-toggle-button-every-page`}
          className={`relative z-40 bg-transparent transition-all duration-300 w-10 h-10 block overflow-hidden

        `}
          onClick={() => {
            setIsNavOpen(!isNavOpen);
          }}
        >
          {isNavOpen ? (
            <FiX className={`text-4xl text-primary`} />
          ) : (
            <FiAlignLeft className={`text-4xl text-primary`} />
          )}
        </motion.button>
      </div>

      {/* LOGO  */}
      <NavLink
        data-auto={`navbar-logo-every-page`}
        to={`/`}
        data-tip={"Garage Booking"}
        className={`w-full overflow-hidden tooltip duration-300 tooltip-bottom tooltip-primary hidden md:flex flex-col justify-start gap-x-5 items-center`}
      >
        <motion.div
          className={`flex`}
          initial={{ translateY: -100 }}
          animate={{ translateY: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <img
            data-auto={`navbar-logo-image-every-page`}
            className="h-12 w-12 object-cover rounded-full shadow-md"
            src={`/assets/logo.png`}
            alt={""}
          />
        </motion.div>

        <motion.h1
          initial={{ translateY: 100 }}
          animate={{ translateY: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          data-auto={`navbar-logo-business-name-every-page`}
          className="text-lg  text-primary font-bold"
        >
          Garage Booking
        </motion.h1>
      </NavLink>

      {/* MOBILE VIEW LOGO */}
      <NavLink
        data-auto={`navbar-mobile-logo-every-page`}
        to={`/`}
        data-tip={"Garage Booking"}
        className="w-full tooltip tooltip-bottom tooltip-primary flex justify-center items-center md:hidden"
      >
        <motion.div
          initial={{ translateY: -100 }}
          animate={{ translateY: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <img
            data-auto={`navbar-mobile-logo-image-every-page`}
            className="h-16 w-16 object-cover rounded-full shadow-md"
            src={`/assets/logo.png`}
            alt={""}
          />
        </motion.div>
      </NavLink>

      <motion.div
        data-cy="header_profile_container"
        className="w-full flex justify-end items-center gap-x-8"
      >
        {user?.first_Name ? (
          <div data-cy="profile" className="flex items-center relative">
            {/* PROFILE BUTTON  */}
            <button
              data-auto={`navbar-profile-button-every-page`}
              className="flex relative tooltip tooltip-left tooltip-primary items-center gap-2"
              onClick={() => setProfileToggle(!profileToggle)}
            >
              <span className="ml-[0.1rem] animate-ping absolute inline-flex h-[90%] w-[90%] rounded-full bg-primary bg-opacity-60 opacity-75"></span>
              {user?.image ? (
                <div className="avatar">
                  <div className="w-10 ring ring-primary  rounded-full">
                    <img src={getFullImageLink(user?.image)} />
                  </div>
                </div>
              ) : (
                <div className="avatar placeholder">
                  <div className="bg-primary text-base-300 rounded-full w-10">
                    <span className="text-md font-medium">
                      {user?.first_Name?.slice(0, 1).toUpperCase()}
                      {user?.middle_Name
                        ? user?.middle_Name?.slice(0, 1).toUpperCase()
                        : ""}
                      {user?.last_Name?.slice(0, 1).toUpperCase()}
                    </span>
                  </div>
                </div>
              )}
            </button>
            {/* PROFILE DROPDOWN  */}
            <OutsideClickHandler
              onOutsideClick={() => {
                setProfileToggle(false);
              }}
              className={`absolute profileDropdown z-50 right-0  bg-base-200 w-auto mt-6 pt-5 overflow-hidden shadow-xl rounded-xl ${
                profileToggle ? "block top-10" : "hidden top-64"
              }`}
            >
              <div className="w-[270px] flex flex-col items-start">
                <div className="border-b border-primary-content pb-3 flex justify-between w-full px-5">
                  <button
                    data-auto={`navbar-profile-inside-button-every-page`}
                    className=" flex justify-start gap-3 items-center "
                    onClick={() => navigate("/profile")}
                  >
                    {user?.image ? (
                      <div className="avatar">
                        <div className="w-10 ring ring-primary  rounded-full">
                          <img src={getFullImageLink(user?.image)} />
                        </div>
                      </div>
                    ) : (
                      <div className="avatar placeholder">
                        <div className="bg-primary text-base-300 rounded-full w-10">
                          <span className="text-md font-medium">
                            {user?.first_Name?.slice(0, 1).toUpperCase()}
                            {user?.middle_Name
                              ? user?.middle_Name?.slice(0, 1).toUpperCase()
                              : ""}
                            {user?.last_Name?.slice(0, 1).toUpperCase()}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col gap-y-1 justify-start items-start">
                      <h1 className="leading-4  text-primary font-medium text-left">
                        {user?.first_Name}{" "}
                        {user?.middle_Name ? user?.middle_Name : ""}{" "}
                        {user?.last_Name}
                      </h1>
                      <span className="text-gray-500 text-xs font-light">
                        {formatRole(user?.roles[0]?.name)}
                      </span>
                    </div>
                  </button>
                </div>
                <button
                  data-auto={`navbar-logout-button-every-page`}
                  className="px-5 group py-3 w-full text-left text-primary300 hover:bg-primary hover:text-base-300 flex items-center gap-3"
                  onClick={() => {
                    navigate("/my-account/profile");
                  }}
                >
                  <TbLogout2 className="text-xl" />
                  Notification
                </button>
                <button
                  data-auto={`navbar-logout-button-every-page`}
                  className="px-5 group py-3 w-full text-left text-red-500 hover:bg-red-500 hover:text-base-300 flex items-center gap-3"
                  onClick={logout}
                >
                  <TbLogout2 className="text-xl" />
                  Logout
                </button>
              </div>
            </OutsideClickHandler>
          </div>
        ) : (
          ""
        )}
      </motion.div>
    </motion.nav>
  );
}
