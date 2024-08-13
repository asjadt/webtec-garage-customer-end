import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import {
  MdCancel,
  MdClearAll,
  MdDelete,
  MdDeleteSweep,
  MdFileDownloadDone,
} from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  changeBookingStatus,
  changePassword,
  deleteClientBooking,
  getClientBooking,
} from "../../../Apis/auth";
import CustomDataSet from "../../../components/CustomDataSet";
import CustomLoading from "../../../components/CustomLoading";
import CustomPopup from "../../../components/CustomPopup";
import CustomTab from "../../../components/CustomTab";
import Headings from "../../../components/Headings/Headings";
import Pagination from "../../../components/Pagination";
import Table from "../../../components/Table";
import ViewBooking from "./ViewBooking";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { formatRole } from "../../../utils/formatRole";
import { handleApiError } from "../../../utils/apiErrorHandler";
import { decryptID } from "../../../utils/encryptAndDecryptID";
import { CgSandClock } from "react-icons/cg";
import StatusCapsule from "../../../components/Table/StatusCapsule";
export default function MyBooking() {
  // SEARCH PARAMS
  const [searchParams] = useSearchParams();

  const id = decryptID(searchParams.get("id") || "");
  // LOADINGS
  const [isPendingDelete, setIsPendingDelete] = useState(true);

  // ALL SELECTED IDs
  const [selectedIds, setSelectedIds] = useState([]);

  // FILTERS
  const [filters, setFilters] = useState({
    perPage: 20,
    page: 1,

    search: "",
    status: "",

    id: id,
  });

  const [activeTab, setActiveTab] = useState("all");
  const [tabs, setTabs] = useState([
    { id: "all", title: "All", Icon: MdClearAll },
    { id: "completed", title: "Completed", Icon: MdFileDownloadDone },
    { id: "pending", title: "Pending", Icon: CgSandClock },
  ]);

  useEffect(() => {
    setFilters({ ...filters, status: activeTab === "all" ? "" : activeTab });
  }, [activeTab]);

  const { isPending, error, data, refetch, isError } = useQuery({
    queryKey: ["myBookings", filters],
    queryFn: () => getClientBooking(filters),
  });
  // POPUP ERROR MESSAGE
  useEffect(() => {
    if (isError) {
      handleApiError(error);
    }
  }, [isError]);

  // POPUP OPTIONS
  const [popupOption, setPopupOption] = useState({
    open: false,
    type: "",
    id: null,
    onClose: () => {
      setPopupOption({ ...popupOption, open: false });
      setIsUpdated(Math.random());
    },
    overlayStyle: { background: "red" },
    closeOnDocumentClick: false,
  });

  // IF ANY DATA UPDATED
  const [isUpdated, setIsUpdated] = useState();

  const [booking, setBooking] = useState({});

  // HANDLE VIEW
  const handleView = (data) => {
    setBooking(data);
    setPopupOption({
      ...popupOption,
      open: true,
      type: "viewBooking",
      title: "Booking Details",
    });
  };

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
        changeBookingStatus({
          id: data?.id,
          status: "accepted",
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
        changeBookingStatus({
          id: data?.id,
          status: "rejected_by_client",
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
  // HANDLE DELETE
  const handleDelete = (id) => {
    deleteFunc(id?.id);
  };

  // ALL ACTION BUTTONS
  const [actions, setActions] = useState([
    {
      name: "view",
      handler: handleView,
      Icon: AiFillEye,
      colorClass: "text-green-500",
      backgroundColorClass: "bg-green-900",
      disabledOn: [],
      permissions: true,
    },

    {
      name: "accept",
      handler: handleAccept,
      Icon: IoIosCheckmarkCircle,
      colorClass: "text-red-600",
      backgroundColorClass: "bg-red-200",
      isLoading: isPendingDelete,
      disabledOn: [
        {
          attributeName: "status",
          value: "pending",
        },
        {
          attributeName: "status",
          value: "completed",
        },
        {
          attributeName: "status",
          value: "rejected_by_client",
        },
      ],
      permissions: true,
    },
    {
      name: "reject",
      handler: handleReject,
      Icon: MdCancel,
      colorClass: "text-red-600",
      backgroundColorClass: "bg-red-200",
      isLoading: isPendingDelete,
      disabledOn: [
        {
          attributeName: "status",
          value: "pending",
        },
        {
          attributeName: "status",
          value: "completed",
        },
        {
          attributeName: "status",
          value: "rejected_by_client",
        },
      ],
      permissions: true,
    },

    {
      name: "delete",
      handler: handleDelete,
      Icon: MdDelete,
      colorClass: "text-red-600",
      backgroundColorClass: "bg-red-200",
      isLoading: isPendingDelete,
      disabledOn: [],
      permissions: true,
    },
  ]);

  // ALL DISPLAYED COLUMNS IN TABLE
  const [cols, setCols] = useState([
    {
      name: "Garage",
      attribute_name: "garage_name",
      minWidth: 35,
      show: true,
    },
    {
      name: "Car Reg",
      attribute_name: "car_reg",
      minWidth: 25,
      show: true,
      isMainField: true,
    },

    {
      name: "Job Start Date",
      align: "center",
      attribute_name: "job_start_date",
      minWidth: 15,
      show: true,
    },
    {
      name: "Job Start Time",
      align: "center",
      attribute_name: "job_start_time",
      minWidth: 15,
      show: true,
    },
    {
      name: "Status",
      align: "left",
      attribute_name: "format_status",
      minWidth: 10,
      show: true,
    },
  ]);

  // DELETE API
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const deleteFunc = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
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
        deleteClientBooking(id)
          .then((res) => {
            setIsUpdated(Math.random());
            setSelectedIds([]);
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Booking has been deleted.",
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

  return (
    <div className="h-full my-10 " data-auto={"container_admin"}>
      <div className="relative h-full" data-auto="sub_container_admin">
        {/* POPUP  */}
        <CustomPopup
          popupClasses={`w-full sm:w-[70vw] md:w-[70vw] lg:w-[50vw]`}
          popupOption={popupOption}
          setPopupOption={setPopupOption}
          Component={
            popupOption?.type === "viewBooking" && (
              <ViewBooking
                booking={booking}
                popupOption={popupOption}
                setPopupOption={setPopupOption}
                handleClosePopup={() =>
                  setPopupOption({ ...popupOption, type: "", open: false })
                }
              />
            )
          }
        />

        {/* HEADING AND TABLE */}

        <div>
          {/* ======= HEADING AND FILTERING AREA =========  */}
          <div
            id="header"
            className="flex flex-col md:flex-row justify-between items-center relative gap-5"
          >
            <div
              id="header-content"
              className="flex flex-col justify-center items-center gap-2 w-full text-left"
            >
              <div className={`flex items-center gap-5`}>
                <Headings level={1}>
                  {activeTab === "all"
                    ? "All Bookings"
                    : activeTab === "completed"
                    ? "Completed Bookings"
                    : "Pending Bookings"}
                </Headings>
              </div>
              <h3>
                Total {data?.total} {data?.total > 1 ? "Bookings" : "Booking"}{" "}
                Found
              </h3>
              {/* ======= TAB AREA =========  */}
              <div className={`flex justify-center`}>
                <CustomTab
                  tabs={tabs}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  gridCol="grid-cols-3"
                  filters={filters}
                  setFilters={setFilters}
                />
              </div>
            </div>
          </div>

          {/* =========== TABLE AREA ============  */}
          <div className="pt-5 relative">
            {/* DATASET AND FILTERS */}
            <div className={`flex justify-between items-center`}>
              <CustomDataSet cols={cols} setCols={setCols} dataAuto="admin" />
            </div>

            <Table
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
              itemsPerPage={filters?.perPage}
              totalItems={data?.total}
              setPageNo={(data) => setFilters({ ...filters, page: data })}
              // setPerPage={setPerPage}
              perPage={filters?.perPage}
              isLoading={isPending}
              rows={data?.data?.map((d) => ({
                ...d,
                id: d?.id,
                garage_name: d?.garage?.name,
                car_reg: d?.car_registration_no,
                job_start_date: moment(d?.job_start_date, "YYYY-MM-DD").format(
                  "DD-MM-YYYY"
                ),
                job_start_time: moment(d?.job_start_time, "HH:mm").format(
                  "hh:mm A"
                ),
                format_status: <StatusCapsule text={d?.status} />,
              }))}
              actions={actions}
              cols={cols}
              dataAuto="all-job-type"
              getFullDataToActionHandler={true}
            />
            {/* PAGINATION  */}
            {data?.total !== 0 && (
              <div
                data-auto={`admin-pagination-all-employees`}
                className="flex-col flex justify-center bg-base-300 items-center py-5"
              >
                <Pagination
                  forcePage={filters?.page}
                  itemsPerPage={filters?.perPage}
                  totalItems={data?.total}
                  onChangePage={(page) => {
                    setFilters({ ...filters, page: page });
                  }}
                  dataAuto="admin"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
