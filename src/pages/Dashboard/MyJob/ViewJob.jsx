import moment from "moment";
import React from "react";

const ViewJob = ({ popupOption, setPopupOption, job }) => {
  console.log({ job });
  return (
    <div className={`my-10 flex flex-col gap-4`}>
      <div className={`flex items-center gap-1`}>
        <h2 className={`font-bold`}>Garage Name:</h2>
        <p>{job?.garage?.name}</p>
      </div>
      <div className={`flex items-center gap-1`}>
        <h2 className={`font-bold`}>Packages:</h2>
        <div>
          {job?.job_packages?.map((jobPackage) => (
            <ul className={`list-disc ml-6`} key={jobPackage?.id}>
              <li className={`font-medium`}>
                Package Name:{" "}
                <span className={`font-normal`}>
                  {jobPackage?.garage_package?.name}
                </span>
              </li>{" "}
              <li className={`font-medium`}>
                Package Price:{" "}
                <span className={`font-normal`}>
                  {jobPackage?.garage_package?.price}
                </span>
              </li>
            </ul>
          ))}
        </div>
      </div>
      <div className={`flex items-center gap-1`}>
        <h2 className={`font-bold`}>Services:</h2>
        <p>
          {job?.job_sub_services?.map((service, i) => (
            <p key={i}>{service?.sub_service?.name}</p>
          ))}
        </p>
      </div>
      <div className={`flex items-center gap-1`}>
        <h2 className={`font-bold`}>Car Model:</h2>
        <p>{job?.automobile_model?.name}</p>
      </div>
      <div className={`flex items-center gap-1`}>
        <h2 className={`font-bold`}>Car Reg:</h2>
        <p>{job?.car_registration_no}</p>
      </div>
      <div className={`flex items-center gap-1`}>
        <h2 className={`font-bold`}>Job Start Time:</h2>
        <p>{moment(job?.job_start_time, "HH:mm").format("hh:mm A")}</p>
      </div>
      <div className={`flex items-center gap-1`}>
        <h2 className={`font-bold`}>Garage Location:</h2>
        <p>{job?.garage?.address_line_1}</p>
      </div>
      <div className={`flex items-center gap-1`}>
        <h2 className={`font-bold`}>Booking Price::</h2>
        <p>&#8364; {job?.final_price}</p>
      </div>
      <div className={`flex items-center gap-1`}>
        <h2 className={`font-bold`}>Car Make:</h2>
        <p>{job?.automobile_make?.name}</p>
      </div>
      <div className={`flex items-center gap-1`}>
        <h2 className={`font-bold`}>Extra Notes:</h2>
        <p>{job?.additional_information}</p>
      </div>
      <div className={`flex items-center gap-1`}>
        <h2 className={`font-bold`}>Job Start Date:</h2>
        <p>{job?.job_start_date}</p>
      </div>
      <div className={`flex items-center gap-1`}>
        <h2 className={`font-bold`}>Status:</h2>
        <p>{job?.status}</p>
      </div>
    </div>
  );
};

export default ViewJob;
