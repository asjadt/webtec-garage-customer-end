import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getNotification,
  updateNotificationStatus,
} from "../../../Apis/notification";
import CustomToaster from "../../../components/CustomToaster";
import toast from "react-hot-toast";
import CustomLoading from "../../../components/CustomLoading";
import moment from "moment/moment";
import { decryptID, encryptID } from "../../../utils/encryptAndDecryptID";
import Pagination from "../../../components/Pagination";

export default function Notifications() {
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();
  const { string_id, pageNumber } = useParams();
  const id = decryptID(string_id || "");
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState("");
  console.log({ total });
  console.log({ notifications });
  const [isLoading, setIsLoading] = useState(true);
  const [lastPage, setLastPage] = useState(1);
  const [isFirstTime, setIsFirstTime] = useState(true);

  const [filters, setFilters] = useState({
    perPage: 10,
    page: 1,
  });

  console.log({ filters });

  const fetchClientNotifications = (perPage, page) => {
    if (isFirstTime) {
      setIsLoading(true);
      getNotification(perPage, page)
        .then((res) => {
          console.log({ res });
          setLastPage(res?.last_page);
          setIsLoading(false);
          setNotifications(res?.data);
          setTotal(res?.total);
          setIsFirstTime(false);
        })
        .catch((error) => {
          toast.custom((t) => (
            <CustomToaster
              t={t}
              type={"error"}
              text={`ID: #00203 - ${error?.response?.data?.message}`}
              errors={error?.response?.data?.errors}
            />
          ));
          setIsLoading(false);
        });
    } else {
      setIsLoading(true);
      getNotification(perPage, page)
        .then((res) => {
          setLastPage(res?.last_page);
          setNotifications(res?.data);
          setIsFirstTime(false);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          toast.custom((t) => (
            <CustomToaster
              t={t}
              type={"error"}
              text={`ID: #00203 - ${error?.response?.data?.message}`}
              errors={error?.response?.data?.errors}
            />
          ));
          setIsFirstTime(false);
        });
    }
  };

  useEffect(() => {
    console.log("Filters changed:", filters);
    // GET ALL NOTIFICATIONS
    fetchClientNotifications(filters?.perPage, filters?.page);
  }, [filters]);

  //   REDIRECT THE NOTIFICATION
  const handleRedirectNotification = (data) => {
    updateNotificationStatus({ notification_ids: [data?.id] }).then((res) => {
      console.log("Filters changed sss:", filters);
      fetchClientNotifications(filters?.perPage, filters?.page);
      if (data?.booking_id !== null) {
        navigate(`/my-account/my-bookings?id=${encryptID(data?.booking_id)}`);
      } else if (data?.pre_booking_id !== null) {
        navigate(
          `/my-account/pending/jobs?id=${encryptID(data?.pre_booking_id)}`
        );
      } else if (data?.job_id !== null) {
        navigate(`/my-account/my-jobs?id=${encryptID(data?.job_id)}`);
      }
    });
  };

  return (
    <div className={`py-10`}>
      {isLoading ? (
        <CustomLoading />
      ) : (
        <Fragment>
          <h1 className={`text-2xl font-medium mb-5`}>Notifications</h1>
          {notifications?.length === 0 ? (
            <div
              className={`w-full h-[400px] flex justify-center items-center`}
            >
              <h2 className={`text-xl font-medium`}>No Notifications Found!</h2>
            </div>
          ) : (
            <div className={` `}>
              {notifications?.map((notification, index) => (
                <div
                  className={`py-2 border-b relative cursor-pointer hover:bg-primary-content px-5 rounded-xl`}
                  key={index}
                  onClick={() => handleRedirectNotification(notification)}
                >
                  <div>
                    {/* TITLE  */}
                    <h3 className={`text-sm font-semibold text-primary`}>
                      {`${notification?.template_string} ${notification?.garage?.owner?.first_Name} ${notification?.garage?.owner?.last_Name}`}
                    </h3>

                    {/* TIME  */}
                    <span className={`text-xs text-gray-400`}>
                      {moment(notification?.created_at).endOf("min").fromNow()}{" "}
                      (
                      {moment(notification?.created_at).format(
                        "Do MMM YYYY, hh:mm A"
                      )}
                      )
                    </span>
                  </div>

                  {/* UNREAD  INDICATOR */}
                  {notification?.status === "unread" && (
                    <span class="absolute right-5 top-1/2 -translate-y-1/2 flex h-3 w-3">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                    </span>
                  )}
                </div>
              ))}
              {notifications !== 0 && (
                <div
                  // style={{ minWidth: minWidth }}
                  className=" my-2 flex-col flex justify-center bg-base-300 items-center"
                >
                  <Pagination
                    forcePage={filters?.page}
                    itemsPerPage={filters?.perPage}
                    totalItems={total}
                    onChangePage={(page) => {
                      setFilters((prevFilters) => ({
                        ...prevFilters,
                        page: page,
                      }));
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
}
