import React from "react";
import { motion } from "framer-motion";

const CustomTab = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div data-auto={`orderType-container-mainSection`} className={``}>
      <div className={`pb-5 `}>
        <div
          className={`bg-gray-100 text-sm transition-all duration-200 w-[320px] grid grid-cols-3 rounded-full p-1 h-10`}
        >
          {tabs.map((ot, index) => (
            <button
              data-auto={`orderType${index + 1}-mainSection`}
              key={index}
              onClick={() => setActiveTab(ot?.id)}
              className={`${
                activeTab === ot?.id ? "" : ""
              } relative  rounded-full`}
            >
              {activeTab === ot?.id && (
                <motion.div
                  layoutId="active-order-pil"
                  className={`rounded-full bg-primary  absolute inset-0`}
                />
              )}

              <span
                className={`relative justify-center flex items-center gap-2 ${
                  activeTab === ot?.id ? " text-white" : ""
                }`}
              >
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
