import { useEffect, useState } from "react";
import CustomField from "../CustomField";
import ButtonSpinner from "../../Loaders/ButtonSpinner";
import CustomNumberField from "../CustomNumberField";
import CustomMultiSelect from "../CustomMultiSelect";
import CustomDatePicker from "../CustomDatePicker";

export default function DateWithoutRangeFilter({
  handleClosePopup,
  popupOption,
}) {
  const [values, setValues] = useState(popupOption?.selectedValue || [""]);
  const [selectedStartDate, setSelectedStartDate] = useState(
    popupOption?.selectedValue[0] || ""
  );

  useEffect(() => {
    setValues([selectedStartDate, selectedStartDate]);
  }, [selectedStartDate]);

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
        onChange={(date) => {
          setSelectedStartDate(date);
        }}
        placeholder={popupOption?.title}
        type={"text"}
        wrapperClassName={"w-full"}
        required={true}
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
