// ===========================================
// #00108
// ===========================================

import { motion } from "framer-motion";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./SideBar/Sidebar";
import { Outlet } from "react-router-dom";
import NavbarForDashboard from "./Navbar/NavbarForDashboard";
import MobileMenu from "./MobileMenu/MobileMenu";

export default function DashboardLayout() {
  return (
    <div
      data-cy="hrm_app"
      className={`p-0 md:p-5 bg-base-100 md:h-[100vh] h-[97vh]`}
    >
      <NavbarForDashboard />

      <div
        data-cy="main_container"
        className={`flex md:mt-3 relative h-[calc(100%-80px)]`}
      >
        <Sidebar />

        <motion.div
          data-cy="public_layout_outlet"
          className={`scroll-smooth flex-grow px-5 md:px-10 overflow-y-auto bg-base-300 w-[500px] h-full md:rounded-[15px] scrollbar  transition-all duration-300 delay-300 `}
        >
          <Outlet />
          {/* <Footer /> */}
        </motion.div>
        <MobileMenu />
      </div>
    </div>
  );
}
