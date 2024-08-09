// ==================================
// #00142
// ===================================
import React, { useState } from "react";
import CustomLoading from "../../../components/CustomLoading";
import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { postPreBookingDetails } from "../../../Apis/homepageapi";
import CustomMultiStepper from "../../../components/CustomMultiStepper";
import Headings from "../../../components/Headings/Headings";
import { useAuth } from "../../../context/AuthContextV2";
import { handleApiError } from "../../../utils/apiErrorHandler";
import JobDetailsForm from "./StepsForJob/JobDetailsForm";
import ReviewForm from "./StepsForJob/ReviewForm";
import ServiceDetailsForm from "./StepsForJob/ServiceDetailsForm";
import { useData } from "../../../context/DataContext";

export default function CreateAndUpdateJobForm() {
  const navigate = useNavigate();
  const { homeSearchData, subServices } = useData();
  const { user, isAuthenticated, handleOpenLoginPopup } = useAuth();
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
    pre_booking_sub_service_ids:
      homeSearchData?.sub_services?.length > 0
        ? subServices?.filter((ss) =>
            homeSearchData?.sub_services?.some((gs) => gs === ss?.id)
          )
        : [],
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
        navigate("/my-account/pending-jobs");
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
      handleOpenLoginPopup({ garageRegistration: false });
    }
  };

  if (false) {
    return <CustomLoading />;
  } else {
    return (
      <div className="py-5 px-5 md:px-5 flex justify-center items-center bg-base-300 h-full">
        <div
          className={`w-full border max-w-[600px] p-5 shadow-lg rounded-xl h-auto`}
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
