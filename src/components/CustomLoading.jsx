// ===========================================
// #00137
// ===========================================
import React from "react";

export default function CustomLoading({ h = "h-[80vh]" }) {
  return (
    <div
      data-cy={"loading_container_custom_loading"}
      className={`${h} w-full flex justify-center items-center bg-transparent`}
    >
      <span
        data-cy={"loading_content_custom_loading"}
        className="loading loading-spinner text-primary loading-lg"
      ></span>
    </div>
  );
}
