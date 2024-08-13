import moment from "moment";
import React from "react";
import { formatRole } from "../../../utils/formatRole";

const ViewBooking = ({ booking, handleClosePopup }) => {
  return (
    <div className={`my-10 flex flex-col`}>
      {/* SERVICES  */}
      <div className={`flex items-start border-y pt-5 pb-4`}>
        {/* TITLE  */}
        <span className={`w-[200px] font-bold`}>Services: </span>
        <span
          data-auto={`personal-details-v2-first-name-view-employee`}
          className="text-gray-600 flex-1 w-[calc(100%-200px)] break-words"
        >
          {/* DETAILS  */}
          <ul className={`list-decimal pl-[1.15rem]`}>
            {booking?.booking_sub_services?.map((service, i) => (
              <li key={i}>
                {service?.sub_service?.name}
                {booking?.booking_sub_services?.length - 1 === i ? "." : ","}
              </li>
            ))}
          </ul>
        </span>
      </div>

      {/* CAR MODEL  */}
      <div className={`flex items-start border-y pt-5 pb-4`}>
        {/* TITLE  */}
        <span className={`w-[200px] font-bold`}>Car Model: </span>
        <span
          data-auto={`personal-details-v2-first-name-view-employee`}
          className="text-gray-600 flex-1 w-[calc(100%-200px)] break-words"
        >
          {/* DETAILS  */}
          {booking?.automobile_model?.name}
        </span>
      </div>

      {/* JOB START DATE  */}
      <div className={`flex items-start border-y pt-5 pb-4`}>
        {/* TITLE  */}
        <span className={`w-[200px] font-bold`}>Job Start Date: </span>
        <span
          data-auto={`personal-details-v2-first-name-view-employee`}
          className="text-gray-600 flex-1 w-[calc(100%-200px)] break-words"
        >
          {/* DETAILS  */}
          {booking?.job_start_date}
        </span>
      </div>

      {/* JOB START TIME  */}
      <div className={`flex items-start border-y pt-5 pb-4`}>
        {/* TITLE  */}
        <span className={`w-[200px] font-bold`}>Job Start Time: </span>
        <span
          data-auto={`personal-details-v2-first-name-view-employee`}
          className="text-gray-600 flex-1 w-[calc(100%-200px)] break-words"
        >
          {/* DETAILS  */}
          {moment(booking?.job_start_time, "HH:mm").format("hh:mm A")}
        </span>
      </div>

      {/* GARAGE NAME  */}
      <div className={`flex items-start border-y pt-5 pb-4`}>
        {/* TITLE  */}
        <span className={`w-[200px] font-bold`}>Garage Name: </span>
        <span
          data-auto={`personal-details-v2-first-name-view-employee`}
          className="text-gray-600 flex-1 w-[calc(100%-200px)] break-words"
        >
          {/* DETAILS  */}
          {booking?.garage?.name}
        </span>
      </div>

      {/* BOOKING PRICE  */}
      <div className={`flex items-start border-y pt-5 pb-4`}>
        {/* TITLE  */}
        <span className={`w-[200px] font-bold`}>Booking Price: </span>
        <span
          data-auto={`personal-details-v2-first-name-view-employee`}
          className="text-gray-600 flex-1 w-[calc(100%-200px)] break-words"
        >
          {/* DETAILS  */}
          {booking?.price}{" "}
          <span className={`text-primary`}>{booking?.garage?.currency}</span>
        </span>
      </div>

      {/* Coupon Code  */}
      <div className={`flex items-start border-y pt-5 pb-4`}>
        {/* TITLE  */}
        <span className={`w-[200px] font-bold`}>Coupon Code: </span>
        <span
          data-auto={`personal-details-v2-first-name-view-employee`}
          className="text-gray-600 flex-1 w-[calc(100%-200px)] break-words"
        >
          {/* DETAILS  */}
          {booking?.coupon_code || "N/A"}
        </span>
      </div>

      {/* Coupon DISCOUNT  */}
      <div className={`flex items-start border-y pt-5 pb-4`}>
        {/* TITLE  */}
        <span className={`w-[200px] font-bold`}>Coupon Discount: </span>
        <span
          data-auto={`personal-details-v2-first-name-view-employee`}
          className="text-gray-600 flex-1 w-[calc(100%-200px)] break-words"
        >
          {/* DETAILS  */}
          {booking?.coupon_discount_amount || "N/A"}
        </span>
      </div>

      {/* GARAGE LOCATION  */}
      <div className={`flex items-start border-y pt-5 pb-4`}>
        {/* TITLE  */}
        <span className={`w-[200px] font-bold`}>Garage Location: </span>
        <span
          data-auto={`personal-details-v2-first-name-view-employee`}
          className="text-gray-600 flex-1 w-[calc(100%-200px)] break-words"
        >
          {/* DETAILS  */}
          {booking?.garage?.address_line_1}
        </span>
      </div>

      {/* CAR MAKE  */}
      <div className={`flex items-start border-y pt-5 pb-4`}>
        {/* TITLE  */}
        <span className={`w-[200px] font-bold`}>Car Make: </span>
        <span
          data-auto={`personal-details-v2-first-name-view-employee`}
          className="text-gray-600 flex-1 w-[calc(100%-200px)] break-words"
        >
          {/* DETAILS  */}
          {booking?.automobile_make?.name}
        </span>
      </div>

      {/* CAR MAKE  */}
      <div className={`flex items-start border-y pt-5 pb-4`}>
        {/* TITLE  */}
        <span className={`w-[200px] font-bold`}>Extra Notes: </span>
        <span
          data-auto={`personal-details-v2-first-name-view-employee`}
          className="text-gray-600 flex-1 w-[calc(100%-200px)] break-words"
        >
          {/* DETAILS  */}
          {booking?.additional_information}
        </span>
      </div>

      {/* STATUS */}
      <div className={`flex items-start border-y pt-5 pb-4`}>
        {/* TITLE  */}
        <span className={`w-[200px] font-bold`}>Status: </span>
        <span
          data-auto={`personal-details-v2-first-name-view-employee`}
          className="text-gray-600 flex-1 w-[calc(100%-200px)] break-words"
        >
          {/* DETAILS  */}
          {booking?.format_status}
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

export default ViewBooking;
