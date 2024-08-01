import React, { useState } from "react";
import toast from "react-hot-toast";
import ButtonLoading from "../../../../../components/ButtonLoading";
import CustomToaster from "../../../../../components/CustomToaster";
import Headings from "../../../../../components/Headings/Headings";
import CustomField from "../../../../../components/InputFields/CustomField";
import CustomNumberField from "../../../../../components/InputFields/CustomNumberField";
import { formatRole } from "../../../../../utils/formatRole";
import useViewProfileContext from "../../ViewProfileComponents/useViewProfileContext";

export default function PersonalDetails() {
  const {
    userInfo,
    userId,
    isLoading,
    setIsLoading,
    formData,
    setFormData,
  } = useViewProfileContext();
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  console.log(formData)
  // CHANGE FORM DATA
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [errors, setErrors] = useState();

  // VALIDATE
  const validateForm = () => {
    const newErrors = {};

    const pattern = /^[a-zA-Z\s.]+$/
    // Validate first name
    if (!formData.first_Name || formData.first_Name.trim() === "") {
      newErrors.first_Name = "First name is required";
    }
    if (!(pattern).test(formData?.first_Name)) {
      newErrors.first_Name = 'Only Capital and small letter allowed';
    }
    // Validate middle name
    // if (!(pattern).test(formData?.middle_Name)) {
    //   newErrors.middle_Name = 'Only Capital and small letter allowed';
    // }
    // Validate last name
    if (!formData.last_Name || formData.last_Name.trim() === "") {
      newErrors.last_Name = "Last name is required";
    }
    if (!(pattern).test(formData?.last_Name)) {
      newErrors.last_Name = 'Only Capital and small letter allowed';
    }
    // Validate email
    if (formData.email) {
      if (
        !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(
          formData.email.trim()
        )
      ) {
        newErrors.email = "Invalid email";
      }
    } else {
      newErrors.email = "Email is required";
    }
    if (formData.phone) {
      if (formData?.phone.toString().split("").length !== 11) {
        newErrors.phone = "Phone must be 11 digit";
      }
    } else {
      newErrors.phone = "Phone is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length !== 0) {
      toast.custom((t) => (
        <CustomToaster
          t={t}
          type={"error"}
          errors={{
            validationErrors: Object.entries(newErrors).map((error, i) => {
              if (Array.isArray(error[1])) {
                return Object.entries(error[1][0])
                  .map((error2, j) => {
                    return error2[1];
                  })
                  .join(" & ");
              } else {
                return error[1];
              }
            }),
          }}
          text={`You are submitting invalid data`}
        />
      ));
    }

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };
  // HANDLE SAVE DATA
  const [isPendingSubmit, setIsPendingSubmit] = useState(false);

  const handleSaveData = () => {
    // if (validateForm()) {
    //   setIsPendingSubmit(true);
    //   updateProfile(formData)
    //     .then((res) => {
    //       setIsPendingSubmit(false);
    //       setIsEditEnabled(false);
    //     })
    //     .catch((error) => {
    //       console.log({ 188: error });
    //       setIsPendingSubmit(false);
    //       if (error.response && error.response.status === 422) {
    //         const tempErrors = {};
    //         const responseData = error.response.data;
    //         if (responseData && responseData.errors) {
    //           const errors = responseData.errors;
    //           // Iterate through error keys and map them
    //           Object.keys(errors).forEach((key) => {
    //             const errorMessage = errors[key][0]; // Assuming there's only one error message per field
    //             tempErrors[key] = errors[key][0];
    //           });
    //         } else {
    //           console.log(
    //             "Validation error, but no specific error messages provided."
    //           );
    //         }

    //         setErrors(tempErrors);
    //       }
    //       handleApiError(error, '#00119');
    //     });
    // }
  };

  return (
    <div>
      <div className="py-5 flex justify-between items-center">
        <Headings level={2}>Personal Details</Headings>
        <button
          disabled={isPendingSubmit}
          className="btn btn-primary w-[100px]"
          onClick={() => {
            if (isEditEnabled) {
              handleSaveData();
            } else {
              setIsEditEnabled(true);
            }
          }}
        >
          {isPendingSubmit ? (
            <ButtonLoading />
          ) : isEditEnabled ? (
            "Save"
          ) : (
            "Edit"
          )}
        </button>
      </div>

      <div className="p-5 rounded-xl  shadow-md bg-base-300 border-2 border-primary-content">
        {/* FIRST NAME  */}
        <div className="flex justify-between items-end gap-5">
          <CustomField
            visibleBorder
            value={formData?.first_Name}
            disable={!isEditEnabled}
            error={errors?.first_Name}
            fieldClassName={"w-full"}
            id={"first_Name"}
            label={"First Name"}
            name={"first_Name"}
            onChange={handleFormChange}
            placeholder={"First Name"}
            type={"text"}
            wrapperClassName={"w-full"}
            maxLength={25}
            pattern={/^[a-zA-Z\s.]+$/}
            patternErrorMsg={'Only Capital and small letter allowed'}
          />
        </div>

        {/* MIDDLE NAME  */}

        <div className="flex justify-between items-end gap-5">
          <CustomField
            visibleBorder
            value={formData?.middle_Name ? formData?.middle_Name : ''}
            disable={!isEditEnabled}
            error={errors?.middle_Name}
            fieldClassName={"w-full"}
            id={"middle_Name"}
            label={"Middle Name"}
            name={"middle_Name"}
            onChange={handleFormChange}
            placeholder={"Middle Name"}
            type={"text"}
            wrapperClassName={"w-full"}
            maxLength={25}
            pattern={/^[a-zA-Z\s.]+$/}
            patternErrorMsg={'Only Capital and small letter allowed'}
          />
        </div>

        {/* LAST NAME  */}
        <div className="flex justify-between items-end gap-5">
          <CustomField
            visibleBorder
            value={formData?.last_Name}
            disable={!isEditEnabled}
            error={errors?.last_Name}
            fieldClassName={"w-full"}
            id={"last_Name"}
            label={"Last Name"}
            name={"last_Name"}
            onChange={handleFormChange}
            placeholder={"Last Name"}
            type={"text"}
            wrapperClassName={"w-full "}
            maxLength={25}
            pattern={/^[a-zA-Z\s.]+$/}
            patternErrorMsg={'Only Capital and small letter allowed'}
          />
        </div>

        {/* EMAIL */}
        <div className="flex justify-between items-end gap-5">
          <CustomField
            visibleBorder
            value={formData?.email}
            disable={!isEditEnabled}
            error={errors?.email}
            fieldClassName={"w-full"}
            id={"email"}
            label={"Email"}
            name={"email"}
            onChange={handleFormChange}
            placeholder={"Email"}
            type={"email"}
            wrapperClassName={"w-full "}
          />
        </div>

        {/* PHONE */}
        <div className="flex justify-between items-end gap-5">
          <CustomNumberField
            visibleBorder
            value={formData?.phone}
            disable={!isEditEnabled}
            error={errors?.phone}
            fieldClassName={"w-full"}
            id={"phone"}
            label={"Phone"}
            name={"phone"}
            onChange={handleFormChange}
            placeholder={"Phone"}
            type={"phone"}
            wrapperClassName={"w-full "}
            maxLength={11}
          />
        </div>

        {/* GENDER */}
        <div className="flex justify-between items-end gap-5">
          {!isEditEnabled ? (
            <CustomField
              visibleBorder
              value={formatRole(formData?.gender)}
              disable={!isEditEnabled}
              error={errors?.gender}
              fieldClassName={"w-full"}
              id={"gender"}
              label={"Gender"}
              name={"gender"}
              onChange={handleFormChange}
              placeholder={"Not Set"}
              type={"gender"}
              wrapperClassName={"w-full "}
            />
          ) : (
            <div className="w-full">
              <div className="label">
                <span className="label-text text-md font-bold">Gender</span>
              </div>

              <div className="flex items-start md:items-center flex-col md:flex-row justify-start w-full gap-5 -mt-1">
                {/* MALE  */}
                <div className="form-control flex justify-start items-center">
                  <label className="label cursor-pointer flex items-center gap-5">
                    <input
                      type="radio"
                      name={`gender`}
                      onChange={handleFormChange}
                      value={"male"}
                      className="toggle toggle-primary"
                      defaultChecked={formData?.gender === "male"}
                    />
                    <span className="label-text">Male</span>
                  </label>
                </div>
                {/* FEMALE  */}
                <div className="form-control flex justify-start items-center">
                  <label className="label cursor-pointer flex items-center gap-5">
                    <input
                      type="radio"
                      name={`gender`}
                      value={"female"}
                      onChange={handleFormChange}
                      className="toggle toggle-primary"
                      defaultChecked={formData?.gender === "female"}
                    />
                    <span className="label-text">Female</span>
                  </label>
                </div>
                <div className="form-control flex justify-start items-center">
                  <label className="label cursor-pointer flex items-center gap-5">
                    <input
                      type="radio"
                      name={`gender`}
                      value={"other"}
                      onChange={handleFormChange}
                      className="toggle toggle-primary"
                      defaultChecked={formData?.gender === "other"}
                    />
                    <span className="label-text">Other</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}