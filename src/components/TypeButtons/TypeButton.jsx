import React from "react";
import { formatRole } from "../../utils/formatRole";

const TypeButton = ({ d }) => {
  // console.log(d.type);
  return (
    <div className={`md:flex justify-center`}>
      <span
        className={`px-3 py-1 rounded-full text-center font-medium flex justify-center items-center border-2 w-fit`}
      >
        <div
          className={`w-4 h-4 border-2  ${d?.type === "regular" && "border-purple-500"
            } ${d?.type === "scheduled" && "  border-green-500"} ${d?.type === "flexible" && " border-indigo-500"
            }  rounded-full flex justify-center items-center mr-1`}
        >
          <div
            className={`w-2 h-2 border-2 ${d?.type === "regular" && "border-purple-500 bg-purple-500"
              } ${d?.type === "scheduled" && "  border-green-500 bg-green-500"} ${d?.type === "flexible" && " border-indigo-500 bg-indigo-500"
              } rounded-full`}
          ></div>
        </div>
        <p>{formatRole(d?.type)}</p>
      </span>
    </div>
  );
};

export default TypeButton;
