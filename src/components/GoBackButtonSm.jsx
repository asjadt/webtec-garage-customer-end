import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

export default function GoBackButtonSm({
  bgColorClass = "btn-primary",
  textColorClass = "text-base-300",
}) {
  const navigate = useNavigate();
  return (
    <button
      data-cy={"button_go_back_button"}
      data-tip="Go Back"
      className={`tooltip tooltip-primary tooltip-bottom z-[20] ${bgColorClass} shadow-sm rounded w-10 h-10 text-sm flex items-center justify-center  hover:scale-90 duration-100`}
      onClick={() => {
        navigate(-1);
      }}
    >
      <IoIosArrowBack className={`text-2xl md:text-md ${textColorClass}`} />{" "}
    </button>
  );
}
