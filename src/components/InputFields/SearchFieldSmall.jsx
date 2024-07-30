import React from "react";

export default function SearchFieldSmall({
  fieldClassName,
  handleChange,
  wrapperClass,
}) {
  return (
    <div
      data-cy={`view-employee-container-search-field-small`}
      className={`flex w-auto ${wrapperClass}`}
    >
      <input
        data-cy={`view-employee-input-search-field-small`}
        onChange={handleChange}
        type={"type"}
        name={"search"}
        placeholder={`search here`}
        className={`bg-base-300 input h-10 border border-primary rounded-lg outline-none w-full md:w-[350px]  focus:outline-none input-bordered ${fieldClassName}`}
      />
    </div>
  );
}
