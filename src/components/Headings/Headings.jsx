import React from "react";

export default function Headings({ className, level, children }) {
  if (level === 1) {
    return (
      <h1
        data-auto={"level_1_heading"}
        className={`text-2xl font-bold ${className}`}
      >
        {children}
      </h1>
    );
  }
  if (level === 2) {
    return (
      <h1
        data-auto={"level_2_heading"}
        className={`text-xl font-bold ${className}`}
      >
        {children}
      </h1>
    );
  }
  if (level === 3) {
    return (
      <h1
        data-auto={"level_3_heading"}
        className={`text-lg font-bold ${className}`}
      >
        {children}
      </h1>
    );
  }
  if (level === 4) {
    return (
      <h1
        data-auto={"level_4_heading"}
        className={`text-md font-bold ${className}`}
      >
        {children}
      </h1>
    );
  }
  if (level === 5) {
    return (
      <h1
        data-auto={"level_5_heading"}
        className={`text-sm font-bold ${className}`}
      >
        {children}
      </h1>
    );
  }
  if (level === 6) {
    return (
      <h1
        data-auto={"level_6_heading"}
        className={`text-xs font-bold ${className}`}
      >
        {children}
      </h1>
    );
  }
}
