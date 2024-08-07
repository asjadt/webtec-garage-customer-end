// ===========================================
// #00108
// ===========================================

import { motion } from "framer-motion";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./SideBar/Sidebar";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div
      data-cy="hrm_app"
      className={`p-0 md:p-5 bg-base-100 md:h-[100vh] h-[97vh]`}
    >
      <Navbar />

      <div
        data-cy="main_container"
        className={`flex md:mt-3 relative h-[calc(100%-80px)] md:h-[calc(100%-80px)]`}
      >
        <div
          data-cy="main-sidebar"
          className={`main-sidebar w-[335px] md:w-[235px] absolute h-full block transition-all duration-300
        `}
        >
          <Sidebar />
        </div>

        <motion.div
          data-cy="public_layout_outlet"
          className={`scroll-smooth flex-grow overflow-x-hidden overflow-y-auto bg-base-300 w-[500px] h-full md:rounded-[15px] scrollbar  transition-all duration-300 delay-300 `}
        >
          <Outlet />
          {/* <Footer /> */}
        </motion.div>
      </div>
    </div>
  );
}
