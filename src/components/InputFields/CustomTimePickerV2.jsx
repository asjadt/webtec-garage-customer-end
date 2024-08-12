import React, { useEffect, useState } from "react";
import { OutsideClickHandler } from "../OutsideClickHandler";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { FaRegClock } from "react-icons/fa";
import { GiAnticlockwiseRotation } from "react-icons/gi";
import { convertTo12HourFormat } from "../../utils/convertTo12HourFormat";
import { convertTo24HourFormat } from "../../utils/convertTo24HourFormat";
import { FiMinus, FiPlus } from "react-icons/fi";
import { BiReset } from "react-icons/bi";

export default function CustomTimePickerV2({
  id,
  label,
  required = false,
  name,
  value = "",
  placeholder = "pick a time",
  onChange = (e) => {
    return e;
  },
  error,
  minTime,
  maxTime,
  defaultValue,
  disable = false,
  wrapperClassName,
  fieldClassName,
  visibleBorder = false,
  right = false,
  minStep = 15,
  dataAuto,
  isSeparatelyEditable = false,
}) {
  const [selectedHour, setSelectedHour] = useState(
    value ? parseInt(convertTo12HourFormat(value, 30)?.split(":")[0]) : 0
  );
  const [selectedMin, setSelectedMin] = useState(
    value
      ? parseInt(convertTo12HourFormat(value, 34)?.split(":")[1]?.split(" ")[0])
      : 0
  );
  const [selectedAmOrPm, setSelectedAmOrPm] = useState(
    value
      ? convertTo12HourFormat(value, 38)?.split(":")[1]?.split(" ")[1]
      : "AM"
  );
  const [openTimeSelector, setOpenTimeSelector] = useState(false);
  const [isInitial, setIsInitial] = useState(true);

  // UPDATE STATE
  useEffect(() => {
    if (value) {
      setSelectedHour(
        parseInt(convertTo12HourFormat(value, 47)?.split(":")[0])
      );
      setSelectedMin(
        parseInt(convertTo12HourFormat(value, 49).split(":")[1]?.split(" ")[0])
      );
      setSelectedAmOrPm(
        convertTo12HourFormat(value, 52)?.split(":")[1]?.split(" ")[1]
      );
    }
  }, [value]);

  // HOUR CHANGE
  const increaseHour = () => {
    if (selectedHour < 12) {
      setSelectedHour(selectedHour + 1);
    } else {
      setSelectedHour(1);
    }
    setIsInitial(false);
  };

  const decreaseHour = () => {
    if (selectedHour > 1) {
      if (selectedHour > 1) {
        setSelectedHour(selectedHour - 1);
      } else {
        setSelectedHour(12);
      }
    } else {
      setSelectedHour(12);
    }
    setIsInitial(false);
  };

  // MIN CHANGE
  const increaseMin = () => {
    if (selectedMin < 59 && selectedMin + minStep <= 59) {
      setSelectedMin(selectedMin + minStep);
    } else {
      setSelectedMin(0);
    }
    setIsInitial(false);
  };

  const decreaseMin = () => {
    if (selectedMin > 0 && selectedMin - minStep >= 0) {
      setSelectedMin(selectedMin - minStep);
    } else {
      setSelectedMin(60 - minStep);
    }
    setIsInitial(false);
  };

  const reset = () => {
    setSelectedHour(0);
    setSelectedMin(0);
    setIsInitial(false);
  };

  const [errorForRestrictions, setErrorForRestrictions] = useState("");

  // AFTER SELECT A NEW TIME
  useEffect(() => {
    setErrorForRestrictions("");
    if (!isInitial) {
      if (selectedHour === 0 && selectedMin === 0) {
        onChange("");
      } else {
        const newTime = convertTo24HourFormat(
          `${selectedHour < 10 ? `0${selectedHour}` : selectedHour}:${
            selectedMin < 10 ? `0${selectedMin}` : selectedMin
          } ${selectedAmOrPm}`
        );
        // IF HAVE MIN TIME AND MAX TIME
        if (minTime && maxTime) {
          if (newTime >= minTime && newTime <= maxTime) {
            onChange(
              `${selectedHour < 10 ? `0${selectedHour}` : selectedHour}:${
                selectedMin < selectedMin ? `0${selectedMin}` : selectedMin
              } ${selectedAmOrPm}`
            );
          } else {
            setErrorForRestrictions(
              "Selected time is outside the allowed range"
            );
          }
        } else if (minTime && !maxTime) {
          // HAVE MIN TIME ONLY
          if (newTime >= minTime) {
            onChange(
              `${selectedHour < 10 ? `0${selectedHour}` : selectedHour}:${
                selectedMin < selectedMin ? `0${selectedMin}` : selectedMin
              } ${selectedAmOrPm}`
            );
          } else {
            setErrorForRestrictions(
              "Selected time is outside the allowed range"
            );
          }
        } else if (!minTime && maxTime) {
          // ONLY HAVE MAX TIME
          if (newTime <= maxTime) {
            onChange(
              `${selectedHour < 10 ? `0${selectedHour}` : selectedHour}:${
                selectedMin < selectedMin ? `0${selectedMin}` : selectedMin
              } ${selectedAmOrPm}`
            );
          } else {
            setErrorForRestrictions(
              "Selected time is outside the allowed range"
            );
          }
        } else {
          onChange(
            `${selectedHour < 10 ? `0${selectedHour}` : selectedHour}:${
              selectedMin < selectedMin ? `0${selectedMin}` : selectedMin
            } ${selectedAmOrPm}`
          );
        }
      }
    }
  }, [selectedAmOrPm, selectedHour, selectedMin]);

  // ON CLICK FULL TEXT SELECT
  const handleClick = (e) => {
    e.target.select(); // Auto-select the input day when clicked
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setOpenTimeSelector(false);
      }}
      className={`relative w-full ${wrapperClassName}`}
      dataAuto={`container-${dataAuto}`}
    >
      {/* LABEL */}
      {label ? (
        <label data-auto={`label-${dataAuto}`} htmlFor={id} className="label">
          {label && (
            <span className="label-text text-md font-bold">
              {label}{" "}
              {required && !disable && (
                <span className="text-error font-bold text-md">*</span>
              )}
            </span>
          )}
        </label>
      ) : (
        ""
      )}

      {/* FIELD  */}
      <div data-auto={`field-container-${dataAuto}`} className={`relative`}>
        <input
          data-auto={`${dataAuto}`}
          onClick={() => {
            setOpenTimeSelector(!openTimeSelector);
          }}
          id={id}
          type="text"
          value={
            isInitial ||
            selectedHour === null ||
            selectedMin === null ||
            (selectedHour === 0 && selectedMin === 0)
              ? value && isInitial
                ? errorForRestrictions
                  ? ""
                  : convertTo12HourFormat(value, 156)
                : ""
              : errorForRestrictions
              ? ""
              : `${selectedHour < 10 ? `0${selectedHour}` : selectedHour}:${
                  selectedMin < 10 ? `0${selectedMin}` : selectedMin
                } ${selectedAmOrPm}`
          }
          disabled={disable}
          name={name}
          defaultValue={defaultValue}
          placeholder={`${placeholder}${required ? "*" : ""}`}
          className={`focus:outline-primary bg-base-300 input w-full rounded-md input-bordered ${
            visibleBorder && "disabled:border-gray-200"
          }  ${fieldClassName}
        `}
        />

        {/* RESET BUTTON  */}
        {!!(isInitial ||
        selectedHour === null ||
        selectedMin === null ||
        (selectedHour === 0 && selectedMin === 0)
          ? value && isInitial
            ? errorForRestrictions
              ? ""
              : convertTo12HourFormat(value, 156)
            : ""
          : errorForRestrictions
          ? ""
          : `${selectedHour < 10 ? `0${selectedHour}` : selectedHour}:${
              selectedMin < 10 ? `0${selectedMin}` : selectedMin
            } ${selectedAmOrPm}`) && (
          <>
            {!disable && (
              <button
                data-auto={`reset-${dataAuto}`}
                data-tip="reset"
                className={`tooltip tooltip-bottom absolute right-2 top-[14px] text-xl text-primary `}
                onClick={reset}
              >
                <BiReset />
              </button>
            )}
          </>
        )}
      </div>

      {/* VALIDATION MESSAGE  */}
      {(error || (openTimeSelector && errorForRestrictions)) && (
        <label data-auto={`error-${dataAuto}`} className="label h-7">
          <span className="label-text-alt text-error">
            {error || errorForRestrictions}
          </span>
        </label>
      )}

      {/* TIME PICKER  */}
      <div
        data-auto={`timePicker-container-${dataAuto}`}
        className={`px-2 py-5 mt-2 absolute border flex flex-col border-primary-content  high-zindex top-full rounded-xl shadow-xl duration-300 items-center bg-base-300 ${
          right ? "right-0" : ""
        }  ${
          openTimeSelector
            ? `${
                minTime || maxTime ? "h-auto w-[300px]" : "h-auto w-[300px]"
              } opacity-100 flex`
            : `h-0 opacity-0 w-[0] hidden`
        }`}
      >
        <div className={`flex items-center gap-x-2`}>
          {/* HOURS  */}
          <div
            data-auto={`hours-container-${dataAuto}`}
            className="flex flex-col text-3xl gap-2"
          >
            <button
              data-auto={`hour-plus-${dataAuto}`}
              onClick={increaseHour}
              className={`px-5 py-1 w-20 border  rounded-xl flex justify-center items-center hover:bg-primary hover:text-base-300 duration-200`}
            >
              <FiPlus className="" />
            </button>
            <input
              data-auto={`hour-input-${dataAuto}`}
              disabled={!isSeparatelyEditable}
              onClick={handleClick}
              type="text"
              className={`px-5 py-1 text-center w-20 border rounded-xl bg-transparent outline-none`}
              value={selectedHour < 10 ? `0${selectedHour}` : selectedHour}
            />

            <button
              data-auto={`hour-minus-${dataAuto}`}
              onClick={decreaseHour}
              className={`px-5 py-1 w-20 border rounded-xl flex justify-center items-center hover:bg-primary hover:text-base-300 duration-200`}
            >
              <FiMinus className="" />
            </button>
          </div>

          <div className="text-4xl mb-2 mr-0">:</div>

          {/* MINUTES  */}
          <div
            data-auto={`minutes-container-${dataAuto}`}
            className="flex flex-col text-3xl gap-2 items-center justify-center"
          >
            <button
              data-auto={`minute-plus-${dataAuto}`}
              onMouseDown={increaseMin}
              className={`px-5 py-1 w-20 border rounded-xl flex justify-center items-center hover:bg-primary hover:text-base-300 duration-200`}
            >
              <FiPlus className="" />
            </button>
            <input
              data-auto={`minute-${dataAuto}`}
              disabled={!isSeparatelyEditable}
              onClick={handleClick}
              type="text"
              className={`px-5 py-1 text-center w-20 border rounded-xl bg-transparent outline-none`}
              value={selectedMin < 10 ? `0${selectedMin}` : selectedMin}
            />
            <button
              data-auto={`minute-minus-${dataAuto}`}
              onMouseDown={decreaseMin}
              className={`px-5 py-1 w-20 border rounded-xl flex justify-center items-center hover:bg-primary hover:text-base-300 duration-200`}
            >
              <FiMinus className="" />
            </button>
          </div>
          {/* AM/PM  */}
          <div
            data-auto={`amPm-container-${dataAuto}`}
            className="flex flex-col text-md ml-5 gap-2 relative"
          >
            <button
              data-auto={`am-${dataAuto}`}
              onClick={() => {
                setSelectedAmOrPm("AM");
              }}
              className={`${
                selectedAmOrPm === "AM"
                  ? "bg-primary text-base-300 hover:text-primary border-primary"
                  : "border-gray-300"
              } hover:bg-primary-content  px-3 rounded-md py-2 border-2`}
            >
              AM
            </button>
            <button
              data-auto={`pm-${dataAuto}`}
              onClick={() => {
                setSelectedAmOrPm("PM");
              }}
              className={`${
                selectedAmOrPm === "PM"
                  ? "bg-primary text-base-300 hover:text-primary border-primary"
                  : "border-gray-300"
              } hover:bg-primary-content  px-3 rounded-md py-2 border-2`}
            >
              PM
            </button>
          </div>
        </div>

        {/* RANGE  */}
        {(minTime && maxTime) ||
          (!minTime && maxTime) ||
          (minTime && !maxTime && (
            <div
              data-auto={`error-${dataAuto}`}
              className={`text-xs text-red-500 flex justify-center items-center h-10 gap-x-1`}
            >
              {minTime && maxTime && (
                <>
                  <span>Allowed from</span>
                  <span className={`font-medium`}>
                    {convertTo12HourFormat(minTime)}
                  </span>
                  <span>to</span>
                  <span className={`font-medium`}>
                    {convertTo12HourFormat(maxTime)}
                  </span>
                </>
              )}
              {!minTime && maxTime && (
                <>
                  Allowed until{" "}
                  <span className={`font-medium`}>
                    {convertTo12HourFormat(maxTime)}
                  </span>
                </>
              )}
              {minTime && !maxTime && (
                <>
                  Allowed after{" "}
                  <span className={`font-medium`}>
                    {convertTo12HourFormat(minTime)}
                  </span>
                </>
              )}
            </div>
          ))}
      </div>
    </OutsideClickHandler>
  );
}
