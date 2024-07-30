import { useEffect, useState } from "react";
import ButtonSpinner from "../../Loaders/ButtonSpinner";
import CustomMultiSelect from "../CustomMultiSelect";

export default function MultiSelectFilter({ handleClosePopup, popupOption }) {
  const [values, setValues] = useState(popupOption?.selectedValue || [""]);

  const [isPendingSubmit, setIsPendingSubmit] = useState(false);

  const handleSubmit = () => {
    handleClosePopup(values);
  };

  return (
    <div className={` pb-5`}>
      <div className="grid grid-cols-1 mt-1">
        <CustomMultiSelect
          options={popupOption?.availableValues}
          onSelect={(e) => {
            setValues(e?.map((v) => v?.id));
          }}
        />
      </div>
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
