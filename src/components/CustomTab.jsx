import React from "react";
import { motion } from "framer-motion";

const CustomTab = ({
  tabs,
  activeTab,
  setActiveTab,
  gridCol = "grid-cols-1",
  layoutId = "active-order-pil",
  filters,
  setFilters,
  dataAuto,
}) => {
  return (
    <div data-auto={`container-${dataAuto}`} className={``}>
      <div className={`pb-5`}>
        <div
          className={`bg-gray-100 text-sm transition-all duration-200 w-[320px] grid ${gridCol} rounded-full p-1 h-10`}
        >
          {tabs.map((ot, index) => (
            <button
              data-auto={`tab-${dataAuto}`}
              key={index}
              onClick={() => {
                setActiveTab(ot?.id);
                // setFilters({ ...filters, page: 1 });
              }}
              className={`${
                activeTab === ot?.id ? "" : ""
              } relative  rounded-full`}
            >
              {activeTab === ot?.id && (
                <motion.div
                  layoutId={layoutId}
                  className={`rounded-full bg-primary  absolute inset-0`}
                />
              )}

              <span
                className={`relative justify-center flex items-center gap-x-1 ${
                  activeTab === ot?.id ? " text-white" : ""
                }`}
              >
                {ot.Icon ? <ot.Icon className={`text-lg`} /> : ""}
                {ot?.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomTab;
