import moment from "moment";
import React, { useState } from "react";
import { FaInbox } from "react-icons/fa";
import { IoIosCheckmarkCircle, IoIosInformationCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import Swal from "sweetalert2";
import { preBookingsBisManage } from "../../../Apis/auth";
import CustomTab from "../../../components/CustomTab";
import Table from "../../../components/Table";
import { handleApiError } from "../../../utils/apiErrorHandler";
import { formatRole } from "../../../utils/formatRole";

const ViewPendingJob = ({
  popupOption,
  setPopupOption,
  job,
  refetch,
  handleClosePopup,
}) => {
  const [isUpdated, setIsUpdated] = useState();
  const [tabs, setTabs] = useState([
    { id: "job", title: "Details", Icon: IoIosInformationCircle },
    { id: "applications", title: "Applications", Icon: FaInbox },
  ]);
  const [activeTab, setActiveTab] = useState("job");
  const [isAccept, setIsAccept] = useState(false);
  // HANDLE ACCEPT
  const handleAccept = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, accept it!",
      customClass: {
        title: "text-primary",
        container: "",
        popup: "bg-base-300 shadow-xl rounded-xl border border-primary",
        icon: "text-red-500",
        cancelButton: "bg-green-500",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setIsAccept(true);
        preBookingsBisManage({
          is_confirmed: true,
          job_bid_id: data?.id,
          pre_booking_id: data?.pre_booking_id,
        })
          .then((res) => {
            setIsUpdated(Math.random());
            handleClosePopup();
            // setSingleJob({
            //   ...job,
            //   job_bids: { ...job.job_bids, status: "accepted" },
            // });
            Swal.fire({
              title: "Accepted!",
              text: "Booking has been accepted successfully.",
              icon: "success",
            });
            setIsAccept(false);
          })
          .catch((error) => {
            setIsAccept(false);
            handleApiError(error, "#00121");
          });
      }
    });
  };
  const handleReject = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
      customClass: {
        title: "text-primary",
        container: "",
        popup: "bg-base-300 shadow-xl rounded-xl border border-primary",
        icon: "text-red-500",
        cancelButton: "bg-green-500",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setIsAccept(true);
        preBookingsBisManage({
          is_confirmed: false,
          job_bid_id: data?.id,
          pre_booking_id: data?.pre_booking_id,
        })
          .then((res) => {
            setIsUpdated(Math.random());
            refetch();
            Swal.fire({
              title: "Rejected!",
              text: "Booking has been rejected successfully.",
              icon: "success",
            });
            setIsAccept(false);
          })
          .catch((error) => {
            setIsAccept(false);
            handleApiError(error, "#00121");
          });
      }
    });
  };

  const [cols, setCols] = useState([
    {
      name: "Garage Name",
      attribute_name: "garage_name",
      minWidth: 35,
      show: true,
      isMainField: true,
    },
    {
      name: "Garage Location",
      attribute_name: "garage_location",
      minWidth: 20,
      show: true,
    },
    {
      name: "Job Start Date",
      attribute_name: "job_start_date",
      minWidth: 20,
      show: true,
    },

    {
      name: "Job Start Time",
      attribute_name: "job_start_time",
      minWidth: 20,
      show: true,
    },
    {
      name: "Price",
      attribute_name: "price",
      minWidth: 5,
      show: true,
    },
    {
      name: "Status",
      attribute_name: "format_status",
      minWidth: 20,
      show: true,
    },
  ]);
  const [actions, setActions] = useState([
    {
      name: "accept",
      handler: handleAccept,
      Icon: IoIosCheckmarkCircle,
      colorClass: "text-red-600",
      backgroundColorClass: "bg-red-200",
      isLoading: false,
      disabledOn: [],
      permissions: job?.status !== "booked",
    },
    {
      name: "reject",
      handler: handleReject,
      Icon: MdCancel,
      colorClass: "text-red-600",
      backgroundColorClass: "bg-red-200",
      isLoading: false,
      disabledOn: [],
      permissions: job?.status !== "booked",
    },
  ]);

  return (
    <>
      <div className={`flex justify-center mt-6`}>
        <CustomTab
          layoutId={"pending-jobs-tabs"}
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          gridCol="grid-cols-2"
        />
      </div>

      {/* JOB DETAILS  */}
      {activeTab === "job" && (
        <div
          className={`pb-5 flex flex-col gap-4 max-h-[500px] overflow-y-auto scrollbar-none`}
        >
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
                {job?.pre_booking_sub_services?.map((service, i) => (
                  <li key={i}>
                    {service?.sub_service?.name}
                    {job?.pre_booking_sub_services?.length - 1 === i
                      ? "."
                      : ","}
                  </li>
                ))}
              </ul>
            </span>
          </div>

          {/* CAR MODEL  */}
          <div className={`flex items-start border-b pb-4`}>
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

          {/* CAR REG  */}
          <div className={`flex items-start border-b pb-4`}>
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

          {/* Job Start Time  */}
          <div className={`flex items-start border-b pb-4`}>
            {/* TITLE  */}
            <span className={`w-[200px] font-bold`}>Job Start Time: </span>
            <span
              data-auto={`personal-details-v2-first-name-view-employee`}
              className="text-gray-600 flex-1 w-[calc(100%-200px)] break-words"
            >
              {/* DETAILS  */}
              {moment(job?.job_start_time, "HH:mm").format("hh:mm A")}
            </span>
          </div>

          {/* Car Make  */}
          <div className={`flex items-start border-b pb-4`}>
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

          {/* Job Start Date  */}
          <div className={`flex items-start border-b pb-4`}>
            {/* TITLE  */}
            <span className={`w-[200px] font-bold`}>Job Start Date: </span>
            <span
              data-auto={`personal-details-v2-first-name-view-employee`}
              className="text-gray-600 flex-1 w-[calc(100%-200px)] break-words"
            >
              {/* DETAILS  */}
              {job?.job_start_date}
            </span>
          </div>

          {/* Status  */}
          <div className={`flex items-start border-b pb-4`}>
            {/* TITLE  */}
            <span className={`w-[200px] font-bold`}>Status: </span>
            <span
              data-auto={`personal-details-v2-first-name-view-employee`}
              className="text-gray-600 flex-1 w-[calc(100%-200px)] break-words"
            >
              {/* DETAILS  */}
              {job?.status}
            </span>
          </div>

          {/* Extra Notes  */}
          <div className={`flex items-start border-b pb-4`}>
            {/* TITLE  */}
            <span className={`w-[200px] font-bold`}>Extra Notes: </span>
            <span
              data-auto={`personal-details-v2-first-name-view-employee`}
              className="text-gray-600 flex-1 w-[calc(100%-200px)] break-words"
            >
              {/* DETAILS  */}
              {job?.additional_information || "N/A"}
            </span>
          </div>
        </div>
      )}

      {/* APPLIED GARAGE LIST  */}
      {activeTab === "applications" &&
        (job?.job_bids?.length > 0 ? (
          <div className={`min-h-[560px]`}>
            <Table
              totalItems={job?.job_bids?.length}
              rows={job?.job_bids?.map((d) => ({
                ...d,
                id: d?.id,
                garage_name: d?.garage?.name,
                garage_location: d?.garage?.address_line_1,
                job_start_date: moment(d?.job_start_date, "YYYY-MM-DD").format(
                  "DD-MM-YYYY"
                ),
                job_start_time: moment(d?.job_start_time, "HH:mm").format(
                  "hh:mm A"
                ),
                price: (
                  <span>
                    {d?.price}{" "}
                    <span className={`text-primary`}>
                      {d?.garage?.currency}
                    </span>
                  </span>
                ),

                format_status: formatRole(d?.status),
              }))}
              actions={actions}
              cols={cols}
              dataAuto="all-job-type"
              getFullDataToActionHandler={true}
              smGrid="sm:grid-cols-1"
              onlyCard={true}
            />
          </div>
        ) : (
          <div
            className={`pt-20 pb-40 flex flex-col justify-center items-center gap-5`}
          >
            <img src="/assets/NoDataFound.svg" alt="" className={`w-32`} />
            <span className={`text-2xl font-medium `}>
              No Garage Applied Yet!
            </span>
          </div>
        ))}
    </>
  );
};

export default ViewPendingJob;
