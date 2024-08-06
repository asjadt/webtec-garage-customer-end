import { useState } from "react";
import { checkEmail } from "../../../../../../Apis/auth";
import CustomAutoComplete from "../../../../../../components/CustomAutoComplete";
import CustomField from "../../../../../../components/InputFields/CustomField";
import CustomFieldV2 from "../../../../../../components/InputFields/CustomFieldV2";
import CustomNumberField from "../../../../../../components/InputFields/CustomNumberField";
import CustomPasswordField from "../../../../../../components/InputFields/CustomPasswordField";
import { useMutation } from "@tanstack/react-query";
import ButtonLoading from "../../../../../../components/ButtonLoading";
import { useAuth } from "../../../../../../context/AuthContextV2";

export default function Step1({ formData, setFormData, handleNext }) {
  const { handleOpenLoginPopup } = useAuth();
  // CHANGE FORM DATA
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        [name]: value,
      },
    }));
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
        setFormData((prev) => ({
          ...prev,
          user: {
            ...prev.user,
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
          user: {
            ...prev.user,
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
    if (
      !formData?.user?.first_Name ||
      formData?.user?.first_Name.trim() === ""
    ) {
      newErrors.first_Name = "First name is required";
    }
    // Validate last name
    if (!formData?.user?.last_Name || formData?.user?.last_Name.trim() === "") {
      newErrors.last_Name = "Last name is required";
    }

    // Validate phone number
    if (!formData?.user?.phone) {
      newErrors.phone = "Phone number is required";
    } else {
      if (!/^\d{11}$/.test(formData?.user?.phone.trim())) {
        newErrors.phone = "Phone number must have 11 digits";
      }
    }

    // Validate email
    if (!formData?.user?.email || formData?.user?.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(
        formData?.user?.email?.trim()
      )
    ) {
      newErrors.email = "Invalid email";
    }

    // Validate password
    if (formData?.user?.password) {
      if (
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(formData?.user?.password)
      ) {
        newErrors.password =
          "Password must be at least 8 characters long and must be contain number, lowercase letter, uppercase letter";
      }
    } else {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    console.log({ newErrors });
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <div className={`grid grid-cols-1 md:grid-cols-2 grid-2 md:gap-x-5`}>
        <div>
          {/* FIRST NAME */}
          <CustomFieldV2
            defaultValue={formData?.user?.first_Name}
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
            defaultValue={formData?.user?.last_Name}
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
          defaultValue={formData?.user?.email}
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
          value={formData?.user?.phone}
          placeholder={"Phone"}
          error={errors?.phone}
          //   required={true}
          wrapperClassName={`w-full`}
          fieldClassName={`w-full`}
          maxLength={11}
        />
      </div>
      {/* PASSWORD  */}
      <CustomPasswordField
        required={true}
        label={"Password"}
        id="password"
        onChange={(e) => {
          setFormData((prev) => ({
            ...prev,
            user: {
              ...prev.user,
              password: e.target.value,
              password_confirmation: e.target.value,
            },
          }));
        }}
        value={formData?.user?.password}
        placeholder={`Password`}
        name={`password`}
        error={errors?.password}
        wrapperClassName={`w-full col-span-2`}
        fieldClassName={`w-full`}
        dataAuto={`password-createUserForm`}
      />

      <div className={`flex flex-col mt-5`}>
        <span className={`text-center font-medium py-5`}>
          Already have an account?{" "}
          <span
            onClick={handleOpenLoginPopup}
            className={`text-primary cursor-pointer`}
          >
            Login
          </span>
        </span>
        <div className={`flex justify-center items-center w-full `}>
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
      </div>
    </>
  );
}
