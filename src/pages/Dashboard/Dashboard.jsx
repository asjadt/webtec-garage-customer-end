// // ====================================
// // #00170
// // ====================================

// import React, { Fragment, useEffect, useState } from "react";
// import { DndProvider, useDrop } from "react-dnd";
// import { TouchBackend } from "react-dnd-touch-backend";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import toast from "react-hot-toast";
// import { BsFillPencilFill } from "react-icons/bs";
// import {
//   FaBalanceScaleRight,
//   FaRegPaperPlane,
//   FaUserTie,
// } from "react-icons/fa";
// import { FiFilter, FiSave } from "react-icons/fi";
// import { HiOutlineSpeakerphone } from "react-icons/hi";
// import { IoIosTime, IoIosTimer, IoMdTimer } from "react-icons/io";
// import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
// import {
//   MdAssignmentReturn,
//   MdAssignmentTurnedIn,
//   MdCancel,
//   MdDateRange,
//   MdOutlineAdminPanelSettings,
//   MdOutlineAssignmentLate,
//   MdOutlineCancelScheduleSend,
//   MdUpdate,
// } from "react-icons/md";
// import { LuUserCheck, LuUserX, LuUsers2 } from "react-icons/lu";
// import {
//   TbClockDown,
//   TbClockShield,
//   TbClockUp,
//   TbProgress,
//   TbProgressCheck,
//   TbProgressX,
// } from "react-icons/tb";
// import { getTotalUnreadAnnouncementsCountForClient } from "../../apis/announcement/announcement";
// import {
//   getAllDashboardData,
//   updateDashboardWidgetOrder,
// } from "../../apis/dashboard/dashboard";
// import CustomLoading from "../../components/CustomLoading";
// import CustomToaster from "../../components/CustomToaster";
// import Headings from "../../components/Headings/Headings";
// import { OutsideClickHandler } from "../../components/OutsideClickHandler";
// import DashboardWidget from "../../components/Widgets/DashboardWidget";
// import DashboardWidgetWithContent from "../../components/Widgets/DashboardWidgetWithContent";
// import { ANNOUNCEMENT_VIEW } from "../../constant/permissions";
// import { useAuth } from "../../context/AuthContextV2";
// import { checkPermissions } from "../../utils/checkPermissions";
// import UserAnnouncement from "../Administration/Announcements/UserAnnouncement";
// import { isMobile, isTablet } from "react-device-detect";
// import { handleApiError } from "../../utils/apiErrorHandler";

// const Dashboard = () => {
//   const [isDragAble, setIsDragAble] = useState(false);
//   const { user } = useAuth();

//   const permissions = JSON.parse(localStorage.getItem("permissions"));

//   const [dragAbleWidgets, setDragAbleWidgets] = useState([]);
//   const [dropItems, setDropItems] = useState([]);

//   const [icons, setIcons] = useState({
//     absent_today: <LuUserX className={`text-2xl`} />,
//     present_today: <LuUserCheck className={`text-2xl`} />,
//     employment_status_wise_employee: <LuUsers2 className={`text-2xl`} />,

//     employees: <FaUserTie className={`text-2xl`} />,
//     employee_on_holiday: <MdDateRange className={`text-2xl`} />,

//     pending_approval_leaves: <MdUpdate className={`text-2xl`} />,
//     in_progress_leaves: <TbProgress className={`text-2xl`} />,
//     approved_leaves: <TbProgressCheck className={`text-2xl`} />,
//     rejected_leaves: <TbProgressX className={`text-2xl`} />,

//     open_roles: <MdOutlineAdminPanelSettings className={`text-2xl`} />,
//     upcoming_passport_expiries: <IoIosTime className={`text-2xl`} />,
//     upcoming_visa_expiries: <IoIosTimer className={`text-2xl`} />,
//     upcoming_sponsorship_expiries: <IoMdTimer className={`text-2xl`} />,
//     unassigned_sponsorships: <MdOutlineAssignmentLate className={`text-2xl`} />,
//     assigned_sponsorships: <MdAssignmentTurnedIn className={`text-2xl`} />,
//     visa_applied_sponsorships: <FaRegPaperPlane className={`text-2xl`} />,
//     visa_rejected_sponsorships: (
//       <MdOutlineCancelScheduleSend className={`text-2xl`} />
//     ),
//     visa_grantes_sponsorships: (
//       <IoCheckmarkDoneCircleOutline className={`text-2xl`} />
//     ),
//     withdrawal_sponsorships: <MdAssignmentReturn className={`text-2xl`} />,
//     upcoming_pension_expiries: <TbClockShield className={`text-2xl`} />,
//     upcoming_right_to_work_expiries: (
//       <FaBalanceScaleRight className={`text-2xl`} />
//     ),
//     opt_in_pensions: <TbClockUp className={`text-2xl`} />,
//     opt_out_pensions: <TbClockDown className={`text-2xl`} />,
//   });
//   // FILTERS
//   const [filters, setFilters] = useState([
//     { id: 1, name: "Today", value: "today" },
//     { id: 2, name: "This Week", value: "this_week" },
//     { id: 3, name: "Last Week", value: "last_week" },
//     { id: 4, name: "Next Week", value: "next_week" },
//     { id: 5, name: "This Month", value: "this_month" },
//     { id: 6, name: "Last Month", value: "last_month" },
//     { id: 7, name: "Next Month", value: "next_month" },
//   ]);
//   const [selectedFilter, setSelectedFilter] = useState("today");

//   // CONVERT OBJ TO ARRAY HELPER FUNCTION
//   function convertObjectToArray(inputObject) {
//     const resultArray = [];

//     for (const key in inputObject) {
//       if (Object.hasOwnProperty.call(inputObject, key)) {
//         const categoryData = inputObject[key];
//         resultArray.push(categoryData);
//       }
//     }

//     return resultArray;
//   }

//   // GET ALL DASHBOARD DATA
//   const [isLoading, setIsLoading] = useState(true);
//   const getAllData = () => {
//     setIsLoading(true);
//     getAllDashboardData()
//       .then((res) => {
//         setDragAbleWidgets(
//           convertObjectToArray(res).filter(
//             (widget) => widget?.widget_order === 0
//           )
//         );
//         setDropItems(
//           convertObjectToArray(res).filter(
//             (widget) => widget?.widget_order !== 0
//           )
//         );

//         setIsLoading(false);
//       })
//       .catch((error) => {
//         setIsLoading(false);
//         console.log({ error });
//         handleApiError(error, "#00121");
//       });
//   };
//   // GETTING ALL WIDGETS
//   useEffect(() => {
//     if (user?.business_id) {
//       getAllData();
//     } else {
//       setIsLoading(false);
//     }
//   }, []);

//   // UPDATE ORDER IN DROP
//   const handleUpdateOrder = (data) => {
//     updateDashboardWidgetOrder(data)
//       .then((res) => {})
//       .catch((error) => {
//         console.log({ error });

//         handleApiError(error, "#00121");
//       });
//   };

//   // HANDLE DROP
//   const handleWidgetDrop = (item, widget_order, left, top) => {
//     setDragAbleWidgets(
//       dragAbleWidgets.filter((item1) => item1?.id !== item?.id)
//     );

//     if (
//       dropItems.filter((widget) => widget?.widget_order === widget_order)
//         ?.length > 0
//     ) {
//       console.log({
//         s: { item, widget_order },
//         d: dropItems.find((widget) => widget?.widget_order === widget_order),
//       });
//       // IF DROP-ABLE ALREADY HAVE VALUE THEN SWAP
//       handleUpdateOrder({
//         widgets: [
//           {
//             id: item?.id,
//             widget_name: item?.widget_name,
//             widget_order: widget_order,
//           },
//           {
//             id: dropItems.find(
//               (widget) => widget?.widget_order === widget_order
//             )?.id,
//             widget_name: dropItems.find(
//               (widget) => widget?.widget_order === widget_order
//             )?.widget_name,
//             widget_order: item?.widget_order,
//           },
//         ],
//       });
//       let tempDropItems = dropItems.map((widget) => {
//         if (widget?.widget_order === widget_order) {
//           return { ...widget, widget_order: item?.widget_order };
//         } else {
//           return { ...widget };
//         }
//       });
//       setDropItems(
//         tempDropItems.map((widget) => {
//           if (widget?.id === item?.id) {
//             return { ...widget, widget_order: widget_order, top, left };
//           } else {
//             return widget;
//           }
//         })
//       );
//     } else {
//       // IF DROP-ABLE HAVE NO VALUE THEN ADD THE ITEM
//       if (dropItems.filter((widget) => widget?.id === item?.id)?.length > 0) {
//         // IF SAME ITEM ON OTHER DROP-AREA THE REPLACE IT
//         item.widget_order = widget_order;
//         handleUpdateOrder({
//           widgets: [
//             {
//               id: item?.id,
//               widget_name: item?.widget_name,
//               widget_order: widget_order,
//             },
//           ],
//         });
//         setDropItems([
//           ...dropItems.filter((widget) => widget?.id !== item?.id),
//           { ...item, widget_order, left, top },
//         ]);
//       } else {
//         // IF IT IS A NEW ITEM AND NOT ALREADY PLACED ON ANY DROP_AREA
//         handleUpdateOrder({
//           widgets: [
//             {
//               id: item?.id,
//               widget_name: item?.widget_name,
//               widget_order: widget_order,
//             },
//           ],
//         });
//         setDropItems([...dropItems, { ...item, widget_order, left, top }]);
//       }
//     }
//   };

//   // HANDLE REMOVE WIDGET
//   const handleRemoveWidget = (widget_name) => {
//     let dropItem = dropItems?.find((wid) => wid?.widget_name === widget_name);
//     const orderChangeableWidgets = dropItems?.filter(
//       (di) => di?.widget_order > dropItem?.widget_order
//     );

//     // IF HAVE ORDER CHANGEABLE WIDGETS
//     if (orderChangeableWidgets && orderChangeableWidgets.length > 0) {
//       const decrementedWidgets = orderChangeableWidgets.map((widget) => ({
//         ...widget,
//         widget_order: widget.widget_order - 1,
//       }));

//       handleUpdateOrder({
//         widgets: [
//           {
//             id: dropItem?.id,
//             widget_name: dropItem?.widget_name,
//             widget_order: 0,
//           },
//           ...decrementedWidgets.map((w) => ({
//             id: w?.id,
//             widget_name: w?.widget_name,
//             widget_order: w?.widget_order,
//           })),
//         ],
//       });
//       setDragAbleWidgets([
//         ...dragAbleWidgets,
//         { ...dropItem, widget_order: 0 },
//       ]);
//       setDropItems(
//         dropItems
//           .filter((wid) => wid?.widget_name !== widget_name)
//           .map((wid) => {
//             const updatedWidget = decrementedWidgets.find(
//               (updatedWid) => updatedWid.widget_name === wid.widget_name
//             );

//             if (updatedWidget) {
//               return {
//                 ...wid,
//                 widget_order: updatedWidget.widget_order,
//               };
//             } else {
//               return wid;
//             }
//           })
//       );
//     } else {
//       handleUpdateOrder({
//         widgets: [
//           {
//             id: dropItem?.id,
//             widget_name: dropItem?.widget_name,
//             widget_order: 0,
//           },
//         ],
//       });
//       setDragAbleWidgets([
//         ...dragAbleWidgets,
//         { ...dropItem, widget_order: 0 },
//       ]);
//       setDropItems(dropItems.filter((wid) => wid?.widget_name !== widget_name));
//     }
//   };

//   useEffect(() => {
//     console.log({ dropItems });
//   }, [dropItems]);

//   // HANDLE FILTER
//   const [isFilterOn, setIsFilterOn] = useState(false);
//   const toggleFilterOpt = () => {
//     setIsFilterOn(!isFilterOn);
//   };
//   // CHANGE FILTER
//   const handleChangeFilter = (filter) => {
//     setSelectedFilter(filter);
//     setIsFilterOn(false);
//   };

//   let count = 1;
//   // DROP-ZONE COMPONENT
//   const ColumnDropZone = ({ widget_order, isDragAble }) => {
//     const [{ isOver }, drop] = useDrop({
//       accept: "WIDGET",
//       drop: (item, monitor) => {
//         const delta = monitor.getDifferenceFromInitialOffset();
//         const left = Math.round(item.x + delta.x);
//         const top = Math.round(item.y + delta.y);
//         count++;
//         handleWidgetDrop(item, widget_order, left, top);
//       },

//       collect: (monitor) => ({
//         isOver: !!monitor.isOver(),
//       }),
//     });

//     console.log({
//       dropItems: dropItems?.find(
//         (widget) => widget?.widget_order === widget_order
//       ),
//     });

//     return (
//       <div
//         ref={isDragAble ? drop : null}
//         className={`h-auto ${
//           dropItems?.find((widget) => widget?.widget_order === widget_order)
//             ?.widget_type === "graph" ||
//           dropItems?.find((widget) => widget?.widget_order === widget_order)
//             ?.widget_type === "multiple_upcoming_days"
//             ? "row-span-2"
//             : ""
//         } min-h-[100px] w-full bg-base-300 relative ${
//           isOver || isDragAble
//             ? "border-4 rounded-xl border-primary-content border-dashed"
//             : ""
//         }`}
//       >
//         {/* Additional styling for drop zone if needed */}
//         <>
//           {
//             <>
//               {dropItems?.filter(
//                 (widget) => widget?.widget_order === widget_order
//               )?.length > 0 ? (
//                 dropItems
//                   ?.filter((widget) => widget?.widget_order === widget_order)
//                   .map((widget, i) => (
//                     <div key={i} className={`relative h-full`}>
//                       {/* REMOVE FROM ACTIVE WIDGET  */}
//                       {isDragAble && (
//                         <button
//                           className="absolute cursor-pointer z-50 top-1 right-1"
//                           onClick={() =>
//                             handleRemoveWidget(widget?.widget_name)
//                           }
//                         >
//                           <MdCancel className={`text-xl text-red-500`} />
//                         </button>
//                       )}
//                       <DashboardWidgetWithContent
//                         icons={icons}
//                         filter={selectedFilter}
//                         item={widget}
//                         key={widget.id}
//                         id={widget.id}
//                         content={widget.content}
//                         widget_order={widget.widget_order}
//                         isDragAble={isDragAble}
//                       />
//                     </div>
//                   ))
//               ) : (
//                 <>
//                   {isOver ? (
//                     <div
//                       className={`w-full min-h-[90px] h-full flex justify-center items-center`}
//                     >
//                       <Headings className={`text-primary`} level={3}>
//                         Drop Here!
//                       </Headings>
//                     </div>
//                   ) : (
//                     ""
//                   )}
//                 </>
//               )}
//             </>
//           }
//         </>
//       </div>
//     );
//   };

//   // HANDLE TOGGLE WIDGET SIDE BAR
//   const [isWidgetBarOpened, setIsWidgetBarOpened] = useState(false);

//   // FILTERS
//   const [filterss, setFilterss] = useState({
//     perPage: 10,
//     page: 1,
//     start_date: "",
//     end_date: "",
//     search_key: "",
//     order_by: "DESC",
//   });
//   // GETTING ANNOUNCEMENT
//   // const [data, setData] = useState([]);
//   const [isPending, setIsPending] = useState(true);
//   const [totalUnreadAnnouncement, setTotalUnreadAnnouncement] = useState(0);

//   useEffect(() => {
//     if (checkPermissions([ANNOUNCEMENT_VIEW], permissions)) {
//       getTotalUnreadAnnouncementsCountForClient()
//         .then((res) => {
//           console.log({ res });
//           setTotalUnreadAnnouncement(res);
//           setIsPending(false);
//         })
//         .catch((error) => {
//           setIsPending(false);
//           console.log({ error });

//           handleApiError(error, "#00121");
//         });
//     }
//   }, []);

//   // DETECT THE DEVICE IS TOUCH SCREEN OR NOT
//   const isTouchScreen = isMobile || isTablet;

//   if (isLoading) {
//     return <CustomLoading />;
//   } else {
//     return (
//       <DndProvider backend={isTouchScreen ? TouchBackend : HTML5Backend}>
//         {/* HEADING  */}
//         <div className={`flex items-center justify-between mt-2 mb-5 `}>
//           {/* TITLE  */}
//           <div className={`flex items-center gap-3`}>
//             <Headings level={1}>Dashboard</Headings>

//             {/* EDIT BUTTON  */}
//             {!isDragAble ? (
//               <button
//                 data-tip="Edit"
//                 onClick={() => setIsDragAble(true)}
//                 className={`tooltip tooltip-bottom tooltip-primary text-primary`}
//               >
//                 <BsFillPencilFill className={`text-xl`} />
//               </button>
//             ) : (
//               <button
//                 data-tip="Save"
//                 onClick={() => setIsDragAble(false)}
//                 className={`tooltip tooltip-bottom tooltip-primary text-primary`}
//               >
//                 <FiSave className={`text-2xl`} />
//               </button>
//             )}
//           </div>

//           {/* FILTER  */}
//           {!isDragAble && (
//             <OutsideClickHandler
//               onOutsideClick={() => setIsFilterOn(false)}
//               className="relative w-1/3 md:w-20 lg:w-40"
//             >
//               <button
//                 className="btn btn-primary w-full relative"
//                 onClick={toggleFilterOpt}
//               >
//                 <FiFilter className={`text-lg`} />{" "}
//                 <span className="">Filter</span>
//               </button>

//               {isFilterOn ? (
//                 <div
//                   className={`absolute right-0 gap-2 z-30 w-full top-full mt-2 bg-base-300 rounded-md border border-primary shadow-md shadow-primary-content px-2  py-2 flex flex-col`}
//                 >
//                   {filters.map((filter, i) => (
//                     <button
//                       key={i}
//                       onClick={() => handleChangeFilter(filter?.value)}
//                       className={` btn-primary inline btn-outline rounded-md py-2 btn btn-sm  ${
//                         selectedFilter === filter?.value
//                           ? "btn-active"
//                           : " hover:btn-primary"
//                       } `}
//                     >
//                       {filter?.name}
//                     </button>
//                   ))}
//                 </div>
//               ) : (
//                 ""
//               )}
//             </OutsideClickHandler>
//           )}
//         </div>

//         {/* ANNOUNCEMENT  */}
//         {checkPermissions([ANNOUNCEMENT_VIEW], permissions) && !isDragAble && (
//           <div className="collapse collapse-arrow bg-base-300 ">
//             <input type="checkbox" name="my-accordion-2" />
//             <div className="an collapse-title text-xl font-medium bg-primary">
//               <div
//                 className={`sticky top-0 left-0 w-full flex gap-4 items-center text-base-300`}
//               >
//                 <HiOutlineSpeakerphone className={`text-2xl`} />
//                 <Headings level={2}>
//                   Announcements{" "}
//                   <div
//                     data-tip="Unread Announcements"
//                     className={`tooltip tooltip-bottom tooltip-primary text-base-300 bg-primary px-2 rounded-lg ml-5 inline-block`}
//                   >
//                     {totalUnreadAnnouncement}
//                   </div>
//                 </Headings>
//               </div>
//             </div>
//             <div className="collapse-content ">
//               <UserAnnouncement />
//             </div>
//           </div>
//         )}

//         {/* MAIN SECTION  */}
//         <div className={`flex lg:flex-row flex-col w-full pt-5`}>
//           {dropItems?.length !== 0 || isDragAble ? (
//             <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//               {/* DASHBOARD  */}
//               {new Array(
//                 isDragAble
//                   ? dragAbleWidgets?.length === 0
//                     ? dropItems?.length
//                     : dropItems?.length + 1
//                   : dropItems?.length
//               )
//                 .fill(0)
//                 .map((i, widget_order) => (
//                   <Fragment key={widget_order}>
//                     <ColumnDropZone
//                       isDragAble={isDragAble}
//                       widget_order={widget_order + 1}
//                     />
//                   </Fragment>
//                 ))}
//             </div>
//           ) : (
//             <div
//               className={`w-full  flex justify-center items-center h-[70vh] gap-3 flex-col`}
//             >
//               <h1 className={`text-2xl text-primary font-bold`}>
//                 No Widget Added Yet!
//               </h1>
//               <span className={``}>Please edit the page</span>
//             </div>
//           )}
//         </div>

//         {/* AVAILABLE WIDGETS  */}
//         {isDragAble && (
//           <div className={` border-t border-primary-content pt-2 mt-10`}>
//             <h1 className={`text-xl font-bold text-primary text-center my-5`}>
//               Available Widgets
//             </h1>
//             <div
//               className={`p-5 border-2 rounded-xl border-primary-content bg-base-300`}
//             >
//               {dragAbleWidgets?.length > 0 ? (
//                 <div
//                   className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5`}
//                 >
//                   {dragAbleWidgets.map((widget) => (
//                     <DashboardWidget
//                       icons={icons}
//                       isDragAble={isDragAble}
//                       item={widget}
//                       key={widget.id}
//                       id={widget.id}
//                       content={widget.content}
//                       widget_order={widget.widget_order}
//                     />
//                   ))}
//                 </div>
//               ) : (
//                 <div className={`flex w-full items-center justify-center`}>
//                   No Widget Found!
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </DndProvider>
//     );
//   }
// };

// export default Dashboard;

export default function Dashboard() {
  return <div className={``}>Dashboard</div>;
}
