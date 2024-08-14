// ===========================================
// #00108
// ===========================================

import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import MobileMenu from "./MobileMenu/MobileMenu";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./SideBar/Sidebar";

export default function PublicLayout() {
  // const { isNavOpen, isDark } = useNav();
  return (
    <div data-cy="hrm_app" className={`p-0 bg-base-100`}>
      <Navbar />

      <div
        data-cy="main_container"
        className={`flex relative h-[calc(100vh-55px)] sm:h-screen`}
      >
        <Sidebar />

        <motion.div
          data-cy="public_layout_outlet"
          className={`scroll-smooth pt-[5rem] pb-[5rem] sm:pb-0 flex-grow overflow-x-hidden overflow-y-auto bg-base-300 w-[500px] h-full scrollbar transition-all duration-300 delay-300 `}
        >
          <Outlet />
        </motion.div>

        <MobileMenu />
      </div>
    </div>
  );
}
