import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import Popup from "reactjs-popup";
import { useNav } from "../context/NavContext";

export default function CustomPopup({
  popupOption,
  setPopupOption,
  Component,
  popupClasses,
  closeButtonHidden = false,
  setIsOpen,
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const customPopupStyle = isMobile
    ? {
        margin: "0px",
        width: "100%",
      }
    : {
        margin: "100px auto",
      };
  return (
    <Popup
      open={popupOption?.open}
      onClose={popupOption.onClose}
      overlayStyle={{
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(2px)",
      }}
      closeOnDocumentClick={popupOption?.closeOnDocumentClick}
      className="relative overflow-hidden w-1/2 rounded-xl pop "
      contentStyle={customPopupStyle}
    >
      <div
        className={`relative bg-base-300 shadow-xl sm:rounded-xl border-primary-content sm:border-2 overflow-hidden max-h-screen h-screen sm:h-auto sm:min-h-auto md:max-h-[90vh]  ${popupClasses}`}
      >
        {!closeButtonHidden ? (
          <button
            onClick={() => {
              setPopupOption({
                ...popupOption,
                open: false,
              });
              setIsOpen && setIsOpen(false);
            }}
            className="absolute high-zindex top-3 right-3 w-9 h-9 rounded-full bg-primary-content flex justify-center items-center"
          >
            <FiX className="text-primary text-xl" />
          </button>
        ) : (
          ""
        )}

        {popupOption?.title && (
          <div className="w-full px-8 py-5 text-primary font-semibold text-2xl absolute top-0 z-50 bg-base-300">
            {popupOption?.title}
          </div>
        )}

        <div className="px-5 max-h-full sm:max-h-[70vh] overflow-y-auto overflow-x-hidden scrollbar pt-14">
          {Component}
        </div>
      </div>
    </Popup>
  );
}
