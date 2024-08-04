import moment from "moment";
import React, { useState } from "react";
import CustomTab from "../../../components/CustomTab";
import Table from "../../../components/Table";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { preBookingsBisManage } from "../../../Apis/auth";
import { formatRole } from "../../../utils/formatRole";

const ViewPendingJob = ({ popupOption, setPopupOption, job }) => {
  const [tabs, setTabs] = useState([
    { id: "job", title: "Details" },
    { id: "applications", title: "Applications" },
  ]);
  const [activeTab, setActiveTab] = useState("job");

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
        setIsDeleteLoading(true);
        preBookingsBisManage({
          is_confirmed: true,
          job_bid_id: data?.id,
          pre_booking_id: data?.pre_booking_id,
        })
          .then((res) => {
            setIsUpdated(Math.random());
            setSelectedIds([]);
            refetch();
            Swal.fire({
              title: "Accepted!",
              text: "Booking has been accepted successfully.",
              icon: "success",
            });
            setIsDeleteLoading(false);
          })
          .catch((error) => {
            setIsDeleteLoading(false);
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
        setIsDeleteLoading(true);
        preBookingsBisManage({
          is_confirmed: false,
          job_bid_id: data?.id,
          pre_booking_id: data?.pre_booking_id,
        })
          .then((res) => {
            setIsUpdated(Math.random());
            setSelectedIds([]);
            refetch();
            Swal.fire({
              title: "Rejected!",
              text: "Booking has been rejected successfully.",
              icon: "success",
            });
            setIsDeleteLoading(false);
          })
          .catch((error) => {
            setIsDeleteLoading(false);
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
      permissions: true,
    },
    {
      name: "reject",
      handler: handleReject,
      Icon: MdCancel,
      colorClass: "text-red-600",
      backgroundColorClass: "bg-red-200",
      isLoading: false,
      disabledOn: [],
      permissions: true,
    },
  ]);
  return (
    <>
      <div className={`flex justify-center mt-7`}>
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
        <div className={`my-10 flex flex-col gap-4`}>
          <div className={`flex items-center gap-1`}>
            <h2 className={`font-bold`}>Services:</h2>
            <div className={`flex items-center gap-1 flex-wrap`}>
              {job?.pre_booking_sub_services?.map((service, i) => (
                <p key={i}>
                  {service?.sub_service?.name}
                  {job?.pre_booking_sub_services?.length - 1 === i ? "." : ","}
                </p>
              ))}
            </div>
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
            />
          </div>
        ) : (
          <div>No Garage Applied Yet!</div>
        ))}
    </>
  );
};

export default ViewPendingJob;
