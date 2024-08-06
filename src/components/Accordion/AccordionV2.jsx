// src/Accordion.js

import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
const AccordionItem = ({ title, Content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b-2 border-gray-300 border-dotted">
      <button
        className="w-full text-left p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center ">
          <span>{title}</span>
          <span
            className={`${
              isOpen ? "rotate-180" : ""
            } transition-all duration-200`}
          >
            <IoIosArrowDown />
          </span>
        </div>
      </button>
      {isOpen && <div className="pl-4 bg-base-300">{Content}</div>}
    </div>
  );
};

const AccordionForFilter = ({ items }) => {
  return (
    <div className="max-w-lg mx-auto bg-base-300">
      {items?.map((item, index) => (
        <AccordionItem key={index} title={item.title} Content={item.Content} />
      ))}
    </div>
  );
};

export default AccordionForFilter;
