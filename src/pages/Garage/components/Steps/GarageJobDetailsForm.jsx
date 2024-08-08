import { useEffect, useState } from "react";
import ButtonSpinner from "../../../../components/Loaders/ButtonSpinner";
import moment from "moment";
import CustomTextareaField from "../../../../components/InputFields/CustomTextareaField";
import CustomDatePickerWithTime from "../../../../components/InputFields/CustomDatePickerWithTime";
import CustomFileUploader from "../../../../components/InputFields/CustomFileUploader";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FileUpload } from "./UploadFiles";
import CustomMultiSelect from "../../../../components/InputFields/CustomMultiSelect";
import { useData } from "../../../../context/DataContext";
import CustomFieldV2 from "../../../../components/InputFields/CustomFieldV2";

export default function GarageJobDetailsForm({
  formData,
  setStep,
  setFormData,
  garageData,
}) {
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};

    // Example date and time string
    const dateTimeString = `${formData?.job_start_date} ${formData?.job_start_time}`;
    // Format of the date and time string
    const format = "YYYY-MM-DD HH:mm";
    // Check if the date and time string is valid
    if (formData?.job_start_date || formData?.job_start_time) {
      if (!moment(dateTimeString, format, true).isValid()) {
        // Set an error message for the 'timing' field
        newErrors.job_start_date = "Please select date and time properly";
      }
    } else {
      newErrors.job_start_date = "Job start date is required";
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

  return (
    <div className={``}>
      <div className="join join-vertical w-full">
        <div className="collapse collapse-arrow join-item  border border-primary">
          <input type="checkbox" name="my-accordion-4" />
          <div className="collapse-title columns-lg font-semibold">
            Garage Schedule
          </div>
          <div className="collapse-content">
            <div className={`text-sm`}>
              <div
                className={`bg-primary text-base-300 w-full py-3 px-5 flex font-semibold`}
              >
                <span className={`w-[40%] block`}>Day</span>
                <span className={`w-[40%] block`}>Start at</span>
                <span className={`w-[20%] block`}>Until</span>
              </div>

              {garageData?.garage?.garage_times?.map((item, index) => (
                <div
                  key={index}
                  className={`bg-base-100 w-full py-3 px-5 flex border-b border-primary-content`}
                >
                  {!item?.is_closed ? (
                    <>
                      <span className={`w-[40%] block`}>
                        {item?.day === 0
                          ? "Sunday"
                          : item?.day === 1
                          ? "Moneday"
                          : item?.day === 2
                          ? "Tuesday"
                          : item?.day === 3
                          ? "Wuesday"
                          : item?.day === 4
                          ? "Thursday"
                          : item?.day === 5
                          ? "Friday"
                          : item?.day === 6
                          ? "Saturday"
                          : ""}
                      </span>
                      <span className={`w-[40%] block`}>
                        {moment(item?.opening_time, "HH:mm").format("hh:mmA")}
                      </span>
                      <span className={`w-[20%] block`}>
                        {moment(item?.closing_time, "HH:mm").format("hh:mmA")}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className={`w-[60%] block`}>
                        {item?.day === 0
                          ? "Sunday"
                          : item?.day === 1
                          ? "Moneday"
                          : item?.day === 2
                          ? "Tuesday"
                          : item?.day === 3
                          ? "Wuesday"
                          : item?.day === 4
                          ? "Thursday"
                          : item?.day === 5
                          ? "Friday"
                          : item?.day === 6
                          ? "Saturday"
                          : ""}
                      </span>
                      <span className={`w-[40%] block`}>Close</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FORM  */}
      <div>
        {/* JOB START DATE & TIME  */}
        <CustomDatePickerWithTime
          required
          // TIME
          timeFormat="24"
          timeVale={moment(formData?.job_start_time, "HH:mm").format("hh:mm A")}
          onTimeChange={(time) => {
            setFormData({
              ...formData,
              job_start_time: moment(time, "hh:mm A").format("HH:mm"),
            });
          }}
          // DATE
          from={moment(new Date()).format("DD-MM-YYYY")}
          right
          value={moment(formData?.job_start_date, "YYYY-MM-DD").format(
            "DD-MM-YYYY"
          )}
          format="dd-LL-yyyy"
          disable={false}
          fieldClassName={"w-full"}
          id={"job_start_date"}
          name={"job_start_date"}
          onChange={(date) => {
            setFormData({
              ...formData,
              job_start_date: moment(date, "DD-MM-YYYY").format("YYYY-MM-DD"),
            });
          }}
          placeholder={"Job start data"}
          label={"Job start data"}
          type={"text"}
          wrapperClassName={"w-full"}
          dataAuto={`search-job_start_date`}
          error={errors?.job_start_date}
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
          //   disabled={isLoading}
          onClick={() => setStep(1)}
          className="btn w-full md:btn-wide btn-primary btn-outline"
        >
          Previous
        </button>
        <button
          //   disabled={isLoading}
          onClick={handleSubmit}
          className="btn w-full md:btn-wide btn-primary"
        >
          {/* {isLoading ? <ButtonSpinner /> : "Next"} */}Next
        </button>
      </div>
    </div>
  );
}
