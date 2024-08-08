// ===========================================
// #00102
// ===========================================
import { NavLink } from "react-router-dom";

import { useEffect, useState } from "react";
import { FiArrowRightCircle, FiUserPlus } from "react-icons/fi";
import CustomMenuLoading from "../../components/CustomMenuLoading";
import { menus } from "../../constant/menus";
import { useAuth } from "../../context/AuthContextV2";
import { useNav } from "../../context/NavContext";
import SidebarGenerator from "../../utils/SidebarGenerator";

export default function Sidebar() {
  const { isLoading, handleOpenLoginPopup, handleOpenSignUpPopup } = useAuth();
  const { isNavOpen, isDark } = useNav();
  const user = JSON.parse(localStorage.getItem("userData"));

  const [htmlMode, setHtmlMode] = useState("");
  useEffect(() => {
    setHtmlMode(document.documentElement.getAttribute("data-theme"));
  }, [isDark]);

  return (
    <div
      className={`absolute z-40  transition-all group duration-300 w-[220px] md:w-[220px] ${
        isNavOpen ? "left-[0px]" : "left-[-250px]"
      }  rounded-r-none md:rounded-xl overflow-y-auto  scrollbar-none  bg-base-300 shadow-xl text-base-100 flex-col flex h-full`}
    >
      <div className={`border-b border-base-300`}>
        <NavLink
          data-cy={`every-page-dashboard-button-sidebar`}
          to={"/"}
          className={`justify-center w-full flex  bg-primary items-center py-3 px-2 gap-2`}
        >
          <span className={`text-base-300 text-center duration-300 font-bold`}>
            Garage Booking
          </span>
        </NavLink>
      </div>

      <div
        className={`nav_menu flex flex-col gap-2 items-center md:items-start `}
      >
        {isLoading ? (
          <CustomMenuLoading />
        ) : (
          <>
            <SidebarGenerator links={menus()} isNested={false} />
            <>
              {!JSON.parse(localStorage.getItem("user_data")) && (
                <>
                  <div
                    onClick={handleOpenSignUpPopup}
                    className={`cursor-pointer flex items-center w-full justify-start`}
                  >
                    <span
                      data-cy={`all-page-register-button-sidebar-menu-item`}
                      data-tip={`Register`}
                      className={` w-full transition-all font-semibold duration-200 flex items-center gap-3 justify-start py-3 px-5 text-primary`}
                    >
                      <span className={`inline-block `}>
                        <FiUserPlus className={`Icon text-2xl`} />
                      </span>

                      <span
                        className={` text-sm duration-300  border-base-100 break-words text-left`}
                      >
                        Register
                      </span>
                    </span>
                  </div>

                  <div
                    onClick={handleOpenLoginPopup}
                    className={`cursor-pointer flex items-center w-full justify-start`}
                  >
                    <span
                      data-cy={`all-page-register-button-sidebar-menu-item`}
                      data-tip={`Login`}
                      className={` w-full transition-all font-semibold duration-200 flex items-center gap-3 justify-start py-3 px-5 text-primary`}
                    >
                      <span className={`inline-block `}>
                        <FiArrowRightCircle className={`Icon text-2xl`} />
                      </span>

                      <span
                        className={` text-sm duration-300  border-base-100 break-words text-left`}
                      >
                        Login
                      </span>
                    </span>
                  </div>
                </>
              )}
            </>
          </>
        )}
      </div>
    </div>
  );
}
