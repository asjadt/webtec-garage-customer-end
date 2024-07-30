import React from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchField({
  fieldClassName,
  handleChange,
  width = "w-full md:w-[300px]",
  contentWidth = "w-auto",
}) {
  return (
    <div
      data-cy={`shared-full-field-search-field`}
      className={`flex ${contentWidth}`}
    >
      <span className="bg-primary rounded-l-xl w-12 text-base-100 flex justify-center items-center">
        <FiSearch className="text-xl" />
      </span>
      <input
        data-cy={`shared-input-search-field`}
        onChange={handleChange}
        type={"text"}
        name={"search"}
        autoComplete="off"
        placeholder={`search here`}
        className={`bg-base-100 input rounded-r-xl rounded-l-none outline-none ${width} border-primary focus:outline-none input-bordered ${fieldClassName}`}
      />
    </div>
  );
}
