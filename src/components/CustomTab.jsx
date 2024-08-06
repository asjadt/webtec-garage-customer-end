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
}) => {
  return (
    <div data-auto={`orderType-container-mainSection`} className={``}>
      <div className={`pb-5 `}>
        <div
          className={`bg-gray-100 text-sm transition-all duration-200 w-[320px] grid ${gridCol} rounded-full p-1 h-10`}
        >
          {tabs.map((ot, index) => (
            <button
              data-auto={`orderType${index + 1}-mainSection`}
              key={index}
              onClick={() => {
                setActiveTab(ot?.id);
                setFilters({ ...filters, page: 1 });
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
