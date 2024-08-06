import {
  FiArrowRightCircle,
  FiChevronRight,
  FiPieChart,
  FiUserPlus,
} from "react-icons/fi";
import { BsFillFuelPumpFill, BsFuelPump } from "react-icons/bs";
import { IoBookmarkOutline, IoHomeOutline } from "react-icons/io5";
import { GoBriefcase } from "react-icons/go";
import { LuFileClock } from "react-icons/lu";
import { MdAccountCircle } from "react-icons/md";
import { Home } from "lucide-react";
import { BiHome, BiHomeAlt2 } from "react-icons/bi";

export const menus = () => {
  return [
    // DASHBOARD
    {
      title: "Home",
      link: "/",
      Icon: IoHomeOutline,
      childrens: [],
      show: true,
    },
    {
      title: "Fuel Station",
      link: "/fuel-station",
      Icon: BsFuelPump,
      childrens: [],
      show: true,
    },
    // PRIVATE ROUTES
    // ==========================
    {
      title: "Dashboard",
      link: "/my-account",
      Icon: FiPieChart,
      childrens: [
        {
          title: "My Account",
          link: "/my-account/Profile",
          Icon: MdAccountCircle,
          childrens: [],
          show: JSON.parse(localStorage.getItem("user_data")),
        },
        {
          title: "Notification",
          link: "/my-account/all-notifications",
          Icon: IoBookmarkOutline,
          childrens: [],
          show: JSON.parse(localStorage.getItem("user_data")),
        },
        {
          title: "Bookings",
          link: "/my-account/my-bookings",
          Icon: IoBookmarkOutline,
          childrens: [],
          show: JSON.parse(localStorage.getItem("user_data")),
        },
        {
          title: "My Jobs",
          link: "/my-account/my-jobs",
          Icon: GoBriefcase,
          childrens: [],
          show: JSON.parse(localStorage.getItem("user_data")),
        },
        {
          title: "Pending Jobs",
          link: "/my-account/pending-jobs",
          Icon: LuFileClock,
          childrens: [],
          show: JSON.parse(localStorage.getItem("user_data")),
        },
      ],
      show: JSON.parse(localStorage.getItem("user_data")),
    },
  ];
};
