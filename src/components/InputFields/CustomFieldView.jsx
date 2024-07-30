import React from "react";
import { IoInformationCircleSharp } from "react-icons/io5";

export default function CustomFieldView({ label, value, wrapperClassName }) {
  return (
    <div className={`border-b border-primary-content ${wrapperClassName}`}>
      <div className={`flex flex-col gap-1`}>
        <span className={`label-text text-md font-bold  text-opacity-60`}>
          {label}
        </span>
        <span className={`text-xl font-semibold`}>{value}</span>
      </div>
    </div>
  );
}
