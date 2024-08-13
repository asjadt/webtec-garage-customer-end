import { useEffect, useState } from "react";
import { checkEmail } from "../../../../../../Apis/auth";
import CustomAutoComplete from "../../../../../../components/CustomAutoComplete";
import CustomField from "../../../../../../components/InputFields/CustomField";
import CustomFieldV2 from "../../../../../../components/InputFields/CustomFieldV2";
import CustomNumberField from "../../../../../../components/InputFields/CustomNumberField";
import CustomPasswordField from "../../../../../../components/InputFields/CustomPasswordField";
import { useMutation } from "@tanstack/react-query";
import ButtonLoading from "../../../../../../components/ButtonLoading";
import { useAuth } from "../../../../../../context/AuthContextV2";
import CustomAutoCompleteV2 from "../../../../../../components/CustomAutoCompleteV2";
import CustomNumberFieldWithCurrency from "../../../../../../components/InputFields/CustomNumberFieldWithCurrency";
import CustomMultiSelect from "../../../../../../components/InputFields/CustomMultiSelect";
import { currencyOptions } from "../../../../../../constant/currency";
import axios from "axios";

export default function Step2({
  formData,
  setFormData,
  handleNext,
  handlePrevious,
  errors,
  setErrors,
}) {
  const { handleOpenLoginPopup } = useAuth();
  // CHANGE FORM DATA
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      garage: {
        ...prev.garage,
        [name]: value,
      },
    }));
  };

  // VALIDATION
  const [email, setEmail] = useState("");
  // EMAIL VALIDATION MUTATION
  const checkEmailMutation = useMutation({
    mutationKey: "checkEmail",
    mutationFn: checkEmail,
    onSuccess: (data) => {
      if (data.data === false) {
        setFormData((prev) => ({
          ...prev,
          garage: {
            ...prev.garage,
            email: email,
          },
        }));
        setErrors((prev) => ({ ...prev, email: "" }));
      } else {
        setErrors((prev) => ({
          ...prev,
          email: "Email Already Registered!",
        }));
        setFormData((prev) => ({
          ...prev,
          garage: {
            ...prev.garage,
            email: "",
          },
        }));
      }
    },
  });

  // VALIDATE EMAIL
  const checkEmailValidation = (e) => {
    const email_value = e.target.value;
    setEmail(email_value);
    try {
      checkEmailMutation.mutate(email_value);
    } catch (error) {
      handleApiError(checkEmailMutation.error);
    }
  };

  // VALIDATE FORM
  const validateForm = () => {
    setErrors({});
    const newErrors = {};
    // Validate first name
    if (!formData?.garage?.name || formData?.garage?.name.trim() === "") {
      newErrors.name = "Garage name is required";
    }

    // Validate email
    if (!formData?.garage.email || formData?.garage.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(
        formData?.garage.email.trim()
      )
    ) {
      newErrors.email = "Invalid email";
    }

    // Validate phone number
    if (!formData?.garage?.phone) {
      newErrors.phone = "Phone number is required";
    } else {
      if (!/^\d{11}$/.test(formData?.garage?.phone?.trim())) {
        newErrors.phone = "Phone number must have 11 digits";
      }
    }

    // Validate address
    if (
      !formData?.garage?.address_line_1 ||
      formData?.garage?.address_line_1?.trim() === ""
    ) {
      newErrors.address_line_1 = "Address is required";
    }

    // Validate postcode
    if (
      !formData?.garage?.postcode ||
      formData?.garage?.postcode?.trim() === ""
    ) {
      newErrors.postcode = "Postcode is required";
    }

    // Validate city
    if (!formData?.garage?.city || formData?.garage?.city?.trim() === "") {
      newErrors.city = "City is required";
    }
    // Validate country
    if (
      !formData?.garage?.country ||
      formData?.garage?.country?.trim() === ""
    ) {
      newErrors.country = "Country is required";
    }
    // Validate labour_rate
    if (!formData?.garage?.labour_rate) {
      setFormData((prev) => ({
        ...prev,
        garage: {
          ...prev.garage,
          labour_rate: 0,
        },
      }));
    }
    // Validate currency
    if (
      !formData?.garage?.currency ||
      formData?.garage?.currency?.trim() === ""
    ) {
      newErrors.currency = "Currency is required";
    }

    // Validate is_mobile_garage
    if (
      !formData?.garage?.wifi_available &&
      formData?.garage?.wifi_available !== 0
    ) {
      newErrors.wifi_available = "This field is required";
    }
    // Validate is_mobile_garage
    if (
      !formData?.garage?.is_mobile_garage &&
      formData?.garage?.is_mobile_garage !== 0
    ) {
      newErrors.is_mobile_garage = "This field is required";
    }
    // Validate is_mobile_garage
    if (!formData?.garage?.time_format) {
      newErrors.time_format = "Time format is required";
    }
    setErrors(newErrors);

    console.log({ newErrors });
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const [isCurrencyLoading, setIsCurrencyLoading] = useState(false);
  useEffect(() => {
    if (formData?.garage?.country) {
      const fetchCurrency = async (countryCode) => {
        try {
          setIsCurrencyLoading(true);

          const currencyResponse = await axios.get(
            `https://restcountries.com/v3.1/alpha/${countryCode}`
          );

          const currencyCode = Object.values(
            currencyResponse.data[0].currencies
          )[0].name;

          console.log({
            currencyCode: currencyCode,
            sym: currencyOptions.find(
              (currency) => currency.title === currencyCode
            )?.value,
          });

          setFormData({
            ...formData,
            garage: {
              ...formData.garage,
              currency:
                currencyOptions.find(
                  (currency) => currency.title === currencyCode
                )?.value || "USD",
            },
          });
          setIsCurrencyLoading(false);
        } catch (error) {
          console.log(error);
          setIsCurrencyLoading(false);
        }
      };

      fetchCurrency(formData?.garage?.country);
    }
  }, [formData?.garage?.country]);

  return (
    <>
      <div className={`grid grid-cols-1 md:grid-cols-2 grid-2 md:gap-x-5`}>
        {/* NAME */}
        <CustomFieldV2
          defaultValue={formData?.garage?.name}
          disable={false}
          error={errors?.name}
          fieldClassName={"w-full"}
          id={"name"}
          label={"Garage Name"}
          name={"name"}
          onChange={handleFormChange}
          placeholder={"Garage Name"}
          type={"text"}
          wrapperClassName={"w-full"}
          required={true}
          maxLength={25}
        />

        {/* EMAIL  */}
        <CustomField
          defaultValue={formData?.garage?.email}
          disable={false}
          error={errors?.email}
          fieldClassName={"w-full"}
          id={"email"}
          label={"Email"}
          name={"email"}
          onBlur={checkEmailValidation}
          onChange={handleFormChange}
          placeholder={"Email"}
          type={"email"}
          wrapperClassName={"w-full"}
          required={true}
        />

        {/* PHONE */}
        <CustomNumberField
          required={true}
          id={"phone"}
          label={"Phone"}
          min={0}
          name={"phone"}
          onChange={(e) => {
            setFormData({
              ...formData,
              garage: {
                ...formData.garage,
                phone: e.target.value,
              },
            });
          }}
          value={formData?.garage?.phone}
          placeholder={"Phone"}
          error={errors?.phone}
          wrapperClassName={`w-full`}
          fieldClassName={`w-full`}
          maxLength={11}
        />

        {/* ADDRESS LINE 1 */}
        <div className="w-full">
          {/* LABEL */}
          <label
            data-auto={`step1-label-create-employee1`}
            htmlFor="address_line_1"
            className="label"
          >
            <span className="label-text text-md font-bold">
              Address Line 1{" "}
              <span className="text-error font-bold text-md">*</span>
            </span>
          </label>

          {/* FIELD  */}
          <CustomAutoCompleteV2
            className={`input input-bordered rounded-md w-full`}
            placeholder="Address Line 1"
            type="text"
            name="address_line_1"
            onChange={(e) => {
              setFormData({
                ...formData,
                garage: {
                  ...formData.garage,
                  address_line_1: e.target.value,
                },
              });
            }}
            onLocationChange={(place) => {
              setFormData({
                ...formData,
                garage: {
                  ...formData.garage,
                  address_line_1: place?.formatted_address
                    ? place?.formatted_address
                    : "",
                  lat: place?.lat,
                  long: place?.long,
                  postcode: `${
                    place?.address_components?.find((i) =>
                      i?.types?.includes("postal_code")
                    )?.long_name
                      ? place?.address_components?.find((i) =>
                          i?.types?.includes("postal_code")
                        )?.long_name
                      : ""
                  }`,
                  city: `${
                    place?.address_components?.find((i) =>
                      i?.types?.includes("locality")
                    )?.long_name
                      ? place?.address_components?.find((i) =>
                          i?.types?.includes("locality")
                        )?.long_name
                      : ""
                  }`,
                  country: `${
                    place.address_components.find((i) =>
                      i?.types.includes("country")
                    )?.short_name
                      ? place.address_components.find((i) =>
                          i?.types.includes("country")
                        )?.short_name
                      : ""
                  }`,
                },
              });
            }}
            defaultValue={formData?.garage?.address_line_1}
          />

          {/* VALIDATION MESSAGE  */}
          {errors?.address_line_1 && (
            <label
              data-auto={`step1-error-message-create-employee1`}
              className="label h-7"
            >
              <span className="label-text-alt text-error">
                {errors?.address_line_1}
              </span>
            </label>
          )}
        </div>

        {/* ADDRESS LINE 2 */}
        <div className="w-full">
          {/* LABEL */}
          <label
            data-auto={`step1-label-create-employee1`}
            htmlFor="address_line_1"
            className="label"
          >
            <span className="label-text text-md font-bold">
              Address Line 2{" "}
            </span>
          </label>

          {/* FIELD  */}
          <CustomAutoCompleteV2
            className={`input input-bordered rounded-md w-full`}
            placeholder="Address Line 2"
            type="text"
            name="address_line_2"
            onChange={(e) => {
              setFormData({
                ...formData,
                garage: {
                  ...formData.garage,
                  address_line_2: e.target.value,
                },
              });
            }}
            onLocationChange={(place) => {
              setFormData({
                ...formData,
                garage: {
                  ...formData.garage,
                  address_line_2: place?.formatted_address
                    ? place?.formatted_address
                    : "",
                },
              });
            }}
            defaultValue={formData?.garage?.address_line_2}
          />
        </div>

        {/* CITY */}
        <CustomField
          id={"city"}
          label={"City"}
          required={true}
          type={"text"}
          name={"city"}
          onChange={handleFormChange}
          value={formData.garage?.city}
          placeholder={"City"}
          error={errors?.city}
          wrapperClassName={`w-full`}
          fieldClassName={`w-full`}
        />

        {/* COUNTRY */}
        <CustomField
          id={"country"}
          label={"Country"}
          required={true}
          type={"text"}
          name={"country"}
          onChange={handleFormChange}
          value={formData.garage?.country}
          placeholder={"Country"}
          error={errors?.country}
          wrapperClassName={`w-full`}
          fieldClassName={`w-full`}
        />

        {/* POSTCODE */}
        <CustomField
          id={"postcode"}
          label={"Postcode"}
          required={true}
          type={"text"}
          name={"postcode"}
          onChange={handleFormChange}
          value={formData.garage?.postcode}
          placeholder={"Postcode"}
          error={errors?.postcode}
          wrapperClassName={`w-full`}
          fieldClassName={`w-full`}
        />

        {/* WEB PAGE */}
        <CustomField
          id={"web_page"}
          label={"Web Page"}
          type={"text"}
          name={"web_page"}
          onChange={handleFormChange}
          value={formData.garage?.web_page}
          placeholder={"Web Page"}
          error={errors?.web_page}
          wrapperClassName={`w-full`}
          fieldClassName={`w-full`}
        />

        {/* MINIMUM CHARGES */}
        <CustomNumberFieldWithCurrency
          currency={formData?.garage?.currency}
          id={"labour_rate"}
          label={"Minimum Charges"}
          name={"labour_rate"}
          onChange={handleFormChange}
          value={formData.garage?.labour_rate}
          placeholder={"Minimum Charges"}
          error={errors?.labour_rate}
          wrapperClassName={`w-full`}
          fieldClassName={`w-full`}
        />

        {/* MOBILE GARAGE  */}
        <CustomMultiSelect
          error={errors?.is_mobile_garage}
          singleSelect
          loading={false}
          label={"Mobile Garage"}
          placeholder="Mobile Garage"
          options={[
            { id: 1, name: "Yes", value: 1 },
            { id: 2, name: "No", value: 0 },
          ]}
          required={true}
          defaultSelectedValues={[
            { id: 1, name: "Yes", value: 1 },
            { id: 2, name: "No", value: 0 },
          ]?.filter(
            (type) => type?.value === formData?.garage?.is_mobile_garage
          )}
          onSelect={(e) => {
            setFormData({
              ...formData,
              garage: {
                ...formData.garage,
                is_mobile_garage: e[0]?.value,
              },
            });
          }}
          dataAuto={`mobile-garage-create-employee`}
        />

        {/* WIFI AVAILABILITY  */}
        <CustomMultiSelect
          error={errors?.wifi_available}
          singleSelect
          loading={false}
          label={"WIFI Availability"}
          placeholder="WIFI Availability"
          options={[
            { id: 1, name: "Yes", value: 1 },
            { id: 2, name: "No", value: 0 },
          ]}
          required={true}
          defaultSelectedValues={[
            { id: 1, name: "Yes", value: 1 },
            { id: 2, name: "No", value: 0 },
          ]?.filter((type) => type?.value === formData?.garage?.wifi_available)}
          onSelect={(e) => {
            setFormData({
              ...formData,
              garage: {
                ...formData.garage,
                wifi_available: e[0]?.value,
              },
            });
          }}
          dataAuto={`wifi-create-employee`}
        />

        {/* CURRENCY  */}
        <CustomMultiSelect
          singleSelect
          top
          error={errors?.currency}
          loading={isCurrencyLoading}
          label={"Currency"}
          placeholder="Currency"
          options={currencyOptions}
          required={true}
          defaultSelectedValues={currencyOptions?.filter(
            (type) => type?.name === formData?.garage?.currency
          )}
          onSelect={(e) => {
            setFormData({
              ...formData,
              garage: {
                ...formData.garage,
                currency: e[0]?.name,
              },
            });
          }}
          dataAuto={`wifi-create-employee`}
        />

        {/* TIME FORMAT  */}
        <CustomMultiSelect
          error={errors?.time_format}
          singleSelect
          loading={false}
          label={"Time Format"}
          placeholder={"Time Format"}
          options={[
            { id: 1, name: "12 Hours", value: "12-hour" },
            { id: 2, name: "24 Hours", value: "24-hour" },
          ]}
          required={true}
          defaultSelectedValues={[
            { id: 1, name: "12 Hours", value: "12-hour" },
            { id: 2, name: "24 Hours", value: "24-hour" },
          ]?.filter((type) => type?.value === formData?.garage?.time_format)}
          onSelect={(e) => {
            setFormData({
              ...formData,
              garage: {
                ...formData.garage,
                time_format: e[0]?.value,
              },
            });
          }}
          dataAuto={`wifi-create-employee`}
        />
      </div>

      <div
        className={`flex flex-col-reverse md:flex-row gap-y-2 mt-5 w-full items-center justify-between`}
      >
        {/* PREVIOUS BUTTON  */}
        <button
          onClick={handlePrevious}
          className={`btn btn-primary btn-outline w-full md:w-52`}
        >
          Previous
        </button>

        {/* NEXT BUTTON  */}
        <button
          disabled={checkEmailMutation?.isPending}
          onClick={() => {
            if (validateForm()) {
              handleNext();
            }
          }}
          className={`btn btn-primary w-full md:w-52`}
        >
          Next
        </button>
      </div>
    </>
  );
}
