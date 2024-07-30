import React from "react";
import Popup from "reactjs-popup";

export default function CustomPopupModern({
  popupOption,
  setPopupOption,
  Component,
  popupClasses,
  closeButtonHidden = false,
}) {

  return (
    <Popup
      open={popupOption?.open}
      onClose={popupOption.onClose}
      overlayStyle={
        {
          // background: "rgba(0,0,0,0.5)",
          // backdropFilter: "blur(2px)",
        }
      }
      closeOnDocumentClick={popupOption?.closeOnDocumentClick}
      className="relative overflow-hidden w-1/2 rounded-xl pop"
    >
      <div
        className={`relative h-full bg-primary  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10
       shadow-xl rounded-xl border-primary-content border-2 overflow-hidden w-[95vw] ${popupClasses} h-[90vh] `}
      >
        {/* {!closeButtonHidden ? (
          <button
            onClick={() =>
              setPopupOption({
                ...popupOption,
                open: false,
              })
            }
            className="absolute high-zindex top-3 right-3 w-9 h-9 rounded-full bg-primary-content flex justify-center items-center"
          >
            <FiX className="text-primary text-xl" />
          </button>
        ) : (
          ""
        )} */}

        <div className="max-h-[90vh] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-primary">
          {Component}
        </div>
      </div>
    </Popup>
  );
}
