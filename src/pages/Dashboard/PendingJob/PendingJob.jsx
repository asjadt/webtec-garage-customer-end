import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CheckPermission from "../../../CheckPermission";
import CustomPopup from "../../../components/CustomPopup";
import {
  MdClearAll,
  MdDelete,
  MdDeleteSweep,
  MdFileDownloadDone,
} from "react-icons/md";
import CustomDataSet from "../../../components/CustomDataSet";
import CustomFilter from "../../../components/Filter/CustomFilter";
import AppliedFilters from "../../../components/Filter/AppliedFilters";
import SplitDescription from "../../../components/SplitDescription";
import Pagination from "../../../components/Pagination";
import moment from "moment";
import { EMPLOYEE_DELETE, EMPLOYEE_VIEW } from "../../../constant/permissions";
import Headings from "../../../components/Headings/Headings";
import Table from "../../../components/Table";
import CustomTab from "../../../components/CustomTab";
import { useQuery } from "@tanstack/react-query";
import {
  deleteClientBooking,
  deleteClientPreBooking,
  getClientBooking,
  getClientPreBooking,
} from "../../../Apis/auth";
import CustomLoading from "../../../components/CustomLoading";
import { AiFillEye } from "react-icons/ai";
import Swal from "sweetalert2";
import { handleApiError } from "../../../utils/apiErrorHandler";
import { formatRole } from "../../../utils/formatRole";
import ViewJob from "../MyJob/ViewJob";
import ViewPendingJob from "./ViewPendingJob";
import { decryptID } from "../../../utils/encryptAndDecryptID";
import { FiCheckCircle } from "react-icons/fi";
import { CgSandClock } from "react-icons/cg";
import StatusCapsule from "../../../components/Table/StatusCapsule";

export default function PendingJob() {
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
      type: "viewPendingJob",
      title: "Pending Job Details",
    });
  };

  // HANDLE DELETE
  const handleDelete = (id) => {
    deleteFunc(id?.id);
  };

  // ALL DISPLAYED COLUMNS IN TABLE
  const [cols, setCols] = useState([
    {
      name: "Car Reg",
      attribute_name: "car_reg",
      minWidth: 40,
      show: true,
      isMainField: true,
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
      name: "Garage Applied",
      attribute_name: "garage_applied",
      minWidth: 5,
      show: true,
      align: "center",
    },
    {
      name: "Status",
      align: "left",
      attribute_name: "format_status",
      minWidth: 10,
      show: true,
    },
  ]);

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
    queryKey: ["pendingJobs", filters],
    queryFn: () => getClientPreBooking(filters),
  });

  // POPUP ERROR MESSAGE
  useEffect(() => {
    if (isError) {
      handleApiError(error);
    }
  }, [isError]);

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
        deleteClientPreBooking(id)
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
      name: "delete",
      handler: handleDelete,
      Icon: MdDelete,
      colorClass: "text-red-600",
      backgroundColorClass: "bg-red-200",
      isLoading: isDeleteLoading,
      disabledOn: [],
      permissions: true,
    },
  ]);

  return (
    <div className="h-full my-10 " data-auto={"container_admin"}>
      <div className="relative h-full" data-auto="sub_container_admin">
        {/* POPUP  */}
        <CustomPopup
          popupClasses={`w-full sm:w-[70vw] md:w-[70vw] lg:w-[50vw]`}
          popupOption={popupOption}
          setPopupOption={setPopupOption}
          Component={
            popupOption?.type === "viewPendingJob" && (
              <ViewPendingJob
                handleClosePopup={(e) => {
                  setPopupOption({ ...popupOption, open: false, type: "" });
                }}
                job={booking}
                popupOption={popupOption}
                setPopupOption={setPopupOption}
                refetch={refetch}
              />
            )
          }
        />

        {/* HEADING AND TABLE */}
        <div>
          <div
            id="header"
            className="flex flex-col md:flex-row justify-between items-center relative gap-5"
          >
            <div
              id="header-content"
              className="flex flex-col justify-center items-center gap-2 w-full text-left"
            >
              {/* PAGE TITLE  */}
              <div className={`flex items-center gap-5`}>
                <Headings level={1}>
                  {activeTab === "all"
                    ? "All Pending Jobs"
                    : activeTab === "completed"
                    ? "Completed Pending Jobs"
                    : "Pending Jobs"}
                </Headings>
              </div>

              {/* TOTAL DATA  */}
              <h3>
                Total {data?.total}{" "}
                {data?.total > 1 ? "Pending Jobs" : "Pending Job"} Found
              </h3>

              {/* TABS  */}
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

          <div className="pt-5 relative">
            {/* DATASET */}
            <div className={`flex justify-between items-center`}>
              <CustomDataSet cols={cols} setCols={setCols} dataAuto="admin" />
            </div>

            {/* TABLE  */}
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
                car_reg: d?.car_registration_no,
                job_start_date: moment(d?.job_start_date, "YYYY-MM-DD").format(
                  "DD-MM-YYYY"
                ),
                job_start_time: moment(d?.job_start_time, "HH:mm").format(
                  "hh:mm A"
                ),
                garage_applied: d?.job_bids
                  ? d?.job_bids?.length
                  : "loading...",

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
