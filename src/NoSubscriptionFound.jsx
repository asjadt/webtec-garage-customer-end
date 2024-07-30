import { useState } from "react";
import { encryptID } from "./utils/encryptAndDecryptID";
import { useAuth } from "./context/AuthContextV2";

export default function NoSubscriptionFound({ popupOption, handleClosePopup }) {
  const [businessId, setBusinessId] = useState(
    JSON.parse(localStorage.getItem("userData"))?.business_id
  );
  const { setLogout } = useAuth();
  return (
    <div className={`w-full flex h-[90vh] justify-center items-center`}>
      <div
        className={`bg-transparent   flex justify-center items-center flex-col w-[300px] md:w-[400px]`}
      >
        <img className={`w-1/2`} src="/assets/nosubscription.webp" alt="" />

        <h1 className={`text-3xl font-bold mb-3`}>No Subscription Found!</h1>

        <p className={`text-center`}>
          We regret to inform you that your subscription of our application is
          currently inactive or has expired. As a result, you are restricted
          from accessing certain features.
        </p>

        <br />

        <p className={`text-center font-bold`}>
          To get access, please get subscription now!
        </p>

        <button
          onClick={() => {
            window.location.href = `${
              import.meta.env.VITE_BASE_URL_FOR_CLIENT
            }/subscriptions/redirect-to-stripe?id=${encryptID(businessId)}`;
          }}
          className={`btn btn-circle btn-primary  btn-wide mt-5`}
        >
          Subscribe Now
        </button>

        <button
          onClick={setLogout}
          className={`btn btn-outline btn-circle btn-primary  btn-wide mt-5`}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
