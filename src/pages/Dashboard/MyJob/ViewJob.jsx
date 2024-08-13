import moment from "moment";
import React from "react";
import { formatRole } from "../../../utils/formatRole.js";

const ViewJob = ({ job, handleClosePopup }) => {
  return (
    <div className={`mt-10 flex flex-col pb-10`}>
      {/* Garage Name  */}
      <div className={`flex items-start border-b pb-4`}>
        {/* TITLE  */}
        <span className={`w-[200px] font-bold`}>Garage Name: </span>
        <span
          data-auto={`personal-details-v2-first-name-view-employee`}
          className="text-gray-600 flex-1 w-[calc(100%-200px)] break-words"
        >
          {/* DETAILS  */}
          {job?.garage?.name}
        </span>
      </div>

      {/* GARAGE LOCATION  */}
      <div className={`flex items-start border-b pt-5 pb-4`}>
        {/* TITLE  */}
        <span className={`w-[200px] font-bold`}>Garage Location: </span>
        <span
          data-auto={`personal-details-v2-first-name-view-employee`}
          className="text-gray-600 flex-1 w-[calc(100%-200px)] break-words"
        >
          {/* DETAILS  */}
          {job?.garage?.address_line_1}
        </span>
      </div>

      {/* PACKAGES  */}
      {!!(job?.job_packages?.length > 0) && (
        <div className={`flex items-start border-b pt-5  pb-4`}>
          <span className={`w-[200px] font-bold`}>Packages: </span>
          <span
            data-auto={`personal-details-v2-first-name-view-employee`}
            className="text-gray-600 flex-1 w-[calc(100%-200px)] break-words"
          >
            {job?.job_packages?.length > 0 ? (
              <ul className={`list-decimal pl-[1.15rem]`}>
                {job?.job_packages?.map((jobPackage, i) => (
                  <li key={i}>
                    {jobPackage?.garage_package?.name} (
                    {jobPackage?.garage_package?.price})
                    {job?.job_packages?.length - 1 === i ? "." : ","}
                  </li>
                ))}
              </ul>
            ) : (
              <span>No Packages</span>
            )}
          </span>
        </div>
      )}

      {/* SERVICES  */}
      <div className={`flex items-start border-b pt-5 pb-4`}>
        {/* TITLE  */}
        <span className={`w-[200px] font-bold`}>Services: </span>
        <span
          data-auto={`personal-details-v2-first-name-view-employee`}
          className="text-gray-600 flex-1 w-[calc(100%-200px)] break-words"
        >
          {/* DETAILS  */}
          <ul className={`list-decimal pl-[1.15rem]`}>
            {job?.job_sub_services?.map((service, i) => (
              <li key={i}>
                {service?.sub_service?.name}
                {job?.job_sub_services?.length - 1 === i ? "." : ","}
              </li>
            ))}
          </ul>
        </span>
      </div>

      {/* JOB START DATE  */}
      <div className={`flex items-start border-b pt-5 pb-4`}>
        {/* TITLE  */}
        <span className={`w-[200px] font-bold`}>Job Start Date: </span>
        <span
          data-auto={`personal-details-v2-first-name-view-employee`}
          className="text-gray-600 flex-1 w-[calc(100%-200px)] break-words"
        >
          {/* DETAILS  */}
          {moment(job?.job_start_date, "YYYY-MM-DD").format("DD-MM-YYYY")}
        </span>
      </div>

      {/* JOB START TIME  */}
      {!!job?.job_start_time && (
        <div className={`flex items-start border-b pt-5 pb-4`}>
          {/* TITLE  */}
          <span className={`w-[200px] font-bold`}>Job Start Date: </span>
          <span
            data-auto={`personal-details-v2-first-name-view-employee`}
            className="text-gray-600 flex-1 w-[calc(100%-200px)] break-words"
          >
            {/* DETAILS  */}
            {moment(job?.job_start_time, "HH:mm").format("hh:mm A")}
          </span>
        </div>
      )}

      {/* BOOKING PRICE  */}
      <div className={`flex items-start border-b pt-5 pb-4`}>
        {/* TITLE  */}
        <span className={`w-[200px] font-bold`}>Booking Price: </span>
        <span
          data-auto={`personal-details-v2-first-name-view-employee`}
          className="text-gray-600 flex-1 w-[calc(100%-200px)] break-words"
        >
          {/* DETAILS  */}
          <span className={`text-primary`}>{job?.final_price} </span>{" "}
          <span>{job?.garage?.currency}</span>
        </span>
      </div>

      {/* CAR REG  */}
      <div className={`flex items-start border-b pt-5 pb-4`}>
        {/* TITLE  */}
        <span className={`w-[200px] font-bold`}>Car Reg: </span>
        <span
          data-auto={`personal-details-v2-first-name-view-employee`}
          className="text-gray-600 flex-1 w-[calc(100%-200px)] break-words"
        >
          {/* DETAILS  */}
          {job?.car_registration_no}
        </span>
      </div>

      {/* CAR MAKE  */}
      <div className={`flex items-start border-b pt-5 pb-4`}>
        {/* TITLE  */}
        <span className={`w-[200px] font-bold`}>Car Make: </span>
        <span
          data-auto={`personal-details-v2-first-name-view-employee`}
          className="text-gray-600 flex-1 w-[calc(100%-200px)] break-words"
        >
          {/* DETAILS  */}
          {job?.automobile_make?.name}
        </span>
      </div>

      {/* CAR MODEL  */}
      <div className={`flex items-start border-b pt-5 pb-4`}>
        {/* TITLE  */}
        <span className={`w-[200px] font-bold`}>Car Model: </span>
        <span
          data-auto={`personal-details-v2-first-name-view-employee`}
          className="text-gray-600 flex-1 w-[calc(100%-200px)] break-words"
        >
          {/* DETAILS  */}
          {job?.automobile_model?.name}
        </span>
      </div>

      {/* NOTE  */}
      {!!job?.additional_information && (
        <div className={`flex items-start border-b pt-5 pb-4`}>
          {/* TITLE  */}
          <span className={`w-[200px] font-bold`}>Extra Notes: </span>
          <span
            data-auto={`personal-details-v2-first-name-view-employee`}
            className="text-gray-600 flex-1 w-[calc(100%-200px)] break-words"
          >
            {/* DETAILS  */}
            {job?.additional_information}
          </span>
        </div>
      )}

      {/* STATUS  */}
      <div className={`flex items-start border-b pt-5 pb-4`}>
        {/* TITLE  */}
        <span className={`w-[200px] font-bold`}>Status: </span>
        <span
          data-auto={`personal-details-v2-first-name-view-employee`}
          className="text-gray-600 flex-1 w-[calc(100%-200px)] break-words"
        >
          {/* DETAILS  */}
          {job?.format_status}
        </span>
      </div>

      {/* ACTION BUTTON  */}
      <div className={`flex items-center justify-end mt-10`}>
        <button
          className={`btn btn-primary w-full md:w-[150px]`}
          onClick={handleClosePopup}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewJob;
