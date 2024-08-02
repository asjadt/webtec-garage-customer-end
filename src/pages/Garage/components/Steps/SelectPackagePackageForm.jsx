import { useEffect, useState } from "react";
import ButtonSpinner from "../../../../components/Loaders/ButtonSpinner";
import { useData } from "../../../../context/DataContext";
import SplitDescription from "../../../../components/SplitDescription";

export default function SelectPackagePackageForm({
  setStep,
  formData,
  setFormData,
  garageData,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};

    // VALIDATE SERVICE
    if (
      !formData?.pre_booking_sub_service_ids ||
      formData?.pre_booking_sub_service_ids?.length === 0
    ) {
      newErrors.pre_booking_sub_service_ids = "Service is required";
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
          <>
            <button
              key={index}
              onClick={() => {
                setFormData({ ...formData, package_id: pkg?.id });
              }}
              className={`border group hover:bg-gradient-to-br from-orange-600 to-orange-400 flex flex-col items-center justify-center shadow-md rounded-md p-5`}
            >
              {/* PACKAGE NAME  */}
              <h2
                className={`font-medium text-primary group-hover:text-base-300`}
              >
                {pkg?.name}
              </h2>

              {/* PACKAGE PRICE  */}
              <h2 className={`font-bold text-2xl`}>
                {pkg?.price}{" "}
                <span
                  className={`text-primary text-xs group-hover:text-base-300`}
                >
                  {garageData?.garage?.currency}
                </span>
              </h2>

              {/* PACKAGE DESCRIPTION  */}
              <SplitDescription
                text={pkg?.description}
                length={40}
                title={"Description"}
              />

              {/* PACKAGE SERVICES  */}
            </button>
          </>
        ))}
      </div>
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
