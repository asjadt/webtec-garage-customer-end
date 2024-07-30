import { useState } from "react";
import CustomField from "../CustomField";
import ButtonSpinner from "../../Loaders/ButtonSpinner";

export default function TextFilter({ handleClosePopup, popupOption }) {
  const [values, setValues] = useState(popupOption?.selectedValue || [""]);

  const handleChange = (e) => {
    setValues([e.target.value]);
  };

  const [isPendingSubmit, setIsPendingSubmit] = useState(false);

  const handleSubmit = () => {
    handleClosePopup(values);
  };

  return (
    <div className={` pb-5`}>
      <CustomField
        defaultValue={values[0]}
        disable={false}
        fieldClassName={"w-full"}
        id={""}
        label={""}
        name={""}
        onChange={handleChange}
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
