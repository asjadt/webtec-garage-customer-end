import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  getDaysInMonth,
  startOfMonth,
  format as formatDate,
  addMonths,
  subMonths,
  setYear,
} from "date-fns";
import { OutsideClickHandler } from "../OutsideClickHandler";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import moment from "moment";
import { selectMonth } from "../../utils/selectMonth";
import { BiReset } from "react-icons/bi";
import { isDateInRange } from "../../utils/isDateInRange";
import { IoMdInformationCircle } from "react-icons/io";
import ColorIndicatorDetails from "../ColorIndicatorDetails";
import CustomTimePicker from "./CustomTimePicker";
import CustomTimePickerForCalender from "./CustomTimePickerForCalender";

const CustomDatePickerWithTime = ({
  hint = false,
  hinComponent = <></>,
  specialDates = [],
  format = "dd-LL-yyyy",
  defaultDate,
  fieldClassName,
  id,
  label,
  required = false,
  name,
  value = "",
  placeholder,
  onChange = (e) => {
    return e;
  },
  error,
  defaultValue,
  wrapperClassName,
  top = false,
  right = false,

  disabled = false,

  from = "",
  to = "",

  visibleBorder = false,
  small = false,

  // TIME PROPS
  timeFormat = "",
  timeVale = "",
  onTimeChange = (e) => e,
  minTime = "",
  maxTime = "",
}) => {
  const [step, setStep] = useState("day");
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedYear, setSelectedYear] = useState();

  const [selectedDate, setSelectedDate] = useState(
    value ? new Date(moment(value, "DD-MM-YYYY")) : new Date()
  );

  const [currentMonth, setCurrentMonth] = useState(
    value !== null &&
      value !== undefined &&
      value !== "" &&
      typeof value === "string"
      ? new Date(
          value.split("-")[2],
          value.split("-")[1] - 1,
          value.split("-")[0]
        )
      : new Date()
  );
  const [currentYear, setCurrentYear] = useState(
    value !== null &&
      value !== undefined &&
      value !== "" &&
      typeof value === "string"
      ? new Date(
          value.split("-")[2],
          value.split("-")[1] - 1,
          value.split("-")[0]
        )
      : new Date()
  );
  const [isDatePickerActive, setDatePickerActive] = useState(false);
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    if (!isInitial) {
      if (selectedDate) {
        onChange(formatDate(selectedDate, format));
      } else {
        onChange("");
      }
    }
  }, [selectedDate]);

  useEffect(() => {
    setSelectedDate(defaultDate ? new Date(defaultDate) : "");
  }, [defaultDate]);

  useEffect(() => {
    if (!value) {
      setSelectedDate("");
    }
  }, [value]);

  const handleMonthChange = (newMonth) => {
    setCurrentMonth(newMonth);
    setStep("day");
  };

  const handleChangeYear = (start, end) => {
    console.log({ start, end });
    setStartYear(start);
    setEndYear(end);
    setAllYear(
      Array.from({ length: end - start + 1 }, (_, index) => start + index)
    );
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    // setDatePickerActive(false);
    setIsInitial(false);
  };

  const handleYearChange = (newYear) => {
    setCurrentYear(newYear);
    setStep("day");
  };

  const handleInputClick = () => {
    setDatePickerActive(!isDatePickerActive);
  };

  // RENDER CALENDER
  const renderCalendar = () => {
    console.log({ currentMonth });
    const daysInMonth = getDaysInMonth(
      value ? moment(value, "DD-MM-YYYY").toDate() : currentMonth
    );
    const firstDayOfMonth = startOfMonth(
      value ? moment(value, "DD-MM-YYYY").toDate() : currentMonth
    );
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    return (
      <div className="grid grid-rows-6 grid-cols-7 gap-1">
        {weekDays.map((weekDay) => (
          <div key={weekDay} className="text-center py-2 font-bold">
            {weekDay}
          </div>
        ))}

        {/* EMPTY  */}
        {Array.from({ length: firstDayOfMonth.getDay() }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className={`p-2 ${small ? "h-7 w-7" : "md:h-10 md:w-10 h-7 w-7"}`}
          ></div>
        ))}

        {/* DAYS  */}
        {Array.from({ length: daysInMonth }, (_, index) => index + 1).map(
          (day, i) => (
            <button
              key={i}
              title={
                specialDates.find(
                  (obj) =>
                    obj?.date ===
                    moment(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth(),
                        day
                      )
                    ).format("DD-MM-YYYY")
                )?.title
              }
              disabled={
                specialDates.some(
                  (obj) =>
                    obj?.date ===
                    moment(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth(),
                        day
                      )
                    ).format("DD-MM-YYYY")
                ) &&
                specialDates.find(
                  (obj) =>
                    obj?.date ===
                    moment(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth(),
                        day
                      )
                    ).format("DD-MM-YYYY")
                )?.isDisabled &&
                !isDateInRange(
                  moment(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth(),
                      day
                    )
                  ).format("DD-MM-YYYY"),
                  from,
                  to
                )
              }
              className={`text-center ${
                small ? "h-7 w-7" : "md:h-10 md:w-10 h-7 w-7"
              } rounded-md  flex justify-center items-center ${
                !isDateInRange(
                  moment(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth(),
                      day
                    )
                  ).format("DD-MM-YYYY"),
                  from,
                  to
                )
                  ? `cursor-not-allowed bg-base-100 text-opacity-40 group border border-base-100 text-gray-500 border-opacity-40 relative`
                  : `${
                      specialDates.some(
                        (obj) =>
                          obj?.date ===
                          moment(
                            new Date(
                              currentMonth.getFullYear(),
                              currentMonth.getMonth(),
                              day
                            )
                          ).format("DD-MM-YYYY")
                      )
                        ? `${
                            specialDates.find(
                              (obj) =>
                                obj?.date ===
                                moment(
                                  new Date(
                                    currentMonth.getFullYear(),
                                    currentMonth.getMonth(),
                                    day
                                  )
                                ).format("DD-MM-YYYY")
                            )?.textColor
                          }  ${
                            specialDates.find(
                              (obj) =>
                                obj?.date ===
                                moment(
                                  new Date(
                                    currentMonth.getFullYear(),
                                    currentMonth.getMonth(),
                                    day
                                  )
                                ).format("DD-MM-YYYY")
                            )?.isDisabled
                              ? `cursor-not-allowed group border `
                              : `cursor-pointer`
                          } ${
                            specialDates.find(
                              (obj) =>
                                obj?.date ===
                                moment(
                                  new Date(
                                    currentMonth.getFullYear(),
                                    currentMonth.getMonth(),
                                    day
                                  )
                                ).format("DD-MM-YYYY")
                            )?.borderColor
                          } relative`
                        : `${
                            moment(
                              new Date(
                                currentMonth.getFullYear(),
                                currentMonth.getMonth(),
                                day
                              )
                            ).format("DD-MM-YYYY") ===
                            moment(new Date()).format("DD-MM-YYYY")
                              ? "relative"
                              : ""
                          } cursor-pointer ${
                            selectedDate
                              ? selectedDate &&
                                selectedDate.getDate() === day &&
                                selectedDate.getMonth() ===
                                  currentMonth.getMonth() &&
                                selectedDate.getFullYear() ===
                                  currentMonth.getFullYear()
                                ? "bg-primary text-base-300 border-primary"
                                : "bg-gray-500 bg-opacity-40 border-gray-500 border-opacity-40 hover:border-primary hover:bg-primary-content"
                              : new Date(moment(value, "DD-MM-YYYY")) &&
                                new Date(
                                  moment(value, "DD-MM-YYYY")
                                ).getDate() === day &&
                                new Date(
                                  moment(value, "DD-MM-YYYY")
                                ).getMonth() === currentMonth.getMonth() &&
                                new Date(
                                  moment(value, "DD-MM-YYYY")
                                ).getFullYear() === currentMonth.getFullYear()
                              ? "bg-primary text-base-300 border-primary"
                              : "bg-gray-500 bg-opacity-40 border-gray-500 border-opacity-40 hover:border-primary hover:bg-primary-content"
                          }
                ${
                  today.getFullYear() === currentMonth.getFullYear() &&
                  today.getDate() === day &&
                  today.getMonth() === currentMonth.getMonth()
                }`
                    }  border-2
            `
              } `}
              onClick={(event) => {
                event.preventDefault();
                isDateInRange(
                  moment(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth(),
                      day
                    )
                  ).format("DD-MM-YYYY"),
                  from,
                  to
                ) &&
                  !specialDates.find(
                    (obj) =>
                      obj?.date ===
                      moment(
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth(),
                          day
                        )
                      ).format("DD-MM-YYYY")
                  )?.isDisabled &&
                  handleDateClick(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth(),
                      day
                    )
                  );
              }}
            >
              {day}

              {moment(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth(),
                  day
                )
              ).format("DD-MM-YYYY") ===
              moment(new Date()).format("DD-MM-YYYY") ? (
                <span
                  className={`block absolute bottom-[0.1rem] md:bottom-1 w-1 md:w-[0.3rem] h-1 md:h-[0.3rem] rounded-full bg-primary`}
                ></span>
              ) : (
                ""
              )}
            </button>
          )
        )}

        {/* EMPTY  */}
        {Array.from({
          length: 11 - Array.from({ length: firstDayOfMonth.getDay() })?.length,
        }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className={`p-2 ${small ? "h-7 w-7" : "md:h-10 md:w-10 h-7 w-7"}`}
          ></div>
        ))}
      </div>
    );
  };

  const [allYear, setAllYear] = useState(
    Array.from(
      {
        length:
          parseInt(formatDate(currentMonth, "yyyy")) +
          11 -
          parseInt(formatDate(currentMonth, "yyyy")) +
          1,
      },
      (_, index) => parseInt(formatDate(currentMonth, "yyyy")) + index
    )
  );

  const [startYear, setStartYear] = useState(
    parseInt(formatDate(currentMonth, "yyyy"))
  );
  const [endYear, setEndYear] = useState(
    parseInt(formatDate(currentMonth, "yyyy")) + 11
  );

  useEffect(() => {
    setStartYear(parseInt(formatDate(currentMonth, "yyyy")));
    setEndYear(parseInt(formatDate(currentMonth, "yyyy")) + 11);

    setAllYear(
      Array.from(
        {
          length:
            parseInt(formatDate(currentMonth, "yyyy")) +
            11 -
            parseInt(formatDate(currentMonth, "yyyy")) +
            1,
        },
        (_, index) => parseInt(formatDate(currentMonth, "yyyy")) + index
      )
    );
  }, [currentMonth]);

  const [isResetTime, setIsResetTime] = useState();
  const resetTime = () => {
    setIsResetTime(Math.random());
  };
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setStep("day");
        setDatePickerActive(false);
      }}
      className={`relative ${wrapperClassName}`}
    >
      {selectedDate ? (
        <>
          {!disabled && (
            <button
              data-cy={"reset_button_custom_date_picker"}
              data-tip="reset"
              className={`tooltip tooltip-bottom absolute right-2 ${
                label ? "top-[50px]" : "top-[14px]"
              } text-xl text-primary `}
              onClick={(event) => {
                event.preventDefault();
                setSelectedDate(null);
                resetTime();
              }}
            >
              <BiReset />
            </button>
          )}
        </>
      ) : (
        <>
          {!disabled && (
            <button
              data-cy={"calendar_button_custom_date_picker"}
              data-tip="calender"
              className={`tooltip tooltip-bottom absolute right-2 ${
                label ? "top-[50px]" : "top-[14px]"
              } text-xl text-primary `}
              onClick={(event) => {
                event.preventDefault();
                !disabled && handleInputClick;
              }}
            >
              <FaRegCalendarAlt />
            </button>
          )}
        </>
      )}

      {/* LABEL */}
      {label && (
        <label
          data-cy={"label_container_custom_date_picker"}
          htmlFor={id}
          className="label"
        >
          <span
            data-cy={"label_content_custom_date_picker"}
            className="label-text text-md font-bold"
          >
            {label}{" "}
            {!disabled && required && (
              <span
                data-cy={"label_required_custom_date_picker"}
                className="text-error font-bold text-md"
              >
                *
              </span>
            )}
          </span>
        </label>
      )}

      {/* FIELD  */}
      {/* {console.log({ label, selectedDate })} */}
      <input
        data-cy={"input_custom_date_picker"}
        disabled={disabled}
        id={id}
        type={"text"}
        name={name}
        placeholder={`${placeholder}${required ? "*" : ""}`}
        className={`bg-base-300 ${
          disabled
            ? `${visibleBorder && "disabled:border-gray-200 border-opacity-10"}`
            : ""
        }  focus:outline-primary input rounded-md input-bordered w-full ${fieldClassName}`}
        value={
          (selectedDate
            ? formatDate(selectedDate, format)
            : value
            ? formatDate(new Date(moment(value, "DD-MM-YYYY")), format)
            : "") + (timeVale ? " " + " " + timeVale : "")
        }
        onClick={!disabled && handleInputClick}
        readOnly
      />
      {/* VALIDATION MESSAGE  */}
      {error && (
        <label
          data-cy={"error_message_custom_date_picker"}
          className="label h-7 mt-2"
        >
          <span
            data-cy={"error_content_custom_date_picker"}
            className="label-text-alt text-error"
          >
            {error}
          </span>
        </label>
      )}

      {isDatePickerActive && !disabled && (
        <div
          className={`bg-base-300 flex flex-col ${
            top ? "bottom-full -mb-6" : "top-full mt-2"
          } ${
            right ? "right-0" : "left-0"
          }  border border-primary-content absolute rounded-xl text-sm`}
        >
          <div
            data-cy={"date_picker_active_custom_date_picker"}
            style={{
              zIndex: 50,
            }}
            className={`${
              small
                ? "md:w-[260px] px-3 py-3"
                : "md:w-[360px] px-3 md:px-5 md:py-5"
            } w-[260px] `}
          >
            <div>
              <div
                data-cy={"day_step_container_custom_date_picker"}
                className=""
              >
                {step === "day" && (
                  <div
                    data-cy={"day_step_sub_container_custom_date_picker"}
                    className="mb-4 flex justify-between items-center pt-7 md:pt-0"
                  >
                    <button
                      data-cy={"day_step_button_custom_date_picker"}
                      className="text-lg w-7 md:w-10 h-7 md:h-10 hover:text-base-300 bg-base-300 rounded-full text-accent hover:bg-primary font-bold cursor-pointer"
                      onClick={(event) => {
                        event.preventDefault();
                        handleMonthChange(subMonths(currentMonth, 1));
                      }}
                    >
                      {"<"}
                    </button>

                    <p
                      data-cy={"day_step_button_container_custom_date_picker"}
                      className="text-lg font-bold flex items-center gap-2"
                    >
                      <button
                        data-cy={"day_step_month_button_custom_date_picker"}
                        onClick={() => {
                          setStep("month");
                        }}
                      >
                        {formatDate(currentMonth, "MMMM")}
                      </button>
                      <button
                        data-cy={"day_step_year_button_custom_date_picker"}
                        onClick={() => {
                          setStep("year");
                        }}
                      >
                        {formatDate(currentMonth, "yyyy")}
                      </button>
                    </p>

                    <button
                      data-cy={
                        "day_step_month_change_button_custom_date_picker"
                      }
                      className="text-lg w-7 md:w-10 h-7 md:h-10 hover:text-base-300 bg-base-300 rounded-full text-accent hover:bg-primary font-bold cursor-pointer"
                      onClick={(event) => {
                        event.preventDefault();
                        handleMonthChange(addMonths(currentMonth, 1));
                      }}
                    >
                      {">"}
                    </button>
                  </div>
                )}
              </div>
              <>
                {step === "month" && (
                  <>
                    <h3
                      data-cy={"month_step_header_custom_date_picker"}
                      className={`text-center mb-2 text-primary text-lg font-medium pt-3`}
                    >
                      Select Month
                    </h3>

                    <div className={`grid grid-cols-3 gap-1`}>
                      <button
                        data-cy={"month_step_jan_button_custom_date_picker"}
                        onClick={() => {
                          handleMonthChange(selectMonth(currentMonth, 0));
                        }}
                        className={`btn btn-primary btn-outline text-xs w-18`}
                      >
                        January
                      </button>
                      <button
                        data-cy={"month_step_feb_button_custom_date_picker"}
                        onClick={() => {
                          handleMonthChange(selectMonth(currentMonth, 1));
                        }}
                        className={`btn btn-primary btn-outline text-xs w-18`}
                      >
                        February
                      </button>
                      <button
                        data-cy={"month_step_mar_button_custom_date_picker"}
                        onClick={() => {
                          handleMonthChange(selectMonth(currentMonth, 2));
                        }}
                        className={`btn btn-primary btn-outline text-xs w-18`}
                      >
                        March
                      </button>
                      <button
                        data-cy={"month_step_apr_button_custom_date_picker"}
                        onClick={() => {
                          handleMonthChange(selectMonth(currentMonth, 3));
                        }}
                        className={`btn btn-primary btn-outline text-xs w-18`}
                      >
                        April
                      </button>
                      <button
                        data-cy={"month_step_may_button_custom_date_picker"}
                        onClick={() => {
                          handleMonthChange(selectMonth(currentMonth, 4));
                        }}
                        className={`btn btn-primary btn-outline text-xs w-18`}
                      >
                        May
                      </button>
                      <button
                        data-cy={"month_step_june_button_custom_date_picker"}
                        onClick={() => {
                          handleMonthChange(selectMonth(currentMonth, 5));
                        }}
                        className={`btn btn-primary btn-outline text-xs w-18`}
                      >
                        June
                      </button>
                      <button
                        data-cy={"month_step_july_button_custom_date_picker"}
                        onClick={() => {
                          handleMonthChange(selectMonth(currentMonth, 6));
                        }}
                        className={`btn btn-primary btn-outline text-xs w-18`}
                      >
                        July
                      </button>
                      <button
                        data-cy={"month_step_aug_button_custom_date_picker"}
                        onClick={() => {
                          handleMonthChange(selectMonth(currentMonth, 7));
                        }}
                        className={`btn btn-primary btn-outline text-xs w-18`}
                      >
                        August
                      </button>
                      <button
                        data-cy={"month_step_sep_button_custom_date_picker"}
                        onClick={() => {
                          handleMonthChange(selectMonth(currentMonth, 8));
                        }}
                        className={`btn btn-primary btn-outline text-xs w-18`}
                      >
                        September
                      </button>
                      <button
                        data-cy={"month_step_oct_button_custom_date_picker"}
                        onClick={() => {
                          handleMonthChange(selectMonth(currentMonth, 9));
                        }}
                        className={`btn btn-primary btn-outline text-xs w-18`}
                      >
                        October
                      </button>
                      <button
                        data-cy={"month_step_nov_button_custom_date_picker"}
                        onClick={() => {
                          handleMonthChange(selectMonth(currentMonth, 10));
                        }}
                        className={`btn btn-primary btn-outline text-xs w-18`}
                      >
                        November
                      </button>
                      <button
                        data-cy={"month_step_dec_button_custom_date_picker"}
                        onClick={() => {
                          handleMonthChange(selectMonth(currentMonth, 11));
                        }}
                        className={`btn btn-primary btn-outline text-xs w-18`}
                      >
                        December
                      </button>
                    </div>
                  </>
                )}

                {step === "day" && (
                  <>{isDatePickerActive && !disabled && renderCalendar()}</>
                )}

                {step === "year" && (
                  <>
                    {
                      <div
                        data-cy={"year_container_custom_date_picker"}
                        className={`pt-4`}
                      >
                        <div
                          data-cy={"year_buttons_custom_date_picker"}
                          className="mb-4 flex justify-between items-center"
                        >
                          <button
                            data-cy={"year_left_button_custom_date_picker"}
                            className="text-lg w-10 h-10 bg-base-300 rounded-full text-accent hover:bg-primary font-bold cursor-pointer"
                            onClick={(event) => {
                              event.preventDefault();
                              handleChangeYear(startYear - 12, startYear - 1);
                            }}
                          >
                            {"<"}
                          </button>

                          <p
                            data-cy={"current_year_custom_date_picker"}
                            className="text-lg font-bold flex items-center gap-2"
                          >
                            {formatDate(currentMonth, "yyyy")}
                          </p>

                          <button
                            data-cy={"year_right_button_custom_date_picker"}
                            className="text-lg w-10 h-10 bg-base-300 rounded-full text-accent hover:bg-primary font-bold cursor-pointer"
                            onClick={(event) => {
                              event.preventDefault();
                              handleChangeYear(startYear + 12, endYear + 12);
                            }}
                          >
                            {">"}
                          </button>
                        </div>
                        <div
                          data-cy={"all_years_custom_date_picker"}
                          className={`grid grid-cols-3 gap-1`}
                        >
                          {allYear.map((year, i) => (
                            <button
                              data-cy={`all_year_button_${year}_custom_date_picker`}
                              key={i}
                              disabled={
                                (isNaN(from) &&
                                  year < moment(from, "DD-MM-YYYY").year()) ||
                                (isNaN(to) &&
                                  year > moment(to, "DD-MM-YYYY").year())
                              }
                              onClick={() => {
                                if (
                                  !(
                                    isNaN(from) &&
                                    year < moment(from, "DD-MM-YYYY").year()
                                  ) ||
                                  !(
                                    isNaN(from) &&
                                    year > moment(to, "DD-MM-YYYY").year()
                                  )
                                ) {
                                  {
                                    console.log({
                                      allYear: setYear(currentMonth, year),
                                      currentMonth,
                                    });
                                  }
                                  handleMonthChange(
                                    setYear(currentMonth, year)
                                  );
                                }
                              }}
                              className={`btn btn-primary ${
                                parseInt(formatDate(currentMonth, "yyyy")) ===
                                year
                                  ? ""
                                  : "btn-outline"
                              }  text-xs w-18`}
                            >
                              {year}
                            </button>
                          ))}
                        </div>
                      </div>
                    }
                  </>
                )}
              </>
            </div>
          </div>

          <CustomTimePickerForCalender
            id={`start_at`}
            required
            minTime={minTime}
            maxTime={maxTime}
            name={"start_at"}
            onChange={onTimeChange}
            value={timeVale}
            disable={disabled}
            isResetTime={isResetTime}
          />
        </div>
      )}
    </OutsideClickHandler>
  );
};

CustomDatePickerWithTime.propTypes = {
  format: PropTypes.string,
  defaultDate: PropTypes.instanceOf(Date),
};

export default CustomDatePickerWithTime;
