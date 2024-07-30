// ==================================
// #00142
// ===================================

import React, { useState } from "react";

import toast from "react-hot-toast";
import CustomLoading from "../../../components/CustomLoading";
import CustomToaster from "../../../components/CustomToaster";
import CustomDatePicker from "../../../components/InputFields/CustomDatePicker";
import ButtonSpinner from "../../../components/Loaders/ButtonSpinner";
import { assetsStatus } from "../../../constant/assetsStatus";

import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";
import Swal from "sweetalert2";
import { postPreBookingDetails } from "../../../Apis/homepageapi";
import Headings from "../../../components/Headings/Headings";
import CustomSingleFileUploader from "../../../components/InputFields/CustomSingleFileUploader";
import {
  MultiSelectV2,
  TextAreaFieldV2,
  TextFieldV2,
} from "../../../components/InputFields/hook-form";
import { handleApiError } from "../../../utils/apiErrorHandler";
import dayjs from "dayjs";
import moment from "moment";
import Stepper from "../../../components/Stepper";
import CustomMultiStepper from "../../../components/CustomMultiStepper";
import ServiceDetailsForm from "./Steps/ServiceDetailsForm";
import JobDetailsForm from "./Steps/JobDetailsForm";
import ReviewForm from "./Steps/ReviewForm";

export default function CreateAndUpdateJobForm({
  id = null,
  handleClosePopup,
}) {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    // STEP 1
    serviceName: "",
    service: [],
    pre_booking_sub_service_ids: [],
    car_registration_no: "",
    automobile_make_id: "",
    makeName: "",
    transmission: "manual",
    automobile_model_id: "",
    modelName: "",

    // STEP 2
    job_start_date: new Date(),
    job_start_time: new Date(),
    job_end_date: new Date(),
    additional_information: "",
    images: [],
    videos: [],

    coupon_code: "",
    car_registration_year: "",
    fuel: "Fuel",
  });

  // CHANGE FORM DATA
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

    // VALIDATE EMPLOYEE
    if (formData?.status === "assigned") {
      if (!formData.user_id) {
        newErrors.user_id = "Employee is required";
      }
    }

    // VALIDATE NAME
    if (!formData.name || formData.name.trim() === "") {
      newErrors.name = "Name is required";
    }
    // VALIDATE CODE
    if (!formData.code || formData.code.trim() === "") {
      newErrors.code = "Code is required";
    }
    // VALIDATE SERIAL NUMBER
    if (!formData.serial_number || formData.serial_number.trim() === "") {
      newErrors.serial_number = "Serial number is required";
    }

    // VALIDATE TYPE
    if (!formData.type) {
      newErrors.type = "Type is required";
    }

    // VALIDATE DATE
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    // VALIDATE NOTE
    if (!formData.note || formData.note.trim() === "") {
      newErrors.note = "Note is required";
    }
    // VALIDATE STATUS
    if (!formData.status) {
      newErrors.status = "Status is required";
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

  // SUBMITTING FORM
  const [isSubmitting, setIsSubmitting] = useState(false);
  // CREATE FUNCTION
  const createFunction = () => {
    setIsSubmitting(true);
    const updatedDate = {
      ...formData,
      pre_booking_sub_service_ids: formData?.service?.map(
        (res) => res?.subServiceId
      ),
      job_start_date: moment(formData.job_start_date).format("YYYY-MM-DD"),
      job_start_time: moment(formData.job_start_time).format("HH:mm"),
      job_end_date: moment(formData.job_end_date).format("YYYY-MM-DD"),
    };

    postPreBookingDetails(updatedDate)
      .then((res) => {
        Swal("Success!", "You Create Job Successfully!", "success");
        history.push("/my-account");
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  // HANDLE VIEW FILES
  // const handleViewFiles = (files) => {
  //   setPopupOption({
  //     open: true,
  //     type: "viewFiles",
  //     title: "View Files",
  //     files: files,
  //     onClose: () => {
  //       setPopupOption({ ...popupOption, open: false });
  //     },
  //     id: null,
  //     closeOnDocumentClick: false,
  //   });
  // };

  // HANDLE SUBMIT FORM
  const handleOnSubmit = (data) => {
    if (validateForm()) {
      createFunction();
    }
  };

  if (false) {
    return <CustomLoading />;
  } else {
    return (
      <div className="py-5 px-5 md:px-5 flex justify-center items-center bg-base-300 h-full">
        <div
          className={`w-full h-full border max-w-[600px] p-5 shadow-lg rounded-xl overflow-y-auto`}
        >
          <Headings level={2} className={`text-primary text-center mb-2`}>
            Create Job
          </Headings>
          <div className="w-full flex justify-center items-center mb-5">
            <CustomMultiStepper
              steps={[
                {
                  serial: 1,
                  id: 1,
                  title: "Service Details",
                },
                {
                  serial: 2,
                  id: 2,
                  title: "Job Details",
                },
                {
                  serial: 3,
                  id: 3,
                  title: "Review",
                },
              ]}
              currentStep={step}
            />
          </div>

          {step === 1 && (
            <ServiceDetailsForm
              setStep={setStep}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {step === 2 && (
            <JobDetailsForm
              setStep={setStep}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {step === 2 && (
            <ReviewForm
              setStep={setStep}
              formData={formData}
              setFormData={setFormData}
            />
          )}
        </div>
      </div>
    );
  }
}
