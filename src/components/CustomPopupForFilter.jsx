import React from "react";
import { FiX } from "react-icons/fi";
import Popup from "reactjs-popup";
import { useNav } from "../context/NavContext";

export default function CustomPopupForFilter({
  popupOption,
  setPopupOption,
  Component,
  popupClasses,
  closeButtonHidden = false,
}) {
  const { setIsNavOpen } = useNav();
  // useEffect(() => {
  //   if (popupOption.open) {
  //     setIsNavOpen(false);
  //   }
  // }, [popupOption.open]);
  return (
    <Popup
      open={popupOption?.open}
      onClose={popupOption.onClose}
      overlayStyle={{
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(2px)",
      }}
      closeOnDocumentClick={popupOption?.closeOnDocumentClick}
      className="relative overflow-hidden w-1/2 rounded-xl pop"
    >
      <div
        className={`relative bg-base-300 shadow-xl rounded-xl border-primary-content border-2  w-[350px] ${popupClasses} max-h-[90vh] `}
      >
        {!closeButtonHidden ? (
          <button
            onClick={() =>
              setPopupOption({
                ...popupOption,
                open: false,
              })
            }
            className="absolute high-zindex top-3 right-3 w-6 h-6 rounded-full bg-primary-content flex justify-center items-center"
          >
            <FiX className="text-primary text-sm" />
          </button>
        ) : (
          ""
        )}

        {popupOption?.title && (
          <div className="w-full px-5 py-2 rounded-md text-primary font-semibold text-lg absolute top-0 z-50 bg-base-300">
            {popupOption?.title}
          </div>
        )}

        <div className="px-5 max-h-[90vh]  scrollbar-thin scrollbar-thumb-primary pt-14">
          {Component}
        </div>
      </div>
    </Popup>
  );
}
