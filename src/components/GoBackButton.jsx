import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

export default function GoBackButton({
  bgColorClass = "btn-primary",
  textColorClass = "text-base-300",
}) {
  const navigate = useNavigate();
  return (
    <button
      data-cy={"button_go_back_button"}
      data-tip="Go Back"
      className={`btn tooltip tooltip-primary tooltip-bottom btn-sm z-[20] ${bgColorClass} shadow-sm px-0 py-0 btn-circle md:btn-square w-10 md:w-36 h-10 md:h-[3rem] text-sm flex md:text-md items-center justify-center md:px-5 md:py-1 hover:scale-90 duration-100`}
      onClick={() => {
        navigate(-1);
      }}
    >
      <IoIosArrowBack className={`text-2xl md:text-md ${textColorClass}`} />{" "}
      <span
        data-cy={"button_content_go_back_button"}
        className={`hidden md:block ${textColorClass}`}
      >
        Go Back
      </span>
    </button>
  );
}
