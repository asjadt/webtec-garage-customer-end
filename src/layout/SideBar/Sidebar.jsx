// ===========================================
// #00102
// ===========================================
import { NavLink } from "react-router-dom";

import { useEffect, useState } from "react";
import { menus } from "../../constant/menus";
import SidebarGenerator from "../../utils/SidebarGenerator";
import { useNav } from "../../context/NavContext";

export default function Sidebar() {
  const { isNavOpen, isDark } = useNav();
  const user = JSON.parse(localStorage.getItem("userData"));

  const [htmlMode, setHtmlMode] = useState("");
  useEffect(() => {
    setHtmlMode(document.documentElement.getAttribute("data-theme"));
  }, [isDark]);

  return (
    <div
      className={`absolute  z-40  transition-all group duration-300 w-[220px] md:w-[220px] ${
        isNavOpen ? "left-[0px]" : "left-[-250px]"
      }  rounded-r-none md:rounded-xl overflow-y-auto  scrollbar-none  bg-base-300 shadow-xl text-base-100 flex-col flex h-full`}
    >
      <div className={`border-b border-base-300`}>
        <NavLink
          data-cy={`every-page-dashboard-button-sidebar`}
          to={"/"}
          className={`justify-center w-full flex  bg-primary items-center py-3 px-2 gap-2`}
        >
          <span
            className={`text-base-300 text-center duration-300 font-bold`}
          >
            Garage Booking
          </span>
        </NavLink>
      </div>

      <div
        className={`nav_menu flex flex-col gap-2 items-center md:items-start `}
      >
        <SidebarGenerator links={menus} isNested={false} />
      </div>
    </div>
  );
}
