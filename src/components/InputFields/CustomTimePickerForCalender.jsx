import React, { useEffect, useState } from "react";
import { OutsideClickHandler } from "../OutsideClickHandler";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { FaRegClock } from "react-icons/fa";
import { GiAnticlockwiseRotation } from "react-icons/gi";
import { convertTo12HourFormat } from "../../utils/convertTo12HourFormat";
import { convertTo24HourFormat } from "../../utils/convertTo24HourFormat";

export default function CustomTimePickerForCalender({
  value = "00:00:00",
  onChange = (e) => {
    return e;
  },
  minTime,
  maxTime,
  isResetTime,
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
      setSelectedHour(parseInt(convertTo12HourFormat(value)?.split(":")[0]));
      setSelectedMin(
        parseInt(convertTo12HourFormat(value).split(":")[1]?.split(" ")[0])
      );
      setSelectedAmOrPm(
        convertTo12HourFormat(value)?.split(":")[1]?.split(" ")[1]
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
    if (selectedMin < 59) {
      setSelectedMin(selectedMin + 1);
    } else {
      setSelectedMin(0);
    }
    setIsInitial(false);
  };

  const decreaseMin = () => {
    if (selectedMin > 0) {
      setSelectedMin(selectedMin - 1);
    } else {
      setSelectedMin(59);
    }
    setIsInitial(false);
  };

  const reset = () => {
    setSelectedHour(0);
    setSelectedMin(0);
    setIsInitial(false);
  };

  useEffect(() => {
    if (isResetTime !== undefined) {
      reset();
    }
  }, [isResetTime]);
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
                selectedMin < 10 ? `0${selectedMin}` : selectedMin
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
                selectedMin < 10 ? `0${selectedMin}` : selectedMin
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
                selectedMin < 10 ? `0${selectedMin}` : selectedMin
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
              selectedMin < 10 ? `0${selectedMin}` : selectedMin
            } ${selectedAmOrPm}`
          );
        }
      }
    }
  }, [selectedAmOrPm, selectedHour, selectedMin]);

  return (
    <div className={` border-t flex flex-col justify-center items-center`}>
      <h1 className={`text-primary text-lg mt-2`}>Pick Time</h1>
      <div
        className={` px-2 mt-2 relative w-full flex  flex-col top-full rounded-xl duration-300 items-center bg-base-300 ${
          minTime || maxTime ? "h-[140px] w-[195px]" : "h-[115px] w-[170px]"
        } opacity-100 flex`}
      >
        <div className={`flex items-center`}>
          {/* HOURS  */}
          <div className="flex flex-col text-4xl">
            <button>
              <TiArrowSortedUp
                onClick={increaseHour}
                className="hover:text-primary"
              />
            </button>
            <div>{selectedHour < 10 ? `0${selectedHour}` : selectedHour}</div>
            <button>
              <TiArrowSortedDown
                onClick={decreaseHour}
                className="hover:text-primary"
              />
            </button>
          </div>
          <div className="text-4xl mb-2 mr-0">:</div>
          {/* MIUITES  */}
          <div className="flex flex-col text-4xl items-center justify-center">
            <button>
              <TiArrowSortedUp
                onMouseDown={increaseMin}
                className="hover:text-primary"
              />
            </button>
            <div>{selectedMin < 10 ? `0${selectedMin}` : selectedMin}</div>
            <button>
              <TiArrowSortedDown
                onMouseDown={decreaseMin}
                className="hover:text-primary"
              />
            </button>
          </div>
          {/* AM/PM  */}
          <div className="flex flex-col text-md ml-5 gap-2 relative">
            <button
              onClick={() => {
                setSelectedAmOrPm("AM");
              }}
              className={`${
                selectedAmOrPm === "AM" && "bg-primary text-base-300"
              } hover:bg-primary-content  px-2 rounded-xl py-[0.10rem]`}
            >
              AM
            </button>
            <button
              onClick={() => {
                setSelectedAmOrPm("PM");
              }}
              className={`${
                selectedAmOrPm === "PM" && "bg-primary text-base-300"
              } hover:bg-primary-content px-2 rounded-xl py-[0.10rem]`}
            >
              PM
            </button>
          </div>
        </div>

        {/* RANGE  */}
        <div className={`text-xs text-red-500`}>
          {minTime && maxTime && (
            <>
              Allowed from{" "}
              <span className={`font-medium`}>
                {convertTo12HourFormat(minTime)}
              </span>{" "}
              to{" "}
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
      </div>
    </div>
  );
}
