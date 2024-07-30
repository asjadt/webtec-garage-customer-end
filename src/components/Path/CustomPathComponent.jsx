import React from "react";
import { PiGlobeStandFill } from "react-icons/pi";

export default function CustomPathComponent({ values = [] }) {
  return (
    <div
      data-cy={`view-employee-container-custom-path-component`}
      className="w-full"
    >
      {values.length > 0 ? (
        <div
          data-cy={`view-employee-values-container-custom-path-component`}
          className="relative wrap overflow-hidden h-full pl-2"
        >
          {/* THIS IS THE VERTICAL LINE  */}
          <div
            data-cy={`view-employee-values-vertical-line-custom-path-component`}
            className="border-2-2 absolute border-dashed border-primary mt-6 h-full border left-[30%] md:left-[29%] -translate-x-[50%]"
          ></div>

          {/* SECTIONS  */}
          {values.map((item, index) => (
            <div
              data-cy={`view-employee-item-container${
                index + 1
              }-custom-path-component`}
              key={index}
              className="flex justify-between items-start w-full mb-10 mt-2 "
            >
              {/* LEFT  */}
              <div
                data-cy={`view-employee-item-left${
                  index + 1
                }-custom-path-component`}
                className="order-1 overflow-hidden bg-base-300 border border-primary-content rounded-lg shadow-xl w-[24%]"
              >
                {item?.LeftSection}
              </div>

              {/* MIDDLE  */}
              <div
                data-cy={`view-employee-item-middle-container${
                  index + 1
                }-custom-path-component`}
                className="z-20 absolute left-[30%] md:left-[29%] -translate-x-[50%]"
              >
                <div
                  data-cy={`view-employee-item-middle${
                    index + 1
                  }-custom-path-component`}
                  className="rounded-full h-4 w-4 md:h-10 md:w-10 flex justify-center items-center bg-primary-content ring-4 ring-primary-content ring-opacity-50"
                >
                  <item.Icon className="text-primary text-md md:text-xl" />
                </div>
              </div>

              {/* RIGHT  */}
              <div
                data-cy={`view-employee-item-right${
                  index + 1
                }-custom-path-component`}
                className="order-1 overflow-hidden bg-base-300 border border-primary-content rounded-lg shadow-xl w-[67%]"
              >
                {item?.RightSection}
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
