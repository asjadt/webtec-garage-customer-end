import React from "react";
import { formatRole } from "../../utils/formatRole";

const StatusButton = ({ d }) => {
  return (
    <div className={`md:flex justify-center`}>
      <span
        className={`${
          d?.status === "pending_approval" && "border-warning bg-warning"
        } ${d?.status === "approved" && "  border-success bg-success"} ${
          d?.status === "rejected" && " border-error bg-error"
        } ${d?.status === "in_progress" && "border-info bg-info "} ${
          d?.status === "applied" && "border-yellow-400 bg-yellow-400"
        }${
          d?.status === "interview_stage_1" && "border-yellow-700 bg-yellow-700"
        } ${
          d?.status === "interview_stage_2" && "border-yellow-800 bg-yellow-800"
        } ${
          d?.status === "final_interview" && "border-purple-700 bg-purple-700"
        } ${d?.status === "job_offered" && "border-green-700 bg-green-700"} ${
          d?.status === "hired" && "border-green-500 bg-green-500"
        }
         px-3 py-1 rounded-full text-center font-medium flex justify-center items-center border w-fit`}
      >
        <div
          className={`${
            d?.status === "in_progress" && "text-info"
          } flex gap-1 items-center`}
        >
          {d?.status.split("_").map((stat) => (
            <span className={`capitalize`}>{stat}</span>
          ))}
        </div>
      </span>
    </div>
  );
};

export default StatusButton;
