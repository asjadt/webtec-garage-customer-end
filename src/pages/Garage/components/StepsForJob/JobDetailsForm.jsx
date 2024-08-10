import { useEffect, useState } from "react";
import ButtonSpinner from "../../../../components/Loaders/ButtonSpinner";
import moment from "moment";
import CustomTextareaField from "../../../../components/InputFields/CustomTextareaField";
import CustomDatePickerWithTime from "../../../../components/InputFields/CustomDatePickerWithTime";
import CustomFileUploader from "../../../../components/InputFields/CustomFileUploader";
import CustomTimePickerV2 from "../../../../components/InputFields/CustomTimePickerV2";
import CustomDatePickerV2 from "../../../../components/InputFields/CustomDatePickerV2";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FileUpload } from "./UploadFiles";

export default function JobDetailsForm({ formData, setStep, setFormData }) {
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};

    // Example date and time string
    const dateTimeString = `${formData?.job_start_date} ${formData?.job_start_time}`;
    // Format of the date and time string
    const format = "YYYY-MM-DD HH:mm";
    // Check if the date and time string is valid
    if (formData?.job_start_date && formData?.job_start_time) {
      if (!moment(dateTimeString, format, true).isValid()) {
        // Set an error message for the 'timing' field
        newErrors.job_start_date = "Please select date and time properly";
      }
    } else {
      if (!formData?.job_start_date) {
        newErrors.job_start_date = "Job start date is required";
      }
      if (!formData?.job_start_time) {
        newErrors.job_start_time = "Job start time is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // HANDLE CHANGE FORM DATA
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    if (validateForm()) {
      setStep(3);
    }
  };

  useEffect(() => {
    console.log({ formData });
  }, [formData]);

  return (
    <div className={``}>
      {/* FORM  */}
      <div>
        {/* JOB START DATE & TIME  */}
        <CustomDatePickerV2
          required
          // DATE
          from={moment(new Date()).format("DD-MM-YYYY")}
          right
          value={
            formData?.job_start_date
              ? moment(formData?.job_start_date, "YYYY-MM-DD").format(
                  "DD-MM-YYYY"
                )
              : ""
          }
          format="dd-LL-yyyy"
          disable={false}
          fieldClassName={"w-full"}
          id={"job_start_date"}
          name={"job_start_date"}
          onChange={(date) => {
            setFormData({
              ...formData,
              job_start_date: date
                ? moment(date, "DD-MM-YYYY").format("YYYY-MM-DD")
                : "",
              job_end_date: date
                ? moment(date, "DD-MM-YYYY")
                    .add(1, "month")
                    .format("YYYY-MM-DD")
                : "",
            });
          }}
          placeholder={"Job start data"}
          label={"Job start data"}
          type={"text"}
          wrapperClassName={"w-full"}
          dataAuto={`search-job_start_date`}
          error={errors?.job_start_date}
        />

        {/* TIME  */}
        <CustomTimePickerV2
          label={"Job start time"}
          required
          value={
            formData?.job_start_time
              ? moment(formData?.job_start_time, "HH:mm").format("hh:mm:ss")
              : ""
          }
          onChange={(time) => {
            setFormData({
              ...formData,
              job_start_time: time
                ? moment(time, "hh:mm A").format("HH:mm")
                : "",
            });
          }}
          error={errors?.job_start_time}
        />
        {/* EXTRA NOTES  */}
        <CustomTextareaField
          defaultValue={formData?.additional_information}
          disable={false}
          error={errors?.additional_information}
          fieldClassName={"w-full"}
          id={"additional_information"}
          label={"Extra notes"}
          name={"additional_information"}
          onChange={handleFormChange}
          placeholder={"Extra notes"}
          type={"text"}
          wrapperClassName={"w-full"}
          maxLength={500}
          dataAuto={`additional-information-create-job`}
        />

        <FileUpload
          label={"Upload Files"}
          inputData={formData}
          setInputData={setFormData}
        />
      </div>
      <div className="flex w-full justify-between items-center gap-2 mt-5 flex-col md:flex-row ">
        <button
          disabled={isLoading}
          onClick={() => setStep(1)}
          className="btn w-full md:btn-wide btn-primary btn-outline"
        >
          Previous
        </button>
        <button
          disabled={isLoading}
          onClick={handleSubmit}
          className="btn w-full md:btn-wide btn-primary"
        >
          {isLoading ? <ButtonSpinner /> : "Next"}
        </button>
      </div>
    </div>
  );
}
