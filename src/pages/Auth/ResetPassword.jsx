// =====================================
// #00156
// =====================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonLoading from "../../components/ButtonLoading";
import CustomNoteDiv from "../../components/CustomNoteDiv";
import GoBackButton from "../../components/GoBackButton";
import Headings from "../../components/Headings/Headings";
import CustomField from "../../components/InputFields/CustomField";
import ForgotPassword from "./ForgotPassword";
import { resetPassword } from "../../Apis/auth";
import { useAuth } from "../../context/AuthContextV2";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { handleOpenLoginPopup } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    client_site: "client",
  });

  const [errors, setErrors] = useState({});
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // CHANGE FIELD CONTENT
  const onChangeFormData = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // VALIDATION
  const validateForm = () => {
    const newErrors = {};

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

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const [errorMessage, setErrorMessage] = useState("");
  // HANDLE FORM SUBMISSION
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      resetPassword(formData)
        .then((res) => {
          if (res) {
            setIsSent(true);
          }
        })
        .catch((error) => {
          setErrorMessage(error?.response?.data?.message);
          setIsLoading(false);
          if (error.response && error.response.status === 422) {
            const tempErrors = {};
            const responseData = error.response.data;
            if (responseData && responseData.errors) {
              const errors = responseData.errors;
              // Iterate through error keys and map them
              Object.keys(errors).forEach((key) => {
                const errorMessage = errors[key][0]; // Assuming there's only one error message per field
                tempErrors[key] = errors[key][0];
              });
            } else {
              console.log(
                "Validation error, but no specific error messages provided."
              );
            }

            setErrors(tempErrors);
          }
          handleApiError(error, "#00121");
        });
    }
  };

  return (
    <>
      {!isSent ? (
        <div className="flex flex-col p-5 gap-5 justify-center items-left shadow-xl rounded-xl">
          {/* <MdOutlineMarkEmailRead className="text-7xl text-green-500" /> */}
          <Headings level={1} className="text-xl font-semibold">
            Reset link was sent to your email
          </Headings>
          <span className="font-semibold leading-3">Email was sent to:</span>
          <span
            data-auto={`email-forgot-password`}
            className="text-primary leading-3"
          >
            {formData?.email}
          </span>
          <CustomNoteDiv>
            <span className="">
              If you haven't get any email, please check your spam mail folder
            </span>
          </CustomNoteDiv>
          <button
            data-auto={`login-forgot-password`}
            onClick={handleOpenLoginPopup}
            className="btn w-full btn-primary text-base-100"
          >
            Back to Login
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-5 mt-5 bg-base-300 rounded-xl w-full p-5 max-w-[500px]">
          <label
            htmlFor=""
            className="text-left  font-semibold text-2xl w-full"
          >
            Forgot Password?
          </label>

          <p className="text-left text-gray-500 font-semibold text-sm w-full">
            No worries! Enter your email address below and we will send you a
            code to reset password.
            <br />
          </p>

          <CustomField
            id={"email"}
            label={"Enter your email to get a password reset link"}
            required={true}
            type={"email"}
            name={"email"}
            onChange={onChangeFormData}
            value={formData?.email}
            placeholder={"Enter your email"}
            error={errors?.email}
            wrapperClassName={`w-full`}
            fieldClassName={`w-full`}
            dataAuto={`email-field-forgot-password`}
          />

          <div className="flex gap-5 items-center justify-between w-full">
            <button
              data-auto={`reset-email-forgot-password`}
              disabled={isLoading}
              onClick={handleSubmit}
              className="btn w-full btn-primary text-base-100"
            >
              {isLoading ? <ButtonLoading /> : "Send Reset Email"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
