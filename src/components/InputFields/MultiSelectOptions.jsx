import React, { Fragment, useEffect, useState } from "react";
import { OutsideClickHandler } from "../OutsideClickHandler";
import ButtonLoading from "../ButtonLoading";
// Options Component
const CustomMultiSelect = ({
  componentLoading,
  selectedValues,
  filteredOptions,
  showCheckbox,
  singleSelect,
  CustomCheckIcon,
  CustomCloseIcon,
  setSelectedValues,
  addNewItemButton,
  onClickAddNewItemButton,
  emptyRecordMsg,
  maxHeight,
  isOptionOpen,
  setIsOptionOpen,
}) => (
  <OutsideClickHandler
    className={`absolute bottom-full -mb-7 z-30 bg-base-300 duration-200 transition-all overflow-hidden ${
      isOptionOpen ? "opacity-100 h-auto block" : "opacity-0 h-0 hidden"
    } shadow-lg border-2 border-primary rounded-md w-full left-0`}
    onOutsideClick={() => {
      setIsOptionOpen(false);
    }}
  >
    <div
      className={`overflow-y-auto px-0 py-0 overflow-x-hidden ${maxHeight}  scrollbar scrollbar-thumb-primary-content scrollbar-track-gray-100`}
    >
      {componentLoading ? (
        <div className="flex justify-center items-center py-5">
          <ButtonLoading />
        </div>
      ) : filteredOptions.length > 0 ? (
        filteredOptions.map((opt, index) => (
          <Fragment key={index}>
            <button
              onClick={() => {
                if (selectedValues?.some((s_opt) => s_opt?.id === opt?.id)) {
                  setSelectedValues(
                    selectedValues?.filter((s_opt) => s_opt?.id !== opt?.id)
                  );
                } else {
                  if (singleSelect) {
                    setSelectedValues([opt]);
                  } else {
                    setSelectedValues([...selectedValues, opt]);
                  }
                }
              }}
              className={`px-5 py-1 justify-between w-full flex gap-2 items-center ${
                showCheckbox &&
                selectedValues?.some((s_opt) => s_opt?.id === opt?.id)
                  ? "bg-primary text-base-300"
                  : "hover:bg-primary-content"
              }`}
            >
              <span className="inline-flex gap-2 items-center text-left w-full">
                {opt?.Icon && <opt.Icon />} {opt?.label}
              </span>

              {selectedValues?.some((s_opt) => s_opt?.id === opt?.id) &&
                showCheckbox && (
                  <CustomCheckIcon
                    className={`${
                      selectedValues?.some((s_opt) => s_opt?.id === opt?.id)
                        ? "text-base-300"
                        : ""
                    }`}
                  />
                )}
            </button>
            {index + 1 < filteredOptions.length ? <hr /> : ""}
          </Fragment>
        ))
      ) : (
        <div className="flex justify-center items-center py-5">
          <span className={`font-bold text-red-500`}>{emptyRecordMsg}</span>
        </div>
      )}
    </div>
    {addNewItemButton && (
      <button
        onClick={onClickAddNewItemButton}
        className={`w-full text-center bg-primary text-base-300 py-2 hover:bg-primary-focus`}
      >
        Add New
      </button>
    )}
  </OutsideClickHandler>
);

export const MemoizedOptionsComponent = React.memo(CustomMultiSelect);
