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
  console.log({ garageData });
  const { loading, subServices, services, makes, models, homeSearchData } =
    useData();
  console.log({ homeSearchData, subServices });
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
      !formData?.booking_sub_service_ids ||
      formData?.booking_sub_service_ids?.length === 0
    ) {
      newErrors.booking_sub_service_ids = "Service is required";
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
      <div>
        {/* SERVICE  */}
        <CustomMultiSelectWithChild
          label={"Select Service"}
          error={errors?.booking_sub_service_ids}
          loading={loading}
          groupForeignKey={"service_id"}
          options={subServices?.filter((ss) =>
            garageData?.garage?.sub_services?.some((gs) => gs?.id === ss?.id)
          )}
          groups={services?.filter((s) =>
            garageData?.garage?.services?.some((gss) => gss?.id === s?.id)
          )}
          required={true}
          placeholder="Select Services"
          defaultSelectedValues={
            homeSearchData?.sub_services?.length > 0
              ? subServices?.filter((ss) =>
                  homeSearchData?.sub_services?.some((gs) => gs === ss?.id)
                )
              : subServices
                  ?.filter((ss) =>
                    garageData?.garage?.services?.some(
                      (gs) => gs?.id === ss?.id
                    )
                  )
                  ?.filter((sub_service) =>
                    formData?.booking_sub_service_ids?.some(
                      (selected_sub_service_id) =>
                        sub_service?.id === selected_sub_service_id
                    )
                  )
          }
          onSelect={(e) => {
            setFormData({
              ...formData,
              booking_sub_service_ids: e.map((ss) => ss?.id),
            });
          }}
          dataAuto={`sub_service-create-job`}
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
          defaultSelectedValues={
            homeSearchData?.makes?.length > 0
              ? makes?.filter((make) =>
                  homeSearchData?.makes?.some(
                    (garageMake) => garageMake === make?.id
                  )
                )
              : makes
                  ?.filter((make) =>
                    garageData?.garage?.automobile_makes?.some(
                      (garageMake) => garageMake?.id === make?.id
                    )
                  )
                  ?.filter((make) => formData?.automobile_make_id === make?.id)
          }
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
          defaultSelectedValues={
            homeSearchData?.models?.length > 0
              ? models?.filter((model) =>
                  homeSearchData?.models?.some(
                    (garageModel) => garageModel === model?.id
                  )
                )
              : modelsForMultiSelect
                  ?.filter((model) =>
                    garageData?.garage?.automobile_models?.some(
                      (garageModel) => garageModel?.id === model?.id
                    )
                  )
                  ?.filter((make) => formData?.automobile_model_id === make?.id)
          }
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
