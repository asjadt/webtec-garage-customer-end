import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CheckPermission from "../../../CheckPermission";
import CustomPopup from "../../../components/CustomPopup";
import { MdDelete, MdDeleteSweep } from "react-icons/md";
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
import { deleteClientBooking, getClientBooking } from "../../../Apis/auth";
import CustomLoading from "../../../components/CustomLoading";
import { AiFillEye } from "react-icons/ai";
import Swal from "sweetalert2";

export default function MyBooking() {
  const navigate = useNavigate();
  // const { user } = useA+uth();
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  // SEARCH PARAMS
  const [searchParams] = useSearchParams();
  const [startDate, setStartDate] = useState(searchParams.get("start_date"));
  const [endDate, setEndDate] = useState(searchParams.get("end_date"));

  const [isDefaultFilterLoading, setIsDefaultFilterLoading] = useState(true);
  const [defaultFilters, setDefaultFilters] = useState([]);

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

  // const getEmployeesQuery = useQuery({
  //   queryKey: ["employees", "admin", filters, isUpdated],
  //   queryFn: async () => {
  //     const data = await allEmployees(filters);
  //     return data;
  //   },
  // });

  // FILTER DATA
  // const [isCombineDataLoading, setIsCombineDataLoading] = useState(true);
  // const [combineData, setCombineData] = useState({});
  // console.log({ combineData });
  // useEffect(() => {
  //   setIsCombineDataLoading(true);
  //   getAllCombineData()
  //     .then((res) => {
  //       console.log({ res });
  //       setCombineData(res);
  //       setIsCombineDataLoading(false);
  //     })
  //     .catch((error) => {
  //       setIsCombineDataLoading(false);

  //       handleApiError(error, "#00119");
  //     });
  // }, []);

  // const filterOptions = [
  //   // ===========================
  //   // PERSONAL DETAILS
  //   // ===========================
  //   // TYPE: text
  //   {
  //     id: "full_name",
  //     label: "full name",
  //     groupName: "personal_details",
  //     type: "text",
  //     defaultValue: filters?.full_name || "",
  //   },

  //   // TYPE: email
  //   {
  //     id: "email",
  //     label: "Email",
  //     groupName: "personal_details",
  //     type: "email",
  //     defaultValue: filters?.email || "",
  //   },
  //   // TYPE: text
  //   {
  //     id: "NI_number",
  //     label: "NI Number",
  //     groupName: "personal_details",
  //     type: "text",
  //     defaultValue: filters?.NI_number || "",
  //   },
  //   // TYPE: single-select
  //   {
  //     id: "gender",
  //     label: "Gender",
  //     groupName: "personal_details",
  //     type: "single-select",
  //     options: [
  //       { id: 0, label: "Male", value: "male" },
  //       { id: 1, label: "Female", value: "female" },
  //       { id: 2, label: "Other", value: "other" },
  //     ],
  //     defaultSelectedValues: filters?.gender || [],
  //   },

  //   // ===========================
  //   // EMPLOYMENT
  //   // ===========================
  //   // TYPE: range
  //   {
  //     id: "salary_per_annum",
  //     label: "Salary",
  //     groupName: "employment",
  //     type: "range",
  //     defaultSelectedValues: filters?.salary_per_annum || [],
  //   },

  //   // TYPE: date-range
  //   {
  //     id: "joining_date",
  //     label: "Joining Date",
  //     groupName: "employment",
  //     type: "date-range",
  //     defaultSelectedValues: filters?.joining_date || [],
  //   },

  //   // TYPE: multi-select
  //   {
  //     id: "designation_id",
  //     label: "Designation",
  //     groupName: "employment",
  //     type: "multi-select",
  //     options: combineData?.designations?.map((es) => ({
  //       id: es?.id,
  //       label: formatRole(es?.name),
  //       value: es?.id,
  //     })),
  //     defaultSelectedValues: filters?.designation_id || [],
  //   },
  //   // TYPE: number
  //   {
  //     id: "weekly_contractual_hours",
  //     label: "Weekly Contract Hours",
  //     groupName: "employment",
  //     type: "number",
  //     defaultValue: filters?.weekly_contractual_hours || "",
  //   },

  //   // TYPE: multi-select
  //   {
  //     id: "employment_status_id",
  //     label: "Employment Status",
  //     groupName: "employment",
  //     type: "multi-select",
  //     options: combineData?.employment_statuses?.map((es) => ({
  //       id: es?.id,
  //       label: formatRole(es?.name),
  //       value: es?.id,
  //     })),
  //     defaultSelectedValues: filters?.employment_status_id || [],
  //   },
  //   // TYPE: multi-select
  //   {
  //     id: "work_location_ids",
  //     label: "Work Site",
  //     groupName: "employment",
  //     type: "multi-select",
  //     options: combineData?.work_locations?.map((es) => ({
  //       id: es?.id,
  //       label: formatRole(es?.name),
  //       value: es?.id,
  //     })),
  //     defaultSelectedValues: filters?.work_location_id || [],
  //   },
  //   // TYPE: multi-select
  //   {
  //     id: "department_id",
  //     label: "Department",
  //     groupName: "employment",
  //     type: "multi-select",
  //     options: combineData?.departments?.map((es) => ({
  //       id: es?.id,
  //       label: formatRole(es?.name),
  //       value: es?.id,
  //     })),
  //     defaultSelectedValues: filters?.department_id || [],
  //   },
  //   // TYPE: multi-select
  //   {
  //     id: "recruitment_process_ids",
  //     label: "On Boarding Process",
  //     groupName: "employment",
  //     type: "multi-select",
  //     options: combineData?.recruitment_processes?.map((es) => ({
  //       id: es?.id,
  //       label: formatRole(es?.name),
  //       value: es?.id,
  //     })),
  //     defaultSelectedValues: filters?.recruitment_process_ids || [],
  //   },
  //   // TYPE: multi-select
  //   {
  //     id: "right_to_work_code",
  //     label: "Right To Work Status",
  //     groupName: "employment",
  //     type: "multi-select",
  //     options: combineData?.right_to_work_status?.map((es) => ({
  //       id: es?.id,
  //       label: formatRole(es?.name),
  //       value: es?.id,
  //     })),
  //     defaultSelectedValues: filters?.right_to_work_code || [],
  //   },
  //   // TYPE: multi-select
  //   {
  //     id: "pension_scheme_status",
  //     label: "Pension scheme status",
  //     groupName: "employment",
  //     type: "multi-select",
  //     options: [
  //       {
  //         id: 0,
  //         label: "Opt In",
  //         value: "opt_in",
  //       },
  //       {
  //         id: 1,
  //         label: "Opt Out",
  //         value: "opt_out",
  //       },
  //     ],
  //     defaultSelectedValues: filters?.pension_scheme_status || [],
  //   },

  //   // ===========================
  //   // LEAVE
  //   // ===========================
  //   // TYPE: multi-select
  //   {
  //     id: "leave_status",
  //     label: "Leave Status",
  //     groupName: "leave_details",
  //     type: "multi-select",
  //     options: [
  //       { id: 1, label: "Yes", value: 1 },
  //       { id: 0, label: "No", value: 0 },
  //     ],
  //     defaultSelectedValues: filters?.leave_status || [],
  //   },
  //   // TYPE: date-range
  //   {
  //     id: "leave_date",
  //     label: "Leave Dates",
  //     groupName: "leave_details",
  //     type: "date-range",
  //     defaultSelectedValues: filters?.leave_date || [],
  //   },

  //   // ===========================
  //   // HOLIDAY
  //   // ===========================
  //   // TYPE: multi-select
  //   {
  //     id: "holiday_status",
  //     label: "Holiday Status",
  //     groupName: "holiday_status",
  //     type: "multi-select",
  //     options: [
  //       { id: 1, label: "Yes", value: 1 },
  //       { id: 0, label: "No", value: 0 },
  //     ],
  //     defaultSelectedValues: filters?.holiday_status || [],
  //   },
  //   // TYPE: date-range
  //   {
  //     id: "holiday_date",
  //     label: "Holiday Dates",
  //     groupName: "holiday_details",
  //     type: "date-range",
  //     defaultSelectedValues: filters?.holiday_date || [],
  //   },

  //   // ===========================
  //   // IMMIGRATION
  //   // ===========================
  //   // TYPE: multi-select
  //   {
  //     id: "immigration_status",
  //     label: "Immigration status",
  //     groupName: "immigration",
  //     type: "multi-select",
  //     options: [
  //       {
  //         id: 0,
  //         label: "British citizen",
  //         value: "british_citizen",
  //       },
  //       { id: 1, label: "ILR", value: "ilr" },
  //       { id: 2, label: "Immigrant", value: "immigrant" },
  //       { id: 3, label: "Sponsored", value: "sponsored" },
  //     ],
  //     defaultSelectedValues: filters?.immigration_status || [],
  //   },
  //   // TYPE: multi-select
  //   {
  //     id: "sponsorship_status",
  //     label: "Sponsorship status",
  //     groupName: "immigration",
  //     type: "multi-select",
  //     options: [
  //       { id: 0, label: "Unassigned", value: "unassigned" },
  //       { id: 1, label: "Assigned", value: "assigned" },
  //       { id: 2, label: "Visa applied", value: "visa_applied" },
  //       { id: 3, label: "Visa rejected", value: "visa_rejected" },
  //       { id: 4, label: "Visa grants", value: "visa_grantes" },
  //       { id: 5, label: "Withdrawal", value: "withdrawal" },
  //     ],
  //     defaultSelectedValues: filters?.sponsorship_status || [],
  //   },

  //   // TYPE: range
  //   {
  //     id: "visa_expiry_date",
  //     label: "Visa Expiry",
  //     groupName: "visa",
  //     type: "range",
  //     defaultSelectedValues: filters?.visa_expiry_date || [],
  //   },

  //   // ===========================
  //   // PASSPORT
  //   // ===========================
  //   // TYPE: multi-select
  //   {
  //     id: "passport_number",
  //     label: "Passport status",
  //     groupName: "passport",
  //     type: "text",
  //     defaultValue: filters?.passport_number || "",
  //   },
  //   // TYPE: range
  //   {
  //     id: "passport_expiry_date",
  //     label: "Passport Expiry",
  //     groupName: "passport",
  //     type: "range",
  //     defaultSelectedValues: filters?.passport_expiry_date || [],
  //   },

  //   // ===========================
  //   // SPONSORSHIP
  //   // ===========================

  //   // TYPE: text
  //   {
  //     id: "sponsorship_certificate_number",
  //     label: "Certificate number",
  //     groupName: "sponsorship",
  //     type: "number",
  //     defaultValue: filters?.sponsorship_certificate_number || "",
  //   },

  //   // TYPE: date-range
  //   {
  //     id: "sponsorship_date_assigned",
  //     label: "Date Assigned",
  //     groupName: "sponsorship",
  //     type: "date-range",
  //     defaultSelectedValues: filters?.sponsorship_date_assigned || [],
  //   },
  //   // TYPE: date-range
  //   {
  //     id: "sponsorship_expiry_date",
  //     label: "Date Of Expiry",
  //     groupName: "sponsorship",
  //     type: "date-range",
  //     defaultSelectedValues: filters?.sponsorship_expiry_date || [],
  //   },
  // ];

  // console.log(getEmployeesQuery.data);
  // useEffect(() => {
  //   if (getEmployeesQuery.data) setData(getEmployeesQuery.data);
  // }, [getEmployeesQuery.data]);
  // const [admin, setAdmin] = useState([]);
  // const [employees, setEmployees] = useState([]);

  // useEffect(() => {
  //     if (getEmployeesQuery.data) {
  //         //   getEmployeesQuery.data.filter(employee => {
  //         // const role = employee.roles[0].name.split("_")[1].split("#")[0]
  //         // console.log(role);
  //         // })
  //         // set manager
  //         setManager(getEmployeesQuery.data?.map(employee => {
  //             if (employee.roles[0].name.split("_")[1].split("#")[0] === "manager") {
  //                 return (employee);
  //             }
  //         }).filter(Boolean));

  //         //set admin
  //         setAdmin(getEmployeesQuery.data?.map(employee => {
  //             if (employee.roles[0].name.split("_")[1].split("#")[0] === "admin") {
  //                 return (employee);
  //             }
  //         }).filter(Boolean));

  //         // set employess
  //         setEmployees(getEmployeesQuery.data?.map(employee => {
  //             if (employee.roles[0].name.split("_")[1].split("#")[0] === "employee") {
  //                 return (employee);
  //             }
  //         }).filter(Boolean));
  //     }

  // }, [])

  // console.log(manager);
  // console.log(admin);
  // console.log(employees);

  // TOGGLE API
  // const [isToggleLoading, setIsToggleLoading] = useState({
  //   id: null,
  //   status: false,
  // });
  // const toggleFunc = (id) => {
  //   Swal.fire({
  //     title: "Are you want to change the status?",
  //     text: "",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes",
  //     customClass: {
  //       title: "text-primary",
  //       container: "",
  //       popup: "bg-base-300 shadow-xl rounded-xl border border-primary",
  //       icon: "text-red-500",
  //       cancelButton: "bg-green-500",
  //     },
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       setIsToggleLoading({
  //         id: id,
  //         status: true,
  //       });
  //       toggleEmployeeActiveDeactive(id)
  //         .then((res) => {
  //           setIsUpdated(Math.random());
  //           Swal.fire({
  //             title: "Done!",
  //             text: "Status changed successfully.",
  //             icon: "success",
  //           });
  //           setIsToggleLoading({
  //             id: null,
  //             status: true,
  //           });
  //         })
  //         .catch((error) => {
  //           setIsToggleLoading({
  //             id: null,
  //             status: true,
  //           });
  //           handleApiError(error, "#00121");
  //         });
  //     }
  //   });
  // };

  // REFETCH AFTER FILTER AND DATA CHANGE
  // useEffect(() => {
  //     getAllData();
  // }, [filters, isUpdated]);

  // HANDLER FUNCTIONS FUNCTIONS
  // HANDLE CREATE
  // const handleCreate = () => {
  //   navigate("/employee/create");
  // };

  // HANDLE TOGGLE ACTIVATION
  // const handleToggleActivation = (id) => {
  //   toggleFunc(id);
  // };

  // HANDLE VIEW
  // const handleView = (id) => {
  //   console.log({ id });
  //   navigate(`/employee/view/${encryptID(id)}?tab=personal_details`);
  // };

  // HANDLE EDIT
  // const handleEdit = (id) => {
  //   navigate(`/employee/update/${encryptID(id)}`);
  // };

  // HANDLE DELETE
  const handleDelete = (id) => {
    deleteFunc(id);
  };

  // HANDLE CREATE LEAVE
  // const handleAssignLeave = (id) => {
  //   setPopupOption({
  //     open: true,
  //     type: "assignLeave",
  //     title: "Create Leave",
  //     onClose: () => {
  //       setPopupOption({ ...popupOption, open: false });
  //     },
  //     id: id,
  //     closeOnDocumentClick: false,
  //   });
  // };

  // HANDLE ADD ATTENDANCE
  // const handleAddAttendance = (id) => {
  //   setPopupOption({
  //     userDetails: id,
  //     open: true,
  //     type: "addAttandance",
  //     title: "Add Attendance",
  //     onClose: () => {
  //       setPopupOption({ ...popupOption, open: false });
  //     },
  //     id: null,
  //     closeOnDocumentClick: false,
  //   });
  // };

  // HANDLE CHANGE JOINING DATE
  // const handleChangeJoiningDate = (id) => {
  //   setPopupOption({
  //     open: true,
  //     type: "changeJoiningDate",
  //     title: "Change Joining Date",
  //     onClose: () => {
  //       setPopupOption({ ...popupOption, open: false });
  //     },
  //     id: id,
  //     closeOnDocumentClick: false,
  //   });
  // };

  // HANDLE CHANGE PASSWORD
  // const handleChangePassword = (id) => {
  //   setPopupOption({
  //     open: true,
  //     type: "changePassword",
  //     title: "Change Password",
  //     onClose: () => {
  //       setPopupOption({ ...popupOption, open: false });
  //     },
  //     id: id,
  //     closeOnDocumentClick: false,
  //   });
  // };

  // ALL ACTION BUTTONS
  const [actions, setActions] = useState([
    {
      name: "view",
      // handler: handleView,
      Icon: AiFillEye,
      colorClass: "text-green-500",
      backgroundColorClass: "bg-green-900",
      permissions: [EMPLOYEE_VIEW],
      disabledOn: [],
    },
    // {
    //   name: "edit",
    //   handler: handleEdit,
    //   Icon: RiEdit2Fill,
    //   colorClass: "text-secondary",
    //   backgroundColorClass: "bg-secondary-content",
    //   permissions: [EMPLOYEE_UPDATE],
    //   disabledOn: [],
    // },
    {
      name: "delete",
      handler: handleDelete,
      Icon: MdDelete,
      colorClass: "text-red-600",
      backgroundColorClass: "bg-red-200",
      isLoading: isPendingDelete,
      permissions: [EMPLOYEE_DELETE],
      disabledOn: [],
    },
  ]);

  // ALL DISPLAYED COLUMNS IN TABLE
  const [cols, setCols] = useState([
    {
      name: "Garage",
      attribute_name: "garage",
      minWidth: 10,
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

  // HANDLE PER PAGE
  // const setPerPage = (count) => {
  //   setFilters({ ...filters, perPage: count, page: 1 });
  // };
  // =========================================

  // EXPORT REPORT HANDLER
  // const handleExport = (type) => {
  //   const dataURL = exportAllEmployeesURLUtil({
  //     // MAIN ATTRIBUTES FOR EXPORT
  //     response_type: type,
  //     file_name: filters?.file_name,
  //     // =============================

  //     perPage: filters?.perPage,
  //     page: filters?.page,
  //     start_date: filters?.start_date,
  //     end_date: filters?.end_date,

  //     is_on_holiday: filters?.is_on_holiday,
  //     upcoming_expiries: filters?.upcoming_expiries,
  //     pension_scheme_status: filters?.pension_scheme_status,
  //     sponsorship_status: filters?.sponsorship_status,

  //     search_key: filters?.search_key,
  //     order_by: filters?.order_by,
  //     is_in_employee: filters?.is_in_employee,
  //     role: filters?.role,
  //     is_active: filters?.is_active,
  //     designation_id: filters?.designation_id,
  //     work_location_id: filters?.work_location_id,
  //     has_this_project: filters?.has_this_project,
  //     employment_status_id: filters?.employment_status_id,
  //     immigration_status: filters?.immigration_status,
  //     sponsorship_certificate_number: filters?.sponsorship_certificate_number,
  //     sponsorship_current_certificate_status:
  //       filters?.sponsorship_current_certificate_status,
  //     start_joining_date: filters?.start_joining_date,
  //     start_sponsorship_date_assigned: filters?.start_sponsorship_date_assigned,
  //     end_sponsorship_date_assigned: filters?.end_sponsorship_date_assigned,
  //     start_sponsorship_expiry_date: filters?.start_sponsorship_expiry_date,
  //     end_sponsorship_expiry_date: filters?.end_sponsorship_expiry_date,
  //     start_passport_expiry_date: filters?.start_passport_expiry_date,
  //     end_passport_expiry_date: filters?.end_passport_expiry_date,
  //     end_visa_issue_date: filters?.end_visa_issue_date,
  //     start_visa_expiry_date: filters?.start_visa_expiry_date,
  //     end_visa_expiry_date: filters?.end_visa_expiry_date,
  //     visa_expires_in_day: filters?.visa_expires_in_day,
  //     project_id: filters?.project_id,
  //     department_id: filters?.department_id,
  //     doesnt_have_payrun: filters?.doesnt_have_payrun,
  //   });

  //   fetch(dataURL["url"], {
  //     method: "GET",
  //     headers: {
  //       Authorization: dataURL["jwt"],
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       return response.blob(); // Use response.blob() to handle binary data (e.g., PDF)
  //     })
  //     .then((blobData) => {
  //       // Create a Blob URL and trigger download
  //       const blobUrl = URL.createObjectURL(blobData);

  //       if (type === "pdf") {
  //         const link = document.createElement("a");
  //         link.href = blobUrl;
  //         link.download = `${filters?.file_name}.pdf`;
  //         document.body.appendChild(link);
  //         link.click();
  //         document.body.removeChild(link);
  //       }
  //       if (type === "csv") {
  //         const link = document.createElement("a");
  //         link.href = blobUrl;
  //         link.download = `${filters?.file_name}.csv`;
  //         document.body.appendChild(link);
  //         link.click();
  //         document.body.removeChild(link);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       setIsPending(false);
  //       console.log({ error });
  //       handleApiError(error, "#00121");
  //     });
  // };

  const [activeTab, setActiveTab] = useState("all");
  const [tabs, setTabs] = useState([
    { id: "all", title: "All" },
    { id: "completed", title: "Completed" },
    { id: "pending", title: "Pending" },
  ]);

  useEffect(() => {
    setFilters({ ...filters, status: activeTab === "all" ? "" : activeTab });
  }, [activeTab]);

  console.log({ activeTab });

  const { isPending, error, data, refetch, fetchNextPage } = useQuery({
    queryKey: ["users", filters],
    queryFn: ({ pageParam = 0 }) => getClientBooking(filters),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.nextPage ? lastPage.nextPage : undefined;
    },
  });

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
  /***********************************************************************
   *                    UI RENDERING
   ***********************************************************************/
  console.log({ data });

  return (
    <CheckPermission permissionArray={[EMPLOYEE_VIEW]}>
      <div className="h-[85vh]" data-auto={"container_admin"}>
        <div className="relative h-full" data-auto="sub_container_admin">
          {/* POPUP  */}
          <CustomPopup
            popupClasses={`w-[70vw]`}
            popupOption={popupOption}
            setPopupOption={setPopupOption}
            // Component={
            //   <>
            //     {popupOption?.type === "assignLeave" && (
            //       <CreateLeave
            //         selfId={popupOption?.id}
            //         handleClosePopup={() => {
            //           setPopupOption({
            //             open: false,
            //             type: "",
            //             id: null,
            //             onClose: () => {
            //               setPopupOption({ ...popupOption, open: false });
            //               setIsUpdated(Math.random());
            //             },
            //             overlayStyle: { background: "red" },
            //             closeOnDocumentClick: false,
            //           });
            //         }}
            //       />
            //     )}
            //     {popupOption?.type === "addAttandance" && (
            //       <CreateAttendanceV2
            //         popupOption={popupOption}
            //         handleClosePopup={() => {
            //           setPopupOption({
            //             open: false,
            //             type: "",
            //             id: null,
            //             selfId: null,
            //             onClose: () => {
            //               setPopupOption({ ...popupOption, open: false });
            //             },
            //             overlayStyle: { background: "red" },
            //             closeOnDocumentClick: false,
            //           });
            //         }}
            //         getAllAttendence={() => {}}
            //       />
            //     )}

            //     {popupOption?.type === "changeJoiningDate" && (
            //       <ChangeJoiningDate
            //         popupOption={popupOption}
            //         handleClosePopup={() => {
            //           setPopupOption({
            //             open: false,
            //             type: "",
            //             id: null,
            //             selfId: null,
            //             onClose: () => {
            //               setPopupOption({ ...popupOption, open: false });
            //             },
            //             overlayStyle: { background: "red" },
            //             closeOnDocumentClick: false,
            //           });
            //         }}
            //         getAllAttendence={() => {}}
            //       />
            //     )}
            //     {popupOption?.type === "changePassword" && (
            //       <ChangePassword
            //         popupOption={popupOption}
            //         handleClosePopup={() => {
            //           setPopupOption({
            //             open: false,
            //             type: "",
            //             id: null,
            //             selfId: null,
            //             onClose: () => {
            //               setPopupOption({ ...popupOption, open: false });
            //             },
            //             overlayStyle: { background: "red" },
            //             closeOnDocumentClick: false,
            //           });
            //         }}
            //       />
            //     )}
            //   </>
            // }
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
                        ? "All Bookings"
                        : activeTab === "completed"
                        ? "Completed Bookings"
                        : "Pending Bookings"}
                    </Headings>
                  </div>
                  <h3>
                    Total {data?.total}{" "}
                    {data?.total > 1 ? "Bookings" : "Booking"} Found
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
                  <CustomDataSet
                    cols={cols}
                    setCols={setCols}
                    dataAuto="admin"
                  />
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
                    garage: d?.garage?.name,
                    car_reg: d?.car_registration_no,
                  }))}
                  actions={actions}
                  cols={cols}
                  dataAuto="all-job-type"
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
    </CheckPermission>
  );
}
