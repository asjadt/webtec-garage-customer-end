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

  // Register FUNCTION
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

  // VALIDATE FORM
  const [errors, setErrors] = useState({});
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

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const [errors2, setErrors2] = useState({});
  const validateForm2 = () => {
    setErrors2({});
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

    // lat long
    if (!formData?.garage?.lat || !formData?.garage?.long) {
      newErrors.address_line_1 = "Please select address from suggestion";
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
    setErrors2(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const [errors3, setErrors3] = useState("");
  const validateForm3 = () => {
    setErrors3("");
    if (
      formData?.service[0]?.automobile_makes?.filter((make) => make?.checked)
        ?.length === 0
    ) {
      setErrors3("Please select at least one make");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select at least one make",
      });
      return false;
    } else {
      setErrors3("");
      return true;
    }
  };

  const [errors4, setErrors4] = useState({});
  const validateForm4 = () => {
    if (
      formData?.service[0]?.services?.filter((ss) => ss?.checked)?.length === 0
    ) {
      setErrors4("Please select at least one make");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select at least one make",
      });
      return false;
    } else {
      setErrors4("");
      return true;
    }
  };

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
              onCLickHandler: () => {
                setStep(1);
              },
            },
            {
              serial: 2,
              id: 2,
              title: "Garage Info",
              onCLickHandler: () => {
                if (validateForm()) {
                  setStep(2);
                }
              },
            },
            {
              serial: 3,
              id: 3,
              title: "Makes",
              onCLickHandler: () => {
                if (validateForm2()) {
                  setStep(3);
                }
              },
            },
            {
              serial: 4,
              id: 4,
              title: "Services",
              onCLickHandler: () => {
                if (validateForm3()) {
                  setStep(4);
                }
              },
            },
            {
              serial: 5,
              id: 5,
              title: "Schedule",
              onCLickHandler: () => {
                if (validateForm4()) {
                  setStep(5);
                }
              },
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
            errors={errors}
            setErrors={setErrors}
          />
        )}
        {step === 2 && (
          <Step2
            formData={formData}
            setFormData={setFormData}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            errors={errors2}
            setErrors={setErrors2}
          />
        )}
        {step === 3 && (
          <Step3
            formData={formData}
            setFormData={setFormData}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            errors={errors3}
            setErrors={setErrors3}
          />
        )}
        {step === 4 && (
          <Step4
            formData={formData}
            setFormData={setFormData}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            errors={errors4}
            setErrors={setErrors4}
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
