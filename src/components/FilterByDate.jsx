import moment from "moment";
import React, { useEffect, useState } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

const FilterByDate = ({
  onChange = (e) => {
    return e;
  },
}) => {
  const [isInitial, setIsInitial] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month"),
  });
  const [buttonName, setButtonName] = useState("Today");

  const handleDateChange = (amount) => {
    setDateRange((prevDateRange) => ({
      startDate: prevDateRange.startDate.clone().add(amount, "days"),
      endDate: prevDateRange.endDate.clone().add(amount, "days"),
    }));
  };

  const handleButtonClick = (preset) => {
    let startDate, endDate;

    switch (preset) {
      case "today":
        setButtonName("Today");
        startDate = moment().startOf("day");
        endDate = moment().endOf("day");
        break;
      case "thisWeek":
        setButtonName("This Week");
        startDate = moment().startOf("week");
        endDate = moment().endOf("week");
        break;
      case "lastWeek":
        setButtonName("Last Week");
        startDate = moment().subtract(1, "week").startOf("week");
        endDate = moment().subtract(1, "week").endOf("week");
        break;
      case "thisMonth":
        setButtonName("This Month");
        startDate = moment().startOf("month");
        endDate = moment().endOf("month");
        break;
      case "lastMonth":
        setButtonName("Last Month");
        startDate = moment().subtract(1, "month").startOf("month");
        endDate = moment().subtract(1, "month").endOf("month");
        break;
      case "thisYear":
        setButtonName("This Year");
        startDate = moment().startOf("year");
        endDate = moment().endOf("year");
        break;
      case "lastYear":
        setButtonName("Last Year");
        startDate = moment().subtract(1, "year").startOf("year");
        endDate = moment().subtract(1, "year").endOf("year");
        break;
      default:
        break;
    }

    setDateRange({ startDate, endDate });
  };

  useEffect(() => {
    if (isInitial) {
      handleButtonClick("thisMonth");
    }
  }, []);

  const formattedDateRange = () => {
    if (
      dateRange.startDate.format("MMMM D, YYYY") ===
      dateRange.endDate.format("MMMM D, YYYY")
    ) {
      return (
        <span
          data-cy={`shared-top-date-range-filter-by-date`}
          className={`flex gap-2`}
        >
          <span className={`text-primary font-semibold`}>
            {dateRange.startDate.format("DD MMM YYYY")}
          </span>
        </span>
      );
    } else {
      return (
        <span
          data-cy={`shared-bottom-date-range-filter-by-date`}
          className={`flex gap-2`}
        >
          <span className={`text-primary font-semibold`}>
            {dateRange.startDate.format("DD MMM YYYY")}
          </span>
          <span className={``}>To</span>
          <span className={`text-primary font-semibold`}>
            {dateRange.endDate.format("DD MMM YYYY")}
          </span>
        </span>
      );
    }
  };

  useEffect(() => {
    if (!isInitial) {
      onChange({
        filterName: buttonName,
        start: dateRange?.startDate?.format("DD-MM-YYYY"),
        end: dateRange?.endDate?.format("DD-MM-YYYY"),
      });
    } else {
      setIsInitial(false);
    }
  }, [dateRange]);

  return (
    <div
      data-cy={`shared-container-filter-by-date`}
      className="flex flex-col gap-5 md:gap-1 w-full mb-5  md:mb-5 rounded-xl overflow-hidden shadow-md"
    >
      <div
        data-cy={`shared-arrow-button-container-filter-by-date`}
        className="flex bg-base-100 flex-col sm:flex-row gap-5 md:gap-0 justify-between items-center py-5 px-5 rounded-xl"
      >
        <div
          data-cy={`shared-arrow-button-date-range-filter-by-date`}
          className="hidden md:block"
        >
          {formattedDateRange()}
        </div>

        <div
          data-cy={`shared-arrow-button-sub-container-filter-by-date`}
          className="flex justify-between w-full md:w-16 gap-2"
        >
          <button
            data-cy={`shared-arrow-button-left-filter-by-date`}
            onClick={() => handleDateChange(-1)}
          >
            <IoMdArrowDropleft className="text-3xl md:text-2xl hover:text-primary" />
          </button>

          <div
            data-cy={`shared-arrow-button-sub-date-range-filter-by-date`}
            className="block md:hidden"
          >
            {formattedDateRange()}
          </div>

          <button
            data-cy={`shared-arrow-button-right-filter-by-date`}
            onClick={() => handleDateChange(1)}
          >
            <IoMdArrowDropright className="text-3xl md:text-2xl hover:text-primary" />
          </button>
        </div>
      </div>

      {/* Additional div below the parent div */}
      {/* MOBILE VIEW */}
      <div
        data-cy={`shared-time-range-container-filter-by-date`}
        className="collapse md:hidden  collapse-arrow bg-base-200 "
      >
        <input
          data-cy={`shared-time-range-input-filter-by-date`}
          type="checkbox"
          name="my-accordion-2"
        />
        <div
          data-cy={`shared-time-range-button-name-filter-by-date`}
          className="collapse-title text-xl font-medium bg-primary text-base-300"
        >
          {buttonName}
        </div>
        <div
          data-cy={`shared-time-range-button-container-filter-by-date`}
          className="collapse-content"
        >
          <div
            data-cy={`shared-time-range-button-sub-container-filter-by-date`}
            className="mt-4 flex flex-col gap-1 justify-between items-center py-2"
          >
            <button
              data-cy={`shared-time-range-button-today-filter-by-date`}
              className={`${
                moment().startOf("day").format("DD-MM-YYYY") !==
                  dateRange?.startDate.format("DD-MM-YYYY") && "btn-outline"
              } font-semibold btn btn-primary w-full`}
              onClick={() => handleButtonClick("today")}
            >
              Today
            </button>
            <button
              data-cy={`shared-time-range-button-this-week-filter-by-date`}
              className={`${
                buttonName !== "This Week" && "btn-outline"
              } font-semibold btn btn-primary w-full`}
              onClick={() => handleButtonClick("thisWeek")}
            >
              This Week
            </button>
            <button
              data-cy={`shared-time-range-button-last-week-filter-by-date`}
              className={`${
                buttonName !== "Last Week" && "btn-outline"
              } font-semibold btn btn-primary w-full`}
              onClick={() => handleButtonClick("lastWeek")}
            >
              Last Week
            </button>
            <button
              data-cy={`shared-time-range-button-this-month-filter-by-date`}
              className={`${
                buttonName !== "This Month" && "btn-outline"
              } font-semibold btn btn-primary w-full`}
              onClick={() => handleButtonClick("thisMonth")}
            >
              This Month
            </button>
            <button
              data-cy={`shared-time-range-button-last-month-filter-by-date`}
              className={`${
                buttonName !== "Last Month" && "btn-outline"
              } font-semibold btn btn-primary w-full`}
              onClick={() => handleButtonClick("lastMonth")}
            >
              Last Month
            </button>
            <button
              data-cy={`shared-time-range-button-this-year-filter-by-date`}
              className={`${
                buttonName !== "This Year" && "btn-outline"
              } font-semibold btn btn-primary w-full`}
              onClick={() => handleButtonClick("thisYear")}
            >
              This Year
            </button>
            <button
              data-cy={`shared-time-range-button-last-year-filter-by-date`}
              className={`${
                buttonName !== "Last Year" && "btn-outline"
              } font-semibold btn btn-primary w-full`}
              onClick={() => handleButtonClick("lastYear")}
            >
              Last Year
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP VIEW */}
      <div
        data-cy={`shared-time-range-button-desktop-container-filter-by-date`}
        className="py-3 hidden md:flex justify-between items-center md:px-5 lg:px-16"
      >
        <button
          data-cy={`shared-time-range-button-desktop-today-filter-by-date`}
          className={`${
            moment().startOf("day").format("DD-MM-YYYY") ==
              dateRange?.startDate.format("DD-MM-YYYY") && "text-primary"
          } font-semibold`}
          onClick={() => handleButtonClick("today")}
        >
          Today
        </button>
        <button
          data-cy={`shared-time-range-button-desktop-this-week-filter-by-date`}
          className={`${
            buttonName === "This Week" && "text-primary"
          } font-semibold`}
          onClick={() => handleButtonClick("thisWeek")}
        >
          This Week
        </button>
        <button
          data-cy={`shared-time-range-button-desktop-last-week-filter-by-date`}
          className={`${
            buttonName === "Last Week" && "text-primary"
          } font-semibold`}
          onClick={() => handleButtonClick("lastWeek")}
        >
          Last Week
        </button>
        <button
          data-cy={`shared-time-range-button-desktop-this-month-filter-by-date`}
          className={`${
            buttonName === "This Month" && "text-primary"
          } font-semibold`}
          onClick={() => handleButtonClick("thisMonth")}
        >
          This Month
        </button>
        <button
          data-cy={`shared-time-range-button-desktop-last-month-filter-by-date`}
          className={`${
            buttonName === "Last Month" && "text-primary"
          } font-semibold`}
          onClick={() => handleButtonClick("lastMonth")}
        >
          Last Month
        </button>
        <button
          data-cy={`shared-time-range-button-desktop-this-year-filter-by-date`}
          className={`${
            buttonName === "This Year" && "text-primary"
          } font-semibold`}
          onClick={() => handleButtonClick("thisYear")}
        >
          This Year
        </button>
        <button
          data-cy={`shared-time-range-button-desktop-last-year-filter-by-date`}
          className={`${
            buttonName === "Last Year" && "text-primary"
          } font-semibold`}
          onClick={() => handleButtonClick("lastYear")}
        >
          Last Year
        </button>
      </div>
    </div>
  );
};

export default FilterByDate;
