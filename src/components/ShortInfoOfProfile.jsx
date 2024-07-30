import React from "react";

export default function ShortInfoOfProfile({
  Icon,
  title,
  titleClass,
  iconClass,
  IconBgClass,
}) {
  return (
    <div
      data-cy={`view-employee-container-short-info-of-profile`}
      className="inline-flex items-center gap-1 w-full"
    >
      {/* ICON  */}
      <div
        data-cy={`view-employee-icon-short-info-of-profile`}
        className={`w-7 h-7  rounded-xl flex justify-center items-center ${IconBgClass}`}
      >
        <Icon className={`text-md ${iconClass}`} />
      </div>

      {/* INFO  */}
      <h4
        data-cy={`view-employee-title-short-info-of-profile`}
        className={` my-0 text-[1rem] ${titleClass}`}
      >
        {title}
      </h4>
    </div>
  );
}
