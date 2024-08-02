// ==================================
// #00142
// ===================================

import React, { useEffect, useState } from "react";

import CustomLoading from "../../../../components/CustomLoading";

import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { postPreBookingDetails } from "../../../../Apis/homepageapi";
import CustomMultiStepper from "../../../../components/CustomMultiStepper";
import CustomPopup from "../../../../components/CustomPopup";
import GoBackButtonSm from "../../../../components/GoBackButtonSm";
import Headings from "../../../../components/Headings/Headings";
import { useAuth } from "../../../../context/AuthContextV2";
import { useData } from "../../../../context/DataContext";
import { handleApiError } from "../../../../utils/apiErrorHandler";
import Login from "../../../Auth/Login";
import JobDetailsForm from "../Steps/JobDetailsForm";
import ReviewForm from "../Steps/ReviewForm";
import ServiceDetailsForm from "../Steps/ServiceDetailsForm";

export default function CreateBookingForm({ garageData }) {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { loading } = useData();

  // POPUP OPTIONS
  const [popupOption, setPopupOption] = useState({
    open: false,
    type: "",
    onClose: () => {
      setPopupOption({ ...popupOption, open: false });
    },
    overlayStyle: { background: "red" },
    closeOnDocumentClick: false,
  });
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // STEP 1
    service: [],
    pre_booking_sub_service_ids: [],
    car_registration_no: "",
    automobile_make_id: "",
    automobile_model_id: "",
    transmission: "manual",

    // STEP 2
    job_start_date: moment(new Date()).format("YYYY-MM-DD"),
    job_start_time: "00:00",
    job_end_date: moment().add(1, "month").format("YYYY-MM-DD"),
    additional_information: "",
    images: [],
    videos: [],
    file_links: [],

    coupon_code: "",
    car_registration_year: "",
    fuel: "Fuel",
  });

  // CREATE FUNCTION
  const mutation = useMutation({
    mutationKey: "createJob",
    mutationFn: postPreBookingDetails,
    onSuccess: () => {
      Swal.fire({
        title: "Success?",
        text: "A new job created successfully!",
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
        navigate("/my-account/my-bookings");
      });
    },
  });

  const createFunction = async () => {
    const updatedDate = {
      ...formData,
      job_start_date: moment(formData.job_start_date).format("YYYY-MM-DD"),
      // job_start_time: moment(formData.job_start_time, "HH:mm").format("HH:mm"),
      job_end_date: moment(formData.job_end_date).format("YYYY-MM-DD"),
    };

    try {
      mutation.mutate(updatedDate);
    } catch (error) {
      handleApiError(mutation.error);
    }
  };

  // HANDLE SUBMIT FORM
  const handleOnSubmit = () => {
    if (user || isAuthenticated) {
      createFunction();
    } else {
      // OPEN THE LOGIN POPUP
      console.log("login");
      setPopupOption({
        open: true,
        type: "login",
        onClose: () => {
          setPopupOption({ ...popupOption, open: false });
        },
        overlayStyle: { background: "red" },
        closeOnDocumentClick: false,
      });
    }
  };

  if (loading) {
    return <CustomLoading />;
  } else {
    return (
      <div className="py-5 px-5 md:px-5 flex justify-center items-center bg-base-300 h-full">
        <CustomPopup
          popupClasses={`w-[70vw]`}
          popupOption={popupOption}
          setPopupOption={setPopupOption}
          Component={
            <>
              {popupOption?.type === "login" && (
                <Login
                  handleClosePopup={(e) => {
                    setPopupOption({
                      open: false,
                      type: "",
                      onClose: () => {
                        setPopupOption({ ...popupOption, open: false });
                      },
                      overlayStyle: { background: "red" },
                      closeOnDocumentClick: false,
                    });
                  }}
                />
              )}
            </>
          }
        />
        <div
          className={`w-full border max-w-[600px] p-5 shadow-lg rounded-xl h-auto relative`}
        >
          {/* TITLE  */}
          <div className={`flex justify-center w-full`}>
            <Headings
              level={2}
              className={` text-center mb-2  w-[90%] flex flex-col`}
            >
              Booking With{" "}
              <span className={`text-primary`}>{garageData?.garage?.name}</span>
            </Headings>
          </div>

          {/* STEPPER  */}
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
              garageData={garageData}
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
          {step === 3 && (
            <ReviewForm
              setStep={setStep}
              formData={formData}
              setFormData={setFormData}
              handleOnSubmit={handleOnSubmit}
              isLoading={mutation.isPending}
            />
          )}
        </div>
      </div>
    );
  }
}
