import moment from "moment";
import React from "react";

const ViewBooking = ({ popupOption, setPopupOption, booking }) => {
  console.log({ booking });
  return (
    <div className={`my-10 flex flex-col gap-4`}>
      <div className={`flex items-center gap-1`}>
        <h2 className={`font-bold`}>Garage Name:</h2>
        <p>{booking?.garage}</p>
      </div>
      <div className={`flex items-center gap-1`}>
        <h2 className={`font-bold`}>Booking Price:</h2>
        <p>£{booking?.price}</p>
      </div>
      <div className={`flex items-center gap-1`}>
        <h2 className={`font-bold`}>Services:</h2>
        <p>
          {booking?.booking_sub_services?.map((service, i) => (
            <p key={i}>{service?.sub_service?.name}</p>
          ))}
        </p>
      </div>
      <div className={`flex items-center gap-1`}>
        <h2 className={`font-bold`}>Car Model:</h2>
        <p>{booking?.automobile_model?.name}</p>
      </div>
      <div className={`flex items-center gap-1`}>
        <h2 className={`font-bold`}>Car Reg:</h2>
        <p>{booking?.car_registration_no}</p>
      </div>
      <div className={`flex items-center gap-1`}>
        <h2 className={`font-bold`}>Job Start Time:</h2>
        <p>{moment(booking?.job_start_time, "HH:mm").format("hh:mm A")}</p>
      </div>
      <div className={`flex items-center gap-1`}>
        <h2 className={`font-bold`}>Coupon Code:</h2>
        <p>{booking?.coupon_code}</p>
      </div>
      <div className={`flex items-center gap-1`}>
        <h2 className={`font-bold`}>Garage Location:</h2>
        <p>{booking?.garage}</p>
      </div>
      <div className={`flex items-center gap-1`}>
        <h2 className={`font-bold`}>Car Make:</h2>
        <p>{booking?.automobile_make?.name}</p>
      </div>
      <div className={`flex items-center gap-1`}>
        <h2 className={`font-bold`}>Extra Notes:</h2>
        <p>{booking?.garage}</p>
      </div>
      <div className={`flex items-center gap-1`}>
        <h2 className={`font-bold`}>Job Start Date:</h2>
        <p>{booking?.job_start_date}</p>
      </div>
      <div className={`flex items-center gap-1`}>
        <h2 className={`font-bold`}>Status:</h2>
        <p>{booking?.status}</p>
      </div>
      <div className={`flex items-center gap-1`}>
        <h2 className={`font-bold`}>Coupon Discount:</h2>
        <p>{booking?.coupon_discount_amount}</p>
      </div>
    </div>
  );
};

export default ViewBooking;
