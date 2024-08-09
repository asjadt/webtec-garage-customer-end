import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { checkEmail, signUpUser } from "../../../../../Apis/auth";
import CustomToaster from "../../../../../components/CustomToaster";
import { hasNumber } from "../../../../../utils/hadNumber";
import { handleApiError } from "../../../../../utils/apiErrorHandler";
import { useEffect, useState } from "react";
import CustomField from "../../../../../components/InputFields/CustomField";
import CustomNumberField from "../../../../../components/InputFields/CustomNumberField";
import CustomAutoComplete from "../../../../../components/CustomAutoComplete";
import ButtonLoading from "../../../../../components/ButtonLoading";
import CustomFieldV2 from "../../../../../components/InputFields/CustomFieldV2";
import { useAuth } from "../../../../../context/AuthContextV2";
import CustomPasswordField from "../../../../../components/InputFields/CustomPasswordField";
import axios from "axios";

export default function Customer() {
  const {
    setIsAuthenticated,
    setUser,
    setIsLoading,
    handleClosePopup,
    handleOpenLoginPopup,
    authPopupOptions,
  } = useAuth();

  // FORM DATA
  const [formData, setFormData] = useState({
    address_line_1: "",
    address_line_2: "",
    city: "",
    country: "",
    email: "",
    first_Name: "",
    last_Name: "",
    password: "",
    password_confirmation: "",
    phone: "",
    postcode: "",
  });

  // CHANGE FORM DATA
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "first_Name" || name === "last_Name") {
      setFormData((prev) => ({
        ...prev,
        [name]: !hasNumber(value) ? value : prev[name],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // VALIDATION
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  // EMAIL VALIDATION MUTATION
  const checkEmailMutation = useMutation({
    mutationKey: "checkEmail",
    mutationFn: checkEmail,
    onSuccess: (data) => {
      if (data.data === false) {
        setFormData({ ...formData, email: email });
        setErrors((prev) => ({ ...prev, email: "" }));
      } else {
        setErrors((prev) => ({
          ...prev,
          email: "Email Already Registered!",
        }));
        setFormData({ ...formData, email: "" });
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
    if (!formData.first_Name || formData.first_Name.trim() === "") {
      newErrors.first_Name = "First name is required";
    }
    // Validate last name
    if (!formData.last_Name || formData.last_Name.trim() === "") {
      newErrors.last_Name = "Last name is required";
    }

    // Validate phone number
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else {
      if (!/^\d{11}$/.test(formData.phone.trim())) {
        newErrors.phone = "Phone number must have 11 digits";
      }
    }

    // Validate email
    if (!formData.email || formData.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(
        formData.email.trim()
      )
    ) {
      newErrors.email = "Invalid email";
    }

    // Validate password
    if (formData.password) {
      if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(formData.password)) {
        newErrors.password =
          "Password must be at least 8 characters long and must be contain number, lowercase letter, uppercase letter";
      }
    } else {
      newErrors.password = "Password is required";
    }

    // Validate address
    if (!formData.address_line_1 || formData.address_line_1.trim() === "") {
      newErrors.address_line_1 = "Address is required";
    }

    // Validate city
    if (!formData.city || formData.city.trim() === "") {
      newErrors.city = "City is required";
    }
    // Validate country
    if (!formData.country || formData.country.trim() === "") {
      newErrors.country = "Country is required";
    }
    // Validate postcode
    if (!formData.postcode || formData.postcode.trim() === "") {
      newErrors.postcode = "Postcode is required";
    }

    setErrors(newErrors);

    console.log({ newErrors });
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  // Register FUNCTION
  const mutation = useMutation({
    mutationKey: "signUpUser",
    mutationFn: signUpUser,
    onSuccess: (res) => {
      setIsLoading(true);
      Swal.fire({
        title: "Success?",
        text: "A new user created successfully!",
        icon: "success",
        confirmButtonText: "Ok",
        customClass: {
          title: "text-primary",
          container: "",
          popup: "bg-base-300 shadow-xl rounded-xl border border-primary",
          icon: "text-red-500",
          cancelButton: "bg-green-500",
        },
      }).then(() => {
        setIsAuthenticated(true);
        setUser(res);

        localStorage.setItem("user_data", JSON.stringify(res));
        axios.defaults.headers.common["Authorization"] = `Bearer ${res?.token}`;

        setIsLoading(false);
        handleClosePopup();
      });
    },
  });

  // HANDLE ERROR
  useEffect(() => {
    if (mutation?.isError) {
      handleApiError(mutation.error);
    }
  }, [mutation?.isError]);

  // HANDLE SUBMIT
  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        mutation.mutate(formData);
      } catch (error) {
        console.log({ error });
      }
    }
  };

  return (
    <div className={`pb-5`}>
      <div className={`grid grid-cols-1 md:grid-cols-2 grid-2 md:gap-x-5`}>
        <div>
          {/* FIRST NAME */}
          <CustomFieldV2
            defaultValue={formData?.first_Name}
            disable={false}
            error={errors?.first_Name}
            fieldClassName={"w-full"}
            id={"first_Name"}
            label={"First Name"}
            name={"first_Name"}
            onChange={handleFormChange}
            placeholder={"First Name"}
            type={"text"}
            wrapperClassName={"w-full"}
            required={true}
            maxLength={25}
            pattern={/^[A-Za-z\s]+$/}
            patternErrorMsg="Only Capital and lowercase letters are allowed"
          />
        </div>

        <div>
          {/* LAST NAME  */}
          <CustomFieldV2
            defaultValue={formData?.last_Name}
            disable={false}
            error={errors?.last_Name}
            fieldClassName={"w-full"}
            id={"last_Name"}
            label={"Last Name"}
            name={"last_Name"}
            onChange={handleFormChange}
            placeholder={"Last Name"}
            type={"text"}
            wrapperClassName={"w-full"}
            required={true}
            maxLength={25}
            pattern={/^[A-Za-z\s]+$/}
            patternErrorMsg="Only Capital and lowercase letters are allowed"
          />
        </div>

        {/* EMAIL  */}
        <CustomField
          defaultValue={formData?.email}
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
          onChange={handleFormChange}
          value={formData?.phone}
          placeholder={"Phone"}
          error={errors?.phone}
          //   required={true}
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
              Address <span className="text-error font-bold text-md">*</span>
            </span>
          </label>

          {/* FIELD  */}
          <CustomAutoComplete
            className={`input input-bordered rounded-md w-full`}
            placeholder="Address"
            type="text"
            name="address_line_1"
            onChange={(e) => {
              setFormData({
                ...formData,
                address_line_1: e.target.value,
              });
            }}
            formData={formData}
            setFormData={setFormData}
            defaultValue={formData?.address_line_1}
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

        {/* CITY */}
        <CustomField
          id={"city"}
          label={"City"}
          required={true}
          type={"text"}
          name={"city"}
          onChange={handleFormChange}
          value={formData?.city}
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
          value={formData?.country}
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
          value={formData?.postcode}
          placeholder={"Postcode"}
          error={errors?.postcode}
          wrapperClassName={`w-full`}
          fieldClassName={`w-full`}
        />
      </div>
      {/* PASSWORD */}
      <CustomPasswordField
        required={true}
        label={"Password"}
        id="password"
        onChange={(e) => {
          setFormData((prev) => ({
            ...prev,
            password: e.target.value,
            password_confirmation: e.target.value,
          }));
        }}
        value={formData?.password}
        placeholder={`Password`}
        name={`password`}
        error={errors?.password}
        wrapperClassName={`w-full`}
        fieldClassName={`w-full`}
        dataAuto={`password-createUserForm`}
      />

      <div className={`flex flex-col mt-5`}>
        <span className={`text-center font-medium py-5`}>
          Already have an account?{" "}
          <span
            onClick={() => handleOpenLoginPopup(authPopupOptions?.forms)}
            className={`text-primary cursor-pointer`}
          >
            Login
          </span>
        </span>
        <div className={`flex justify-center items-center w-full `}>
          <button
            disabled={mutation?.isPending || checkEmailMutation?.isPending}
            onClick={handleSubmit}
            className={`btn btn-primary w-full md:w-52`}
          >
            {mutation?.isPending ? <ButtonLoading /> : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}
