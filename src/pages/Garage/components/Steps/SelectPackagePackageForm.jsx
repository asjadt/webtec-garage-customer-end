import { Fragment, useEffect, useState } from "react";
import ButtonSpinner from "../../../../components/Loaders/ButtonSpinner";
import { useData } from "../../../../context/DataContext";
import SplitDescription from "../../../../components/SplitDescription";

export default function SelectPackagePackageForm({
  setStep,
  formData,
  setFormData,
  garageData,
}) {
  const { subServices } = useData();
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};

    // VALIDATE SERVICE
    if (
      !formData?.booking_garage_package_ids ||
      formData?.booking_garage_package_ids?.length === 0
    ) {
      newErrors.booking_garage_package_ids = "Select a package first";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // HANDLE SUBMIT
  const handleSubmit = () => {
    if (validateForm()) {
      setStep(2);
    }
  };

  return (
    <div className={``}>
      {/* FORM  */}
      <div
        className={`grid grid-cols-1 h-[calc(100vh-500px)] overflow-y-auto overflow-x-hidden scrollbar gap-3`}
      >
        {/* PACKAGE  */}
        {garageData?.garage?.garage_packages?.map((pkg, index) => (
          <Fragment key={index}>
            <button
              onClick={() => {
                setFormData({
                  ...formData,
                  booking_garage_package_ids: [pkg?.id],
                });
              }}
              className={`${
                formData?.booking_garage_package_ids[0] === pkg?.id
                  ? "bg-primary-content"
                  : ""
              } border group flex flex-col items-center justify-center shadow-md rounded-md p-5 hover:text-primary`}
            >
              {/* PACKAGE NAME  */}
              <h2
                className={`font-medium ${
                  formData?.booking_garage_package_ids[0] === pkg?.id
                    ? "text-primary"
                    : ""
                }`}
              >
                {pkg?.name}
              </h2>

              {/* PACKAGE PRICE  */}
              <h2
                className={`font-bold text-2xl ${
                  formData?.booking_garage_package_ids[0] === pkg?.id
                    ? "text-primary"
                    : ""
                }`}
              >
                {pkg?.price}{" "}
                <span className={`text-xs`}>
                  {garageData?.garage?.currency}
                </span>
              </h2>

              {/* PACKAGE SERVICES  */}
              <span
                className={`block mb-5 text-center ${
                  formData?.booking_garage_package_ids[0] === pkg?.id
                    ? "text-primary"
                    : ""
                }`}
              >
                {subServices
                  .filter((sub_service) =>
                    pkg?.sub_services?.some(
                      (sub_s, i) => sub_service?.id === sub_s?.id
                    )
                  )
                  ?.map((sub_service, i) => sub_service?.name)
                  ?.join(" • ")}
              </span>

              {/* PACKAGE DESCRIPTION  */}
              <div
                className={`${
                  formData?.booking_garage_package_ids[0] === pkg?.id
                    ? "text-primary"
                    : ""
                }`}
              >
                <SplitDescription
                  text={pkg?.description}
                  length={40}
                  title={"Description"}
                />
              </div>

              {/* PACKAGE SERVICES  */}
            </button>
          </Fragment>
        ))}
      </div>

      {errors?.booking_garage_package_ids ? (
        <label
          data-cy={"error_message_custom_date_picker"}
          className="label h-7 mt-2"
        >
          <span
            data-cy={"error_content_custom_date_picker"}
            className="label-text-alt text-error"
          >
            {errors?.booking_garage_package_ids}
          </span>
        </label>
      ) : (
        ""
      )}

      {/* NEXT BUTTON  */}
      <div className="flex w-full justify-center items-center gap-2 mt-5 flex-col md:flex-row">
        <button
          disabled={isLoading}
          onClick={handleSubmit}
          className="btn w-full md:btn-wide btn-primary"
        >
          {isLoading ? <ButtonSpinner /> : "Next"}
        </button>
      </div>
    </div>
  );
}
