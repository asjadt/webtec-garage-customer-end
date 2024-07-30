import { FiArrowRightCircle, FiChevronRight, FiPieChart, FiUserPlus } from "react-icons/fi";
import { BsFillFuelPumpFill } from "react-icons/bs";
export const menus = [
  // DASHBOARD
  {
    title: "Home",
    link: "/",
    Icon: FiPieChart,
    childrens: [],
    show: true,
  },
  {
    title: "Fuel Station",
    link: "/fuel-station",
    Icon: BsFillFuelPumpFill,
    childrens: [],
    show: true,
  },

  // PRIVATE ROUTES
  // ==========================
  {
    title: "Bookings",
    link: "/my-account/my-booking",
    Icon: FiPieChart,
    childrens: [],
    show: JSON.parse(localStorage.getItem("user_data")),
  },
  {
    title: "Applied Jobs",
    link: "/my-account/my-jobs",
    Icon: FiPieChart,
    childrens: [],
    show: JSON.parse(localStorage.getItem("user_data")),
  },
  {
    title: "Pending Jobs",
    link: "/my-account/pending/jobs",
    Icon: FiPieChart,
    childrens: [],
    show: JSON.parse(localStorage.getItem("user_data")),
  },
  {
    title: "My Account",
    link: "/my-account",
    Icon: FiPieChart,
    childrens: [],
    show: JSON.parse(localStorage.getItem("user_data")),
  },
  // ============================


  {
    title: "Register",
    link: "/auth/register",
    Icon: FiUserPlus,
    childrens: [],
    show: !JSON.parse(localStorage.getItem("user_data")),
  },
  {
    title: "Log in",
    link: "/auth/login",
    Icon: FiArrowRightCircle,
    childrens: [],
    show: !JSON.parse(localStorage.getItem("user_data")),
  },

];
