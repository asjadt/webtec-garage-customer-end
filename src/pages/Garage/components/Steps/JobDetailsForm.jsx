import { useEffect, useState } from "react";
import ButtonSpinner from "../../../../components/Loaders/ButtonSpinner";
import moment from "moment";
import CustomTextareaField from "../../../../components/InputFields/CustomTextareaField";

export default function JobDetailsForm({ formData, setStep, setFormData }) {
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};

    // job_start_time,
    // job_start_date,
    // job_end_date,
    // additional_information,
    // images,
    // videos,
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
      {/* FORM  */}
      <div>
        {/* JOB START DATE & TIME  */}
        <CustomDatePickerWithTime
          // TIME
          timeFormat="24"
          timeVale={formData?.job_start_time}
          onTimeChange={(time) => {
            setFormData({
              ...formData,
              job_start_time: time,
            });
          }}
          // DATE
          right
          value={moment(formData?.job_start_date, "YYYY-MM-DD").format(
            "DD-MM-YYYY"
          )}
          format="dd-LL-yyyy"
          disable={false}
          fieldClassName={"w-full"}
          id={"timing"}
          name={"timing"}
          onChange={(date) => {
            setFormData({
              ...formData,
              job_start_date: moment(formData?.job_start_date, "DD-MM-YYYY"),
            });
            setDateData(date);
          }}
          placeholder={"Job start data"}
          label={"Job start data"}
          type={"text"}
          wrapperClassName={"w-full"}
          dataAuto={`search-timing`}
          error={errors?.timing}
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

        {/* MEDIA  */}
        <CustomFileUploader
          details={`Allowed .png, .jpg, .jpeg, .pdf, .mp4, .mkv, .webpm files under 5MB`}
          accept={".png, .jpg, .jpeg, .pdf, .mp4, .mkv, .webpm"}
          files={formData?.attachments}
          isFileUploading={filesUploaderQuery.isPending}
          onFileSelect={async (e) => handleFileUpload(e)}
          onDrop={(files) => handleFileUpload(files)}
          onRemove={(e) => {
            setFormData({
              ...formData,
              attachments: [...formData?.attachments].filter(
                (file_url) => file_url !== e
              ),
            });
          }}
          dataAuto={"file-createUpCandidates"}
        />
      </div>
      <div className="flex w-full justify-center items-center gap-2 mt-5 flex-col md:flex-row">
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
          {isLoading ? <ButtonSpinner /> : "Create Business"}
        </button>
      </div>
    </div>
  );
}
