import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { MdDeleteSweep } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { getClientJobs } from "../../../Apis/auth";
import CustomDataSet from "../../../components/CustomDataSet";
import CustomLoading from "../../../components/CustomLoading";
import CustomPopup from "../../../components/CustomPopup";
import CustomTab from "../../../components/CustomTab";
import Headings from "../../../components/Headings/Headings";
import Pagination from "../../../components/Pagination";
import Table from "../../../components/Table";
import ViewJob from "./ViewJob";
import { FaStar } from "react-icons/fa";

export default function MyJob() {
  // SEARCH PARAMS
  const [searchParams] = useSearchParams();

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

  const [job, setJob] = useState({});

  // HANDLE VIEW
  const handleView = (data) => {
    setJob(data);
    setPopupOption({
      ...popupOption,
      open: true,
      type: "viewAppliedJob",
      title: "Applied Job Details",
    });
  };

  // HANDLE RATE
  const handleRate = (data) => {
    // deleteFunc(id?.id);
  };

  // ALL ACTION BUTTONS
  const [actions, setActions] = useState([
    {
      name: "rate",
      handler: handleRate,
      Icon: FaStar,
      colorClass: "text-secondary",
      backgroundColorClass: "bg-secondary-content",
      permissions: [EMPLOYEE_UPDATE],
      disabledOn: [],
    },

    {
      name: "view",
      handler: handleView,
      Icon: AiFillEye,
      colorClass: "text-green-500",
      backgroundColorClass: "bg-green-900",
      disabledOn: [],
      permissions: true,
    },

    // {
    //   name: "delete",
    //   handler: handleDelete,
    //   Icon: MdDelete,
    //   colorClass: "text-red-600",
    //   backgroundColorClass: "bg-red-200",
    //   isLoading: isPendingDelete,
    //   disabledOn: [],
    //   permissions: true,
    // },
  ]);

  // ALL DISPLAYED COLUMNS IN TABLE
  const [cols, setCols] = useState([
    {
      name: "Car Reg",
      attribute_name: "car_reg",
      minWidth: 25,
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
      name: "Status",
      align: "center",
      attribute_name: "status",
      minWidth: 10,
      show: true,
    },
  ]);

  const [activeTab, setActiveTab] = useState("all");
  const [tabs, setTabs] = useState([
    { id: "all", title: "All" },
    { id: "completed", title: "Completed" },
    { id: "pending", title: "Pending" },
  ]);

  useEffect(() => {
    setFilters({ ...filters, status: activeTab === "all" ? "" : activeTab });
  }, [activeTab]);

  const { isPending, error, data, refetch, isRefetching, fetchNextPage } =
    useQuery({
      queryKey: ["users", filters],
      queryFn: ({ pageParam = 0 }) => getClientJobs(filters),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.nextPage ? lastPage.nextPage : undefined;
      },
    });

  // DELETE API
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  // const deleteFunc = (id) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes, delete it!",
  //     customClass: {
  //       title: "text-primary",
  //       container: "",
  //       popup: "bg-base-300 shadow-xl rounded-xl border border-primary",
  //       icon: "text-red-500",
  //       cancelButton: "bg-green-500",
  //     },
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       setIsDeleteLoading(true);
  //       deleteClientBooking(id)
  //         .then((res) => {
  //           setIsUpdated(Math.random());
  //           setSelectedIds([]);
  //           refetch();
  //           Swal.fire({
  //             title: "Deleted!",
  //             text: "Booking has been deleted.",
  //             icon: "success",
  //           });
  //           setIsDeleteLoading(false);
  //         })
  //         .catch((error) => {
  //           setIsDeleteLoading(false);
  //           handleApiError(error, "#00121");
  //         });
  //     }
  //   });
  // };
  /***********************************************************************
   *                    UI RENDERING
   ***********************************************************************/
  console.log({ data });

  return (
    <div className="h-full my-10 " data-auto={"container_admin"}>
      <div className="relative h-full" data-auto="sub_container_admin">
        {/* POPUP  */}
        <CustomPopup
          popupClasses={`w-[70vw]`}
          popupOption={popupOption}
          setPopupOption={setPopupOption}
          Component={
            popupOption?.type === "viewAppliedJob" && (
              <ViewJob
                job={job}
                popupOption={popupOption}
                setPopupOption={setPopupOption}
              />
            )
          }
        />
        {/* ========IF MULTIPLE ID SELECTED ======== */}
        {selectedIds.length > 1 && (
          <div className="z-[10] absolute bg-base-300 rounded-xl px-5 py-2 left-1/2 -translate-x-1/2 border border-primary border-opacity-40 flex justify-center items-center gap-2 shadow-xl ">
            <button
              data-auto={`admin-delete-button-all-employees`}
              // onClick={() => deleteFunc(selectedIds)}
              data-tip="Delete all selected items"
              className="tooltip tooltip-bottom tooltip-primary"
            >
              <MdDeleteSweep className="text-red-500 text-2xl" />
            </button>
          </div>
        )}
        {/* ========================================  */}

        {/* ======= TAB AREA =========  */}
        <div className={`flex justify-center`}>
          <CustomTab
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            gridCol="grid-cols-3"
          />
        </div>
        {/* HEADING AND TABLE */}
        {isPending ? (
          <CustomLoading />
        ) : (
          <div>
            {/* ========================================  */}

            {/* ======= HEADING AND FILTERING AREA =========  */}
            <div
              id="header"
              className="flex flex-col md:flex-row justify-between items-center relative gap-5"
            >
              <div
                id="header-content"
                className="flex flex-col gap-2 w-full text-left"
              >
                <div className={`flex items-center gap-5`}>
                  <Headings level={1}>
                    {activeTab === "all"
                      ? "All Applied Jobs"
                      : activeTab === "completed"
                      ? "Completed Applied Jobs"
                      : "Pending Applied Jobs"}
                  </Headings>
                </div>
                <h3>
                  Total {data?.total}{" "}
                  {data?.total > 1 ? "Applied Jobs" : "Applied Job"} Found
                </h3>
              </div>

              {/* <CreateAndExportSection
              exportBtn={true}
              createPermission={permissions.includes(EMPLOYEE_CREATE)}
              createHandler={handleCreate}
              pdfHandler={handleExport}
              csvHandler={handleExport}
              dataAuto="admin"
            /> */}
            </div>

            {/* ================================================  */}

            {/* =========== TABLE AREA ============  */}
            <div className="pt-5 relative">
              {/* DATASET AND FILTERS */}
              <div className={`flex justify-between items-center`}>
                <CustomDataSet cols={cols} setCols={setCols} dataAuto="admin" />
                {/* <CustomFilter
              totalData={getEmployeesQuery?.data?.data?.length}
              isLoading={isCombineDataLoading}
              onApplyChange={(e) => {
                console.log({ e });
                setFilters((prev) => ({
                  ...prev,
                  ...e,
                }));
              }}
              options={filterOptions}
              /> */}
              </div>
              {/* ALL APPLIED FILTERS */}
              <div>
                {/* <AppliedFilters setFilters={setFilters} filters={filterOptions} /> */}
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
                  car_reg: d?.car_registration_no,
                  job_start_time: moment(d?.job_start_time, "HH:mm").format(
                    "hh:mm A"
                  ),
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
                  className="flex-col flex justify-center bg-base-300 items-center py-1"
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
        )}
      </div>
    </div>
  );
}
