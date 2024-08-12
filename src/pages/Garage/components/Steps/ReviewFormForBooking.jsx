import ButtonSpinner from "../../../../components/Loaders/ButtonSpinner";
import { useAuth } from "../../../../context/AuthContextV2";
import { useData } from "../../../../context/DataContext";
import moment from "moment";
export default function ReviewFormForBooking({
  formData,
  setStep,
  handleOnSubmit,
  isLoading,
  garageData,
  appliedCouponDetails,
}) {
  const { user, isAuthenticated, logout, setIsAuthenticated, setUser } =
    useAuth();
  const { subServices, makes, models } = useData();

  return (
    <div className={``}>
      <table className={`w-full`}>
        <tr className={`border-b`}>
          <td className={`h-full font-bold w-32`}>Services</td>
          <td className={`h-full py-5 `}>
            {formData?.booking_sub_service_ids
              .map(
                (service) => subServices?.find((ss) => ss?.id === service)?.name
              )
              .join(", ")}
          </td>
        </tr>

        <tr className={`border-b `}>
          <td className={`h-full font-bold`}>Car reg</td>
          <td className={`h-full py-5`}>{formData?.car_registration_no}</td>
        </tr>
        <tr className={`border-b`}>
          <td className={`h-full font-bold w-32`}>Make</td>
          <td className={`h-full py-5 `}>
            {
              makes?.find((make) => make?.id === formData?.automobile_make_id)
                ?.name
            }
          </td>
        </tr>
        <tr className={`border-b`}>
          <td className={`h-full font-bold w-32`}>Model</td>
          <td className={`h-full py-5 `}>
            {
              models?.find(
                (model) => model?.id === formData?.automobile_model_id
              )?.name
            }
          </td>
        </tr>
        <tr className={`border-b`}>
          <td className={`h-full font-bold w-32`}>Job Start Date</td>
          <td className={`h-full py-5 `}>
            {moment(
              `${formData?.job_start_date} ${formData?.job_start_time}`,
              "YYYY-MM-DD HH:mm"
            ).format("DD-MM-YYYY hh:mm A")}
          </td>
        </tr>
        <tr className={`border-b`}>
          <td className={`h-full font-bold w-36`}>Job Expire Date</td>
          <td className={`h-full py-5 `}>
            {moment(formData?.job_end_date, "YYYY-MM-DD").format("DD-MM-YYYY")}
          </td>
        </tr>
      </table>

      {!!formData?.additional_information && (
        <div className={`py-5`}>
          <span className={`font-bold `}>Notes</span>
          <p className={`pt-2`}>{formData?.additional_information}</p>
        </div>
      )}

      {(formData?.images?.length > 0 || formData?.videos?.length > 0) && (
        <div className={`py-5`}>
          <span className={`font-bold `}>Attachments</span>
          <div className={`pt-2 grid grid-cols-1 gap-2`}>
            {formData?.images?.map((item, i) => (
              <img
                key={i}
                src={`${
                  import.meta.env.VITE_REACT_APP_SERVER_URL
                }${item}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={"Pending Jobs"}
                className={`w-full h-[200px] object-contain hover:border-primary border border-base-300 duration-150 rounded-md overflow-hidden`}
                loading="lazy"
              />
            ))}
            {formData?.videos?.map((item, i) => (
              <video
                className={` hover:border-primary border border-base-300 duration-150 rounded-md overflow-hidden`}
                key={i}
                width={"100%"}
                controls
                autoPlay
                src={`${import.meta.env.VITE_REACT_APP_SERVER_URL}${item}`}
              ></video>
            ))}
          </div>
        </div>
      )}

      <div>
        {user ? (
          <span>
            You are logged in as{" "}
            <span className={`text-primary font-medium`}>
              {user?.first_Name} {user?.last_Name}
            </span>
            <span>
              {" "}
              ( Not You? -{" "}
              <span onClick={logout} className={`text-primary cursor-pointer`}>
                Sign out
              </span>{" "}
              )
            </span>
          </span>
        ) : (
          ""
        )}
      </div>
      <div className="flex w-full justify-between items-center gap-2 mt-5 flex-col md:flex-row ">
        <button
          disabled={isLoading}
          onClick={() => setStep(2)}
          className="btn w-full md:btn-wide btn-primary btn-outline"
        >
          Previous
        </button>
        <button
          disabled={isLoading}
          onClick={handleOnSubmit}
          className="btn w-full md:btn-wide btn-primary"
        >
          {isLoading ? <ButtonSpinner /> : "Book"}
        </button>
      </div>
    </div>
  );
}
