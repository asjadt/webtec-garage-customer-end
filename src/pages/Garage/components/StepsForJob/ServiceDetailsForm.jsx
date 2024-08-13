import { useEffect, useState } from "react";
import ButtonSpinner from "../../../../components/Loaders/ButtonSpinner";
import CustomMultiSelectWithChild from "../../../../components/InputFields/CustomMultiSelectWithChild";
import { useData } from "../../../../context/DataContext";
import CustomFieldV2 from "../../../../components/InputFields/CustomFieldV2";
import CustomMultiSelect from "../../../../components/InputFields/CustomMultiSelect";

export default function ServiceDetailsForm({
  setStep,
  formData,
  setFormData,
  garageData,
}) {
  const { loading, subServices, services, makes, models } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [isMakeChangeLoading, setIsMakeChangeLoading] = useState(false);
  const [modelsForMultiSelect, setModelsForMultiSelect] = useState([]);
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
    <div data-auto={`container-serviceDetailsForm`} className={``}>
      {/* FORM  */}
      <div data-auto={`service-container-serviceDetailsForm`}>
        {/* SERVICE  */}
        <CustomMultiSelectWithChild
          label={"Select Service"}
          error={errors?.pre_booking_sub_service_ids}
          loading={loading}
          groupForeignKey={"service_id"}
          options={subServices}
          groups={services}
          required={true}
          placeholder="Select Services"
          defaultSelectedValues={subServices?.filter((sub_service) =>
            formData?.pre_booking_sub_service_ids?.some(
              (selected_sub_service_id) =>
                sub_service?.id === selected_sub_service_id
            )
          )}
          onSelect={(e) => {
            setFormData({
              ...formData,
              pre_booking_sub_service_ids: e.map((ss) => ss?.id),
            });
          }}
          dataAuto={`service-serviceDetailsForm`}
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
          dataAuto={`carReg-serviceDetailsForm`}
        />

        {/* MAKES  */}
        <CustomMultiSelect
          required
          label={"Select Make"}
          error={errors?.automobile_make_id}
          loading={loading}
          placeholder="Select Makes"
          options={makes}
          singleSelect
          defaultSelectedValues={makes?.filter(
            (make) => formData?.automobile_make_id === make?.id
          )}
          onSelect={(e) => {
            setFormData({
              ...formData,
              automobile_make_id: e[0]?.id,
              makeName: e[0]?.name,
            });
          }}
          dataAuto={`makes-serviceDetailsForm`}
        />

        {/* MODEL  */}
        <CustomMultiSelect
          required
          error={errors?.automobile_model_id}
          label={"Select Model"}
          loading={loading || isMakeChangeLoading}
          placeholder="Select Models"
          options={modelsForMultiSelect}
          singleSelect
          defaultSelectedValues={modelsForMultiSelect?.filter(
            (make) => formData?.automobile_model_id === make?.id
          )}
          onSelect={(e) => {
            setFormData({
              ...formData,
              automobile_model_id: e[0]?.id,
              modelName: e[0]?.name,
            });
          }}
          dataAuto={`model-serviceDetailsForm`}
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
          dataAuto={`transmission-serviceDetailsForm`}
        />
      </div>
      <div
        data-auto={`button-container-serviceDetailsForm`}
        className="flex w-full justify-center items-center gap-2 mt-5 flex-col md:flex-row"
      >
        <button
          data-auto={`next-serviceDetailsForm`}
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
