import { useEffect, useState } from "react";
import CustomTimePicker from "../../../../../../components/InputFields/CustomTimePicker";
import { convertTo24HourFormat } from "../../../../../../utils/convertTo24HourFormat";

export default function Step5({
  formData,
  setFormData,
  handlePrevious,
  handleNext,
}) {
  const [errors, setErrors] = useState({});
  const mediumTimingData = [...formData?.times];
  const dayArray = [
    { name: "Sun", sortName: "Sunday" },
    { name: "Mon", sortName: "Monday" },
    { name: "Tue", sortName: "Tuesday" },
    { name: "Wed", sortName: "Wednesday" },
    { name: "Thu", sortName: "Thursday" },
    { name: "Fri", sortName: "Friday" },
    { name: "Sat", sortName: "Saturday" },
  ];
  const applyFirstDayToAll = () => {
    const firstDayData = { ...formData.times[0] };
    const updatedTimes = formData.times.map((time, index) => {
      if (index === 0) return time; // Skip the first element
      return {
        ...time,
        opening_time: firstDayData.opening_time,
        closing_time: firstDayData.closing_time,
        is_closed: firstDayData.is_closed,
      };
    });

    setFormData((prevData) => ({
      ...prevData,
      times: updatedTimes,
    }));
  };

  return (
    <div className="px-0 md:px-2 py-5">
      <div className={`flex justify-end items-baseline`}>
        <button
          className={`btn btn-primary btn-sm`}
          onClick={applyFirstDayToAll}
        >
          Apply to all
        </button>
      </div>
      <div className="flex flex-col w-full">
        <div>
          <div className="flex items-center py-5 text-[0.8rem] font-semibold bg-base-200 md:px-5 shadow-md px-2">
            <div className={`block w-[7%] md:w-[20%]`}>Days</div>
            <div className={`w-[26%] md:w-[20%] pl-5 md:pl-0 inline-block`}>
              Off Day
            </div>
            <div className={`block w-[36%] md:w-[30%] pl-5 md:pl-5`}>
              Start At
            </div>
            <div className={`block w-[36%] md:w-[30%] pl-5 md:pl-5`}>
              End At
            </div>
          </div>

          <div className={`flex flex-col`}>
            {formData?.times?.map((day, value) => (
              <div
                key={value}
                className={`flex items-start md:px-5  px-2 pt-2 gap-5 pb-2 bg-base-300 duration-200 hover:bg-base-100`}
              >
                {/* DAY TITLE  */}
                <div className={`w-[10%] md:w-[20%]`}>
                  <span className={`md:hidden inline-block`}>
                    {dayArray[day?.day]?.name}
                  </span>
                  <span className={`hidden md:inline-block`}>
                    {dayArray[day?.day]?.sortName}
                  </span>
                </div>
                <div className={`w-[10%] md:w-[20%] mt-2`}>
                  <input
                    className={`toggle toggle-primary toggle-xs md:toggle-md`}
                    onChange={(e) => {
                      if (e.target.checked) {
                        mediumTimingData[day.day].is_closed = true;
                        setFormData({
                          ...formData,
                          times: mediumTimingData,
                        });
                      } else {
                        mediumTimingData[day.day].is_closed = false;
                        setFormData({
                          ...formData,
                          times: mediumTimingData,
                        });
                      }
                    }}
                    checked={mediumTimingData[day.day].is_closed}
                    type="checkbox"
                    name=""
                    id=""
                  />
                </div>

                {/* START TIME  */}
                <div
                  className={`w-[40%] md:w-[30%] block ${
                    errors?.times?.find((e) => e?.id === day?.day)
                      ?.closing_time &&
                    !formData?.times[day.day].is_closed &&
                    "h-[80px]"
                  } `}
                >
                  <CustomTimePicker
                    right
                    visibleBorder
                    id={`opening_time`}
                    value={mediumTimingData[day.day].opening_time}
                    required={mediumTimingData[day.day].closing_time}
                    maxTime={mediumTimingData[day.day].closing_time}
                    name={"opening_time"}
                    placeholder="Start at"
                    onChange={(e) => {
                      mediumTimingData[day.day].opening_time =
                        convertTo24HourFormat(e);
                      setFormData({
                        ...formData,
                        times: mediumTimingData,
                      });
                    }}
                    error={
                      !formData?.times[day.day].is_closed
                        ? errors?.times
                          ? errors?.times?.length > 0
                            ? errors?.times?.find((e) => e?.id === day?.day)
                                ?.opening_time
                            : ""
                          : ""
                        : ""
                    }
                    disable={formData?.times[day.day].is_closed}
                  />
                </div>

                {/* END TIME  */}
                <div
                  className={`w-[40%] md:w-[30%] block ${
                    errors?.times?.find((e) => e?.id === day?.day)
                      ?.opening_time &&
                    !formData?.times[day.day].is_closed &&
                    "h-[80px]"
                  } `}
                >
                  <CustomTimePicker
                    right
                    visibleBorder
                    id={`closing_time`}
                    required={formData?.times[day.day].opening_time}
                    value={mediumTimingData[day.day].closing_time}
                    minTime={mediumTimingData[day.day].opening_time}
                    name={"closing_time"}
                    placeholder="End at"
                    onChange={(e) => {
                      mediumTimingData[day.day].closing_time =
                        convertTo24HourFormat(e);
                      setFormData({
                        ...formData,
                        times: mediumTimingData,
                      });
                    }}
                    error={
                      !formData?.times[day.day].is_closed
                        ? errors?.times
                          ? errors?.times?.length > 0
                            ? errors?.times?.find((e) => e?.id === day?.day)
                                ?.closing_time
                            : ""
                          : ""
                        : ""
                    }
                    disable={formData?.times[day.day].is_closed}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {errors?.is_closed ? (
        <span
          className={` text-center my-4 text-red-500 font-semibold block w-full p-5 rounded-md border-2 border-red-200 shadow-md`}
        >
          {errors?.is_closed}
        </span>
      ) : (
        ""
      )}
    </div>
  );
}
