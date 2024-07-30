import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <div
      className={`bg-primary w-full h-[80px]  text-base-300 px-5 md:px-32 flex justify-center items-center`}
    >
      <div
        className={`flex justify-center md:justify-between items-center h-full w-full flex-col md:flex-row`}
      >
        {/* COPYRIGHT  */}
        <div className={`text-center text-md`}>
          Copyright © {new Date().getFullYear()} All Rights Reserved by{" "}
          <span className={`text-base-100 font-bold`}>Garage Booking</span>
        </div>

        {/* TERMS AND CONDITIOONS  */}
        <div className={`w-60 flex justify-between items-center `}>
          <NavLink className={`hover:font-bold`}>Terms & Conditions</NavLink>
          <NavLink className={`hover:font-bold`}>Privacy & Policy</NavLink>
        </div>
      </div>
    </div>
  );
}
