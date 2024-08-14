import { useEffect, useState } from "react";
import ButtonSpinner from "../../../../components/Loaders/ButtonSpinner";
import moment from "moment";
import CustomTextareaField from "../../../../components/InputFields/CustomTextareaField";
import CustomDatePickerWithTime from "../../../../components/InputFields/CustomDatePickerWithTime";
import CustomFileUploader from "../../../../components/InputFields/CustomFileUploader";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FileUpload } from "./UploadFiles";
import CustomMultiSelect from "../../../../components/InputFields/CustomMultiSelect";
import { useData } from "../../../../context/DataContext";
import CustomFieldV2 from "../../../../components/InputFields/CustomFieldV2";
import CustomTimePickerV2 from "../../../../components/InputFields/CustomTimePickerV2";
import CustomDatePickerV2 from "../../../../components/InputFields/CustomDatePickerV2";
import { getCouponValidation } from "../../../../Apis/homepageapi";
import ButtonLoading from "../../../../components/ButtonLoading";
import { BiSolidCoupon } from "react-icons/bi";
import { handleApiError } from "../../../../utils/apiErrorHandler";

export default function JobDetailsForm({
  formData,
  setStep,
  setFormData,
  garageData,

  isLoadingCoupon,
  coupons,
  appliedCouponDetails,
  setAppliedCouponDetails,
}) {
  const { loading, makes, models } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [isMakeChangeLoading, setIsMakeChangeLoading] = useState(false);
  const [modelsForMultiSelect, setModelsForMultiSelect] = useState([]);

  // COUPON
  const [isManualDiscountToken, setIsManualDiscountToken] = useState(false);

  // VALIDATE COUPON
  const [isCouponValidating, setIsCouponValidating] = useState(false);
  const [couponValidationMessage, setCouponValidationMessage] = useState("");

  const handleValidateCoupon = (e) => {
    if (e) {
      setIsCouponValidating(true);
      getCouponValidation({
        coupon: e, // coupon code
        id: garageData?.garage?.id,
        price: formData?.price,
      })
        .then((res) => {
          console.log({ res });

          if (res?.success) {
            setAppliedCouponDetails({
              coupon_code: e,
              coupon_type: res?.discount_type,
              coupon_amount: res?.discount_amount,
            });
          } else {
            setCouponValidationMessage("Invalid coupon code");
          }

          setIsCouponValidating(false);
        })
        .catch((error) => {
          handleApiError(error);
          setIsCouponValidating(false);
        });
    }
  };
  // CREATING A LOADING STATE FOR MULTISELECT
  useEffect(() => {
    setIsMakeChangeLoading(true);
    setModelsForMultiSelect(
      models.filter(
        (model) => model?.automobile_make_id === formData?.automobile_make_id
      )
    );
    setTimeout(() => {
      setIsMakeChangeLoading(false);
    }, 100);
  }, [formData?.automobile_make_id]);

  // HANDLE CHANGE FORM DATA
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // VALIDATION
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};

    // Example date and time string
    const dateTimeString = `${formData?.job_start_date} ${formData?.job_start_time}`;
    // Format of the date and time string
    const format = "YYYY-MM-DD HH:mm";
    // Check if the date and time string is valid
    if (formData?.job_start_date && formData?.job_start_time) {
      if (!moment(dateTimeString, format, true).isValid()) {
        // Set an error message for the 'timing' field
        newErrors.job_start_date = "Please select date and time properly";
      }
    } else {
      if (!formData?.job_start_date) {
        newErrors.job_start_date = "Job start date is required";
      }
      if (!formData?.job_start_time) {
        newErrors.job_start_time = "Job start time is required";
      }
    }

    // VALIDATE CAR REG
    if (!formData?.car_registration_no) {
      newErrors.car_registration_no = "Car reg is required";
    }

    // VALIDATE MAKE
    if (!formData?.automobile_make_id) {
      newErrors.automobile_make_id = "Make is required";
    }

    // VALIDATE MODEL
    if (!formData?.automobile_model_id) {
      newErrors.automobile_model_id = "Model is required";
    }
    console.log({ newErrors });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // HANDLE SUBMIT
  const handleSubmit = () => {
    if (validateForm()) {
      setStep(3);
    }
  };

  return (
    <div className={``}>
      {/* SCHEDULE  */}
      <div className="join join-vertical w-full">
        <div className="collapse collapse-arrow join-item  border border-primary">
          <input type="checkbox" name="my-accordion-4" />
          <div className="collapse-title columns-lg font-semibold">
            Garage Schedule
          </div>
          <div className="collapse-content">
            <div className={`text-sm`}>
              <div
                className={`bg-primary text-base-300 w-full py-3 px-5 flex font-semibold`}
              >
                <span className={`w-[40%] block`}>Day</span>
                <span className={`w-[40%] block`}>Start at</span>
                <span className={`w-[20%] block`}>Until</span>
              </div>

              {garageData?.garage?.garage_times?.map((item, index) => (
                <div
                  key={index}
                  className={`bg-base-100 w-full py-3 px-5 flex border-b border-primary-content`}
                >
                  {!item?.is_closed ? (
                    <>
                      <span className={`w-[40%] block`}>
                        {item?.day === 0
                          ? "Sunday"
                          : item?.day === 1
                          ? "Moneday"
                          : item?.day === 2
                          ? "Tuesday"
                          : item?.day === 3
                          ? "Wuesday"
                          : item?.day === 4
                          ? "Thursday"
                          : item?.day === 5
                          ? "Friday"
                          : item?.day === 6
                          ? "Saturday"
                          : ""}
                      </span>
                      <span className={`w-[40%] block`}>
                        {moment(item?.opening_time, "HH:mm").format("hh:mmA")}
                      </span>
                      <span className={`w-[20%] block`}>
                        {moment(item?.closing_time, "HH:mm").format("hh:mmA")}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className={`w-[60%] block`}>
                        {item?.day === 0
                          ? "Sunday"
                          : item?.day === 1
                          ? "Moneday"
                          : item?.day === 2
                          ? "Tuesday"
                          : item?.day === 3
                          ? "Wuesday"
                          : item?.day === 4
                          ? "Thursday"
                          : item?.day === 5
                          ? "Friday"
                          : item?.day === 6
                          ? "Saturday"
                          : ""}
                      </span>
                      <span className={`w-[40%] block`}>Close</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FORM  */}
      <div>
        {/* JOB START DATE & TIME  */}
        <CustomDatePickerV2
          required
          // DATE
          from={moment(new Date()).format("DD-MM-YYYY")}
          right
          value={
            formData?.job_start_date
              ? moment(formData?.job_start_date, "YYYY-MM-DD").format(
                  "DD-MM-YYYY"
                )
              : ""
          }
          onChange={(date) => {
            setFormData({
              ...formData,
              job_start_date: date
                ? moment(date, "DD-MM-YYYY").format("YYYY-MM-DD")
                : "",
              job_end_date: date
                ? moment(date, "DD-MM-YYYY")
                    .add(1, "month")
                    .format("YYYY-MM-DD")
                : "",
            });
          }}
          format="dd-LL-yyyy"
          disable={false}
          fieldClassName={"w-full"}
          id={"job_start_date"}
          name={"job_start_date"}
          placeholder={"Job start data"}
          label={"Job start data"}
          type={"text"}
          wrapperClassName={"w-full"}
          dataAuto={`search-job_start_date`}
          error={
            formData?.job_start_date
              ? garageData?.garage?.garage_times?.find(
                  (item) =>
                    item?.day ===
                    moment(formData?.job_start_date, "YYYY-MM-DD").day()
                )?.is_closed
                ? "Garage is closed on this day"
                : ""
              : errors?.job_start_date
          }
        />

        {/* TIME  */}
        <CustomTimePickerV2
          disable={
            formData?.job_start_date
              ? garageData?.garage?.garage_times?.find(
                  (item) =>
                    item?.day ===
                    moment(formData?.job_start_date, "YYYY-MM-DD").day()
                )?.is_closed
                ? true
                : false
              : false
          }
          minTime={
            formData?.job_start_date
              ? garageData?.garage?.garage_times?.find(
                  (item) =>
                    item?.day ===
                    moment(formData?.job_start_date, "YYYY-MM-DD").day()
                )?.opening_time
              : ""
          }
          maxTime={
            formData?.job_start_date
              ? garageData?.garage?.garage_times?.find(
                  (item) =>
                    item?.day ===
                    moment(formData?.job_start_date, "YYYY-MM-DD").day()
                )?.closing_time
              : ""
          }
          label={"Job start time"}
          required
          value={
            formData?.job_start_time
              ? moment(formData?.job_start_time, "HH:mm").format("hh:mm:ss")
              : ""
          }
          onChange={(time) => {
            setFormData({
              ...formData,
              job_start_time: time
                ? moment(time, "hh:mm A").format("HH:mm")
                : "",
            });
          }}
          error={
            formData?.job_start_date
              ? garageData?.garage?.garage_times?.find(
                  (item) =>
                    item?.day ===
                    moment(formData?.job_start_date, "YYYY-MM-DD").day()
                )?.is_closed
                ? "You can't select time on off day"
                : ""
              : errors?.job_start_time
          }
        />

        {/* CAR REG  */}
        <CustomFieldV2
          defaultValue={formData?.car_registration_no}
          disable={false}
          error={errors?.car_registration_no}
          fieldClassName={"w-full"}
          id={"car_registration_no"}
          label={"Car Reg"}
          name={"car_registration_no"}
          onChange={handleFormChange}
          placeholder={"Car Reg"}
          type={"text"}
          wrapperClassName={"w-full"}
          required={true}
          maxLength={50}
          //   pattern={/^[A-Za-z\s]+$/}
          //   patternErrorMsg="Only Capital and lowercase letters are allowed"
          dataAuto={`name-create-department`}
        />

        {/* MAKES  */}
        <CustomMultiSelect
          required
          label={"Select Make"}
          error={errors?.automobile_make_id}
          loading={loading}
          placeholder="Select Makes"
          options={makes?.filter((make) =>
            garageData?.garage?.automobile_makes?.some(
              (garageMake) => garageMake?.id === make?.id
            )
          )}
          singleSelect
          defaultSelectedValues={makes
            ?.filter((make) =>
              garageData?.garage?.automobile_makes?.some(
                (garageMake) => garageMake?.id === make?.id
              )
            )
            ?.filter((make) => formData?.automobile_make_id === make?.id)}
          onSelect={(e) => {
            setFormData({
              ...formData,
              automobile_make_id: e[0]?.id,
              makeName: e[0]?.name,
            });
          }}
          dataAuto={`work_location-create-employee`}
        />

        {/* MODEL  */}
        <CustomMultiSelect
          required
          error={errors?.automobile_model_id}
          label={"Select Model"}
          loading={loading || isMakeChangeLoading}
          placeholder="Select Models"
          options={modelsForMultiSelect?.filter((model) =>
            garageData?.garage?.automobile_models?.some(
              (garageModel) => garageModel?.id === model?.id
            )
          )}
          singleSelect
          defaultSelectedValues={modelsForMultiSelect
            ?.filter((model) =>
              garageData?.garage?.automobile_models?.some(
                (garageModel) => garageModel?.id === model?.id
              )
            )
            ?.filter((make) => formData?.automobile_model_id === make?.id)}
          onSelect={(e) => {
            setFormData({
              ...formData,
              automobile_model_id: e[0]?.id,
              modelName: e[0]?.name,
            });
          }}
          dataAuto={`work_location-create-employee`}
        />

        {/* TRANSMISSION  */}
        <CustomMultiSelect
          label={"Select Transmission"}
          loading={false}
          placeholder="Transmission"
          options={[
            { id: 1, name: "Manual", value: "manual" },
            { id: 2, name: "Automatic", value: "automatic" },
          ]}
          singleSelect
          defaultSelectedValues={[
            { id: 1, name: "Manual", value: "manual" },
            { id: 2, name: "Automatic", value: "automatic" },
          ]?.filter(
            (transmission) => formData?.transmission === transmission?.value
          )}
          onSelect={(e) => {
            setFormData({
              ...formData,
              transmission: e[0]?.id,
            });
          }}
          dataAuto={`work_location-create-employee`}
        />

        {/* COUPON */}
        <button
          className="btn w-full btn-sm btn-outline btn-primary mt-5"
          onClick={() => {
            setIsManualDiscountToken(!isManualDiscountToken);
            setAppliedCouponDetails({});
            setFormData({
              ...formData,
              coupon_code: "",
            });
            setCouponValidationMessage("");
          }}
        >
          <BiSolidCoupon size={20} />{" "}
          {isManualDiscountToken
            ? "Add auto apply coupon"
            : "Add coupon manually"}
        </button>

        {/* COUPON FIELD  */}
        {isManualDiscountToken ? (
          // MANUAL COUPON
          <CustomFieldV2
            defaultValue={formData?.coupon_code}
            disable={false}
            fieldClassName={"w-full"}
            id={"coupon_code"}
            label={"Coupon"}
            name={"coupon_code"}
            onChange={handleFormChange}
            onBlur={(e) => handleValidateCoupon(e.target.value)}
            placeholder={"Type Coupon"}
            type={"text"}
            wrapperClassName={"w-full"}
            maxLength={50}
            dataAuto={`name-create-department`}
          />
        ) : (
          // AUTO APPLY COUPON
          <CustomMultiSelect
            label={"Select Coupon"}
            loading={isLoadingCoupon}
            placeholder="Select Coupon"
            options={coupons?.map((coupon) => ({
              id: coupon?.id,
              name: coupon?.code,
              value: coupon?.code,
            }))}
            singleSelect
            defaultSelectedValues={coupons
              ?.map((coupon) => ({
                id: coupon?.id,
                name: coupon?.code,
                value: coupon?.code,
              }))
              ?.filter((coupon) => coupon?.name === formData?.coupon_code)}
            onSelect={(e) => {
              setFormData({
                ...formData,
                coupon_code: e[0]?.name,
              });
              handleValidateCoupon(e[0]?.name);
            }}
            dataAuto={`work_location-create-employee`}
          />
        )}

        {isCouponValidating ? (
          <span
            className={`flex items-center gap-x-1 mt-1 text-xs text-primary font-medium`}
          >
            {<ButtonLoading className={`text-xs`} />} Applying the coupon
          </span>
        ) : (
          <>
            {Object?.keys(appliedCouponDetails)?.length > 0 ? (
              <span className={`text-xs font-medium text-green-500`}>
                You got {appliedCouponDetails?.coupon_amount}{" "}
                {appliedCouponDetails?.coupon_type === "fixed"
                  ? `${garageData?.garage?.currency}`
                  : "%"}{" "}
                discount
              </span>
            ) : (
              <span className={`text-xs font-medium text-red-500`}>
                {couponValidationMessage}
              </span>
            )}
          </>
        )}

        {/* EXTRA NOTES  */}
        <CustomTextareaField
          defaultValue={formData?.additional_information}
          disable={false}
          error={errors?.additional_information}
          fieldClassName={"w-full"}
          id={"additional_information"}
          label={"Extra notes"}
          name={"additional_information"}
          onChange={handleFormChange}
          placeholder={"Extra notes"}
          type={"text"}
          wrapperClassName={"w-full"}
          maxLength={500}
          dataAuto={`additional-information-create-job`}
        />

        <FileUpload
          label={"Upload Files"}
          inputData={formData}
          setInputData={setFormData}
        />
      </div>
      <div className="flex w-full justify-between items-center gap-2 mt-5 flex-col md:flex-row ">
        <button
          disabled={isLoading || isCouponValidating}
          onClick={() => setStep(1)}
          className="btn w-full md:btn-wide btn-primary btn-outline"
        >
          Previous
        </button>
        <button
          disabled={isLoading || isCouponValidating}
          onClick={handleSubmit}
          className="btn w-full md:btn-wide btn-primary"
        >
          {isLoading ? <ButtonSpinner /> : "Next"}
        </button>
      </div>
    </div>
  );
}
