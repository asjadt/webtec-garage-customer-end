import ButtonSpinner from "../../../../components/Loaders/ButtonSpinner";
import { useAuth } from "../../../../context/AuthContextV2";
import { useData } from "../../../../context/DataContext";
import moment from "moment";
export default function ReviewForm({
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
    <div data-auto={`container-review`} className={``}>
      <table data-auto={`table-review`} className={`w-full`}>
        {!!formData?.booking_garage_package_ids?.length > 0 && (
          <tr data-auto={`tr-package`} className={`border-b`}>
            <td data-auto={`td-package`} className={`h-full font-bold w-32`}>
              Package
            </td>
            <td data-auto={`td-package-ids`} className={`h-full py-5 `}>
              {formData?.booking_garage_package_ids
                ?.map(
                  (pkg_id) =>
                    garageData?.garage?.garage_packages?.find(
                      (pkg) => pkg?.id === pkg_id
                    )?.name
                )
                .join(", ")}
            </td>
          </tr>
        )}
        {!!formData?.price > 0 && (
          <tr data-auto={`tr-price`} className={`border-b `}>
            <td data-auto={`td-price`} className={`h-full font-bold`}>
              Package Price
            </td>
            <td data-auto={`td-price-currency`} className={`h-full py-5`}>
              {formData?.price} {garageData?.garage?.currency}
            </td>
          </tr>
        )}
        {!!formData?.coupon_code && (
          <tr data-auto={`tr-coupon`} className={`border-b `}>
            <td className={`h-full font-bold`}>Coupon</td>
            <td className={`h-full py-5`}>{formData?.coupon_code}</td>
          </tr>
        )}
        {!!appliedCouponDetails?.coupon_amount && (
          <tr data-auto={`tr-discount`} className={`border-b `}>
            <td className={`h-full font-bold`}>Discount</td>
            <td className={`h-full py-5`}>
              {appliedCouponDetails?.coupon_amount}{" "}
              {appliedCouponDetails?.coupon_type === "fixed"
                ? `${garageData?.garage?.currency}`
                : "%"}{" "}
            </td>
          </tr>
        )}
        {!!formData?.price && (
          <tr data-auto={`tr-total`} className={`border-b `}>
            <td className={`h-full font-bold`}>Total</td>
            <td className={`h-full py-5`}>
              {appliedCouponDetails?.coupon_type === "fixed"
                ? formData?.price - appliedCouponDetails?.coupon_amount
                : appliedCouponDetails?.coupon_type === "percentage"
                ? formData?.price -
                  (formData?.price * appliedCouponDetails?.coupon_amount) / 100
                : formData?.price}{" "}
              {garageData?.garage?.currency}
            </td>
          </tr>
        )}
        <tr data-auto={`tr-car`} className={`border-b `}>
          <td className={`h-full font-bold`}>Car reg</td>
          <td className={`h-full py-5`}>{formData?.car_registration_no}</td>
        </tr>
        <tr data-auto={`tr-make`} className={`border-b`}>
          <td className={`h-full font-bold w-32`}>Make</td>
          <td className={`h-full py-5 `}>
            {
              makes?.find((make) => make?.id === formData?.automobile_make_id)
                ?.name
            }
          </td>
        </tr>
        <tr data-auto={`tr-model`} className={`border-b`}>
          <td className={`h-full font-bold w-32`}>Model</td>
          <td className={`h-full py-5 `}>
            {
              models?.find(
                (model) => model?.id === formData?.automobile_model_id
              )?.name
            }
          </td>
        </tr>
        <tr data-auto={`tr-start-date`} className={`border-b`}>
          <td className={`h-full font-bold w-32`}>Job Start Date</td>
          <td className={`h-full py-5 `}>
            {moment(
              `${formData?.job_start_date} ${formData?.job_start_time}`,
              "YYYY-MM-DD HH:mm"
            ).format("DD-MM-YYYY hh:mm A")}
          </td>
        </tr>
        <tr data-auto={`tr-expired-date`} className={`border-b`}>
          <td className={`h-full font-bold w-36`}>Job Expire Date</td>
          <td className={`h-full py-5 `}>
            {moment(formData?.job_end_date, "YYYY-MM-DD").format("DD-MM-YYYY")}
          </td>
        </tr>
      </table>

      {!!formData?.additional_information && (
        <div data-auto={`container-notes`} className={`py-5`}>
          <span className={`font-bold `}>Notes</span>
          <p className={`pt-2`}>{formData?.additional_information}</p>
        </div>
      )}

      {(formData?.images?.length > 0 || formData?.videos?.length > 0) && (
        <div data-auto={`container-attachments`} className={`py-5`}>
          <span className={`font-bold `}>Attachments</span>
          <div className={`pt-2 grid grid-cols-1 gap-2`}>
            {formData?.images?.map((item, i) => (
              <img
                data-auto={`image-${i}`}
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
                data-auto={`video-${i}`}
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
            <span data-auto={`username`} className={`text-primary font-medium`}>
              {user?.first_Name} {user?.last_Name}
            </span>
            <span>
              {" "}
              ( Not You? -{" "}
              <span
                data-auto={`signout`}
                onClick={logout}
                className={`text-primary cursor-pointer`}
              >
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
        data-auto={`container-buttons`}
        className="flex w-full justify-between items-center gap-2 mt-5 flex-col md:flex-row "
      >
        <button
          data-auto={`btn-back`}
          disabled={isLoading}
          onClick={() => setStep(2)}
          className="btn w-full md:btn-wide btn-primary btn-outline"
        >
          Previous
        </button>
        <button
          data-auto={`btn-submit`}
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
