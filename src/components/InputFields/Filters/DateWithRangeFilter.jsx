import { useEffect, useState } from "react";
import CustomField from "../CustomField";
import ButtonSpinner from "../../Loaders/ButtonSpinner";
import CustomNumberField from "../CustomNumberField";
import CustomMultiSelect from "../CustomMultiSelect";
import CustomDatePicker from "../CustomDatePicker";
import moment from "moment";

export default function DateWithRangeFilter({ handleClosePopup, popupOption }) {
  const [values, setValues] = useState(popupOption?.selectedValue || [""]);
  const [selectedStartDate, setSelectedStartDate] = useState(
    popupOption?.selectedValue[0] || ""
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    popupOption?.selectedValue[1] || ""
  );

  useEffect(() => {
    setValues([selectedStartDate, selectedEndDate]);
  }, [selectedStartDate, selectedEndDate]);

  useEffect(() => {
    console.log({ values });
  }, [values]);

  const [isPendingSubmit, setIsPendingSubmit] = useState(false);

  const handleSubmit = () => {
    handleClosePopup(values);
  };

  return (
    <div className={`pb-10 `}>
      <CustomDatePicker
        small
        value={selectedStartDate}
        disable={false}
        fieldClassName={"w-full"}
        label={"Start Date"}
        onChange={(date) => {
          setSelectedStartDate(date);
        }}
        placeholder={"Start Date"}
        type={"text"}
        wrapperClassName={"w-full"}
        required={true}
      />

      <CustomDatePicker
        small
        value={selectedEndDate}
        disable={false}
        from={selectedStartDate}
        fieldClassName={"w-full"}
        label={"End Date"}
        onChange={(date) => {
          setSelectedEndDate(date);
        }}
        placeholder={"End Date"}
        type={"text"}
        wrapperClassName={"w-full"}
        required={true}
        top
      />

      <div className="mt-5 flex justify-end">
        <button
          disabled={
            values[0] === "" ||
            values?.length === 0 ||
            values[0] === undefined ||
            values[0] === null
          }
          onClick={handleSubmit}
          className="btn btn-sm w-1/2 btn-primary"
        >
          {isPendingSubmit ? <ButtonSpinner /> : "Apply"}
        </button>
      </div>
    </div>
  );
}
