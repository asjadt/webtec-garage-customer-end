import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { garageRegistration, signUpUser } from "../../../../../Apis/auth";
import { useAuth } from "../../../../../context/AuthContextV2";
import { handleApiError } from "../../../../../utils/apiErrorHandler";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/Step4";
import Step5 from "./Steps/Step5";
import CustomMultiStepper from "../../../../../components/CustomMultiStepper";
import moment from "moment/moment";

export default function GarageOwner() {
  const {
    setIsAuthenticated,
    setUser,
    setIsLoading,
    handleClosePopup,
    handleOpenLoginPopup,
  } = useAuth();

  // STEP
  const [step, setStep] = useState(1);

  // FORM DATA
  const [formData, setFormData] = useState({
    // USER DATA
    user: {
      first_Name: "",
      last_Name: "",
      email: "",
      phone: "",
      image: "",
      password: "",
      password_confirmation: "",
    },

    // GARBAGE DATA
    garage: {
      name: "",
      email: "",
      phone: "",
      address_line_1: "",
      address_line_2: "",
      postcode: "",

      lat: "",
      long: "",
      city: "",
      country: "",

      currency: "USD",

      about: "",
      web_page: "",
      additional_information: "",
      logo: "",
      image: "",
      images: [],
      is_mobile_garage: 1,
      wifi_available: 1,
      labour_rate: 0,
      time_format: "12-hour",
    },

    // SERVICES , SUB SERVICES, AUTOMOBILE MAKES & MODELS
    service: [
      {
        automobile_category_id: 1,
        services: [],
        automobile_makes: [],
      },
    ],
    makesIds: [],
    selectedMakes: [],
    serviceIds: [],
    subServicesIds: [],

    // GARBAGE TIMING
    times: [
      {
        day: 0,
        opening_time: "09:00:00",
        closing_time: "18:00:00",
        is_closed: false,
      },
      {
        day: 1,
        opening_time: "09:00:00",
        closing_time: "18:00:00",
        is_closed: false,
      },
      {
        day: 2,
        opening_time: "09:00:00",
        closing_time: "18:00:00",
        is_closed: false,
      },
      {
        day: 3,
        opening_time: "09:00:00",
        closing_time: "18:00:00",
        is_closed: false,
      },
      {
        day: 4,
        opening_time: "09:00:00",
        closing_time: "18:00:00",
        is_closed: false,
      },
      {
        day: 5,
        opening_time: "09:00:00",
        closing_time: "18:00:00",
        is_closed: false,
      },
      {
        day: 6,
        opening_time: "09:00:00",
        closing_time: "18:00:00",
        is_closed: false,
      },
    ],
  });

  // SIGN UP FUNCTION
  const mutation = useMutation({
    mutationKey: "signUpUser",
    mutationFn: garageRegistration,
    onSuccess: (res) => {
      setIsLoading(true);
      Swal.fire({
        title: "Garage Created!",
        text: "Now you are going to go to the dashboard",
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
        // AFTER REGISTRATION REDIRECT TO THE DASHBOARD
        window.location.href = `${
          import.meta.env.VITE_REACT_APP_REDIRECT_URL
        }?token=${res?.user?.token}`;
      });
    },
  });

  // HANDLE ERROR
  useEffect(() => {
    if (mutation?.isError) {
      handleApiError(mutation.error);
    }
  }, [mutation?.isError]);

  // HANDLE PREVIOUS
  const handlePrevious = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  // HANDLE REGISTRATION
  const handleGarageRegistration = () => {
    try {
      const formattedData = {
        ...formData,
        times: formData.times.map((time) => ({
          ...time,
          opening_time: moment(time.opening_time, "HH:mm:ss").format("HH:mm"),
          closing_time: moment(time.closing_time, "HH:mm:ss").format("HH:mm"),
        })),
      };
      mutation.mutate(formattedData);
    } catch (error) {
      console.log({ error });
    }
  };
  // HANDLE NEXT
  const handleNext = async () => {
    if (step === 5) {
      handleGarageRegistration();
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className={`pb-5`}>
      {/* STEPPER  */}
      <div className="w-full flex justify-center items-center mb-5">
        <CustomMultiStepper
          steps={[
            {
              serial: 1,
              id: 1,
              title: "User Info",
            },
            {
              serial: 2,
              id: 2,
              title: "Garage Info",
            },
            {
              serial: 3,
              id: 3,
              title: "Makes",
            },
            {
              serial: 4,
              id: 4,
              title: "Services",
            },
            {
              serial: 5,
              id: 5,
              title: "Schedule",
            },
          ]}
          currentStep={step}
        />
      </div>
      <>
        {step === 1 && (
          <Step1
            formData={formData}
            setFormData={setFormData}
            handleNext={handleNext}
          />
        )}
        {step === 2 && (
          <Step2
            formData={formData}
            setFormData={setFormData}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
          />
        )}
        {step === 3 && (
          <Step3
            formData={formData}
            setFormData={setFormData}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
          />
        )}
        {step === 4 && (
          <Step4
            formData={formData}
            setFormData={setFormData}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
          />
        )}
        {step === 5 && (
          <Step5
            formData={formData}
            setFormData={setFormData}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            mutation={mutation}
          />
        )}
      </>
    </div>
  );
}
