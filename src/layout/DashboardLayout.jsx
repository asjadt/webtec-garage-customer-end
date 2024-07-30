// ==================================
// #00106
// ==================================

import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./SideBar/Sidebar";
import { useNav } from "../context/NavContext";

export default function DashboardLayout() {
  const {isNavOpen} = useNav()
  if (!JSON.parse(localStorage.getItem("user_data"))) {
    <Navigate to={"/"} replace />;
  } else {
    return (
      <div
        className={` text-neutral h-screen w-full bg-base-200 flex justify-between items-center  pb-5`}
      >
        <Sidebar />
        <main className={` w-full scrollbar h-full overflow-y-auto`}>
          <div className="w-full fixed z-40">
            <Navbar />
          </div>
          <div
            className={`${
              isNavOpen ? "md:pl-[11rem] md:ml-[90px]" : "md:ml-[0px]"
            }  duration-300 transition-all pl-4 pb-5 pt-24 md:pt-[7rem] md:p-10 md:pl-9 pr-4 md:pr-9 `}
          >
            <Outlet />
          </div>
        </main>

        {/* <footer className={`px-1 md:px-3 hidden`}>Footer</footer> */}
      </div>
    );
  }
}
