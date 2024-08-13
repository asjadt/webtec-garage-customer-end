import ButtonSpinner from "../../../../components/Loaders/ButtonSpinner";
import { useAuth } from "../../../../context/AuthContextV2";
import { useData } from "../../../../context/DataContext";
import moment from "moment";
export default function ReviewForm({
  formData,
  setStep,
  handleOnSubmit,
  isLoading,
}) {
  const { user, isAuthenticated, logout, setIsAuthenticated, setUser } =
    useAuth();
  const { subServices, makes, models } = useData();

  return (
    <div data-auto={`container-reviewForm`} className={``}>
      <table data-auto={`table-reviewForm`} className={`w-full`}>
        <tr className={`border-b`}>
          <td
            data-auto={`services-label-reviewForm`}
            className={`h-full font-bold w-32`}
          >
            Services
          </td>
          <td data-auto={`services-reviewForm`} className={`h-full py-5 `}>
            {formData?.pre_booking_sub_service_ids
              .map(
                (service) => subServices?.find((ss) => ss?.id === service)?.name
              )
              .join(", ")}
          </td>
        </tr>
        <tr className={`border-b `}>
          <td
            data-auto={`carReg-label-reviewForm`}
            className={`h-full font-bold`}
          >
            Car reg
          </td>
          <td data-auto={`carReg-reviewForm`} className={`h-full py-5`}>
            {formData?.car_registration_no}
          </td>
        </tr>
        <tr className={`border-b`}>
          <td
            data-auto={`makeId-label-reviewForm`}
            className={`h-full font-bold w-32`}
          >
            Make
          </td>
          <td data-auto={`makeId-reviewForm`} className={`h-full py-5 `}>
            {
              makes?.find((make) => make?.id === formData?.automobile_make_id)
                ?.name
            }
          </td>
        </tr>
        <tr className={`border-b`}>
          <td
            data-auto={`modelId-label-reviewForm`}
            className={`h-full font-bold w-32`}
          >
            Model
          </td>
          <td data-auto={`modelId-reviewForm`} className={`h-full py-5 `}>
            {
              models?.find(
                (model) => model?.id === formData?.automobile_model_id
              )?.name
            }
          </td>
        </tr>
        <tr className={`border-b`}>
          <td
            data-auto={`startDateTime-label-reviewForm`}
            className={`h-full font-bold w-32`}
          >
            Job Start Date
          </td>
          <td data-auto={`startDateTime-reviewForm`} className={`h-full py-5 `}>
            {moment(
              `${formData?.job_start_date} ${formData?.job_start_time}`,
              "YYYY-MM-DD HH:mm"
            ).format("DD-MM-YYYY hh:mm A")}
          </td>
        </tr>
        <tr className={`border-b`}>
          <td
            data-auto={`endDateTime-label-reviewForm`}
            className={`h-full font-bold w-36`}
          >
            Job Expire Date
          </td>
          <td data-auto={`endDateTime-reviewForm`} className={`h-full py-5 `}>
            {moment(formData?.job_end_date, "YYYY-MM-DD").format("DD-MM-YYYY")}
          </td>
        </tr>
      </table>

      <div className={`py-5`}>
        <span data-auto={`notes-label-reviewForm`} className={`font-bold `}>
          Notes
        </span>
        <p data-auto={`additionalInfo-reviewForm`} className={`pt-2`}>
          {formData?.additional_information}
        </p>
      </div>

      {(formData?.images?.length > 0 || formData?.videos?.length > 0) && (
        <div data-auto={`attachment-container-reviewForm`} className={`py-5`}>
          <span className={`font-bold `}>Attachments</span>
          <div className={`pt-2 grid grid-cols-1 gap-2`}>
            {formData?.images?.map((item, i) => (
              <img
                data-auto={`img${i + 1}-reviewForm`}
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
                data-auto={`video${i + 1}-reviewForm`}
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
          <span data-auto={`login-container-reviewForm`}>
            You are logged in as{" "}
            <span
              data-auto={`userName-reviewForm`}
              className={`text-primary font-medium`}
            >
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
      <div
        data-auto={`button-container-reviewForm`}
        className="flex w-full justify-between items-center gap-2 mt-5 flex-col md:flex-row "
      >
        <button
          data-auto={`previous-reviewForm`}
          disabled={isLoading}
          onClick={() => setStep(2)}
          className="btn w-full md:btn-wide btn-primary btn-outline"
        >
          Previous
        </button>
        <button
          data-auto={`createJob-reviewForm`}
          disabled={isLoading}
          onClick={handleOnSubmit}
          className="btn w-full md:btn-wide btn-primary"
        >
          {isLoading ? <ButtonSpinner /> : "Create Job"}
        </button>
      </div>
    </div>
  );
}
