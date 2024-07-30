import React from "react";

const PreviewButton = ({ d }) => {
  const colors = d.color;
  console.log({ d });
  return (
    <div className={`md:flex justify-center`}>
      <span
        className={`px-3 py-1 rounded-full text-center font-medium flex justify-center items-center border-2 w-fit`}
      >
        <div
          className={`w-4 h-4 border-2 ${
            d?.name === "Full-Time"
              ? "border-[#22c55e]"
              : `border-[${d?.color}]`
          } rounded-full flex justify-center items-center mr-1`}
        >
          <div
            className={`w-2 h-2 border-2 ${
              d?.name === "Full-Time"
                ? "border-[#22c55e] bg-[#22c55e]"
                : `border-[${d?.color}] bg-[${d?.color}]`
            } rounded-full`}
          ></div>
        </div>
        <p>{d?.name}</p>
      </span>
    </div>
  );
};

export default PreviewButton;
