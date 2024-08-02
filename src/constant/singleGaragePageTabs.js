import { BiSolidCarGarage } from "react-icons/bi";
import { LuCalendarCheck } from "react-icons/lu";
import { TbPackages } from "react-icons/tb";

export const singleGaragePageTabs = [
  { id: "booking", title: "Booking", Icon: LuCalendarCheck },
  { id: "details", title: "Details", Icon: BiSolidCarGarage },
  { id: "packages", title: "Packages", Icon: TbPackages },
];

export const singleGaragePageTabsWithoutPackage = [
  { id: "booking", title: "Booking", Icon: LuCalendarCheck },
  { id: "details", title: "Details", Icon: BiSolidCarGarage },
];
