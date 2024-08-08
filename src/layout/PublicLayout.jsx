// ===========================================
// #00108
// ===========================================

import { motion } from "framer-motion";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./SideBar/Sidebar";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  // const { isNavOpen, isDark } = useNav();
  return (
    <div data-cy="hrm_app" className={`p-0 bg-base-100`}>
      <Navbar />

      <div data-cy="main_container" className={`flex relative h-screen`}>
        <Sidebar />

        <motion.div
          data-cy="public_layout_outlet"
          className={`scroll-smooth mt-[5rem] flex-grow overflow-x-hidden overflow-y-auto bg-base-300 w-[500px] h-full scrollbar transition-all duration-300 delay-300 `}
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}
