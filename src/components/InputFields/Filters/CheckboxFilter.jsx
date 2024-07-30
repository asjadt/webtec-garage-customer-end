import { useEffect, useState } from "react";
import ButtonSpinner from "../../Loaders/ButtonSpinner";

export default function CheckboxFilter({ handleClosePopup, popupOption }) {
  const [values, setValues] = useState(popupOption?.selectedValue || [""]);

  const handleCheckboxChange = (value) => {
    if (values.includes(value)) {
      setValues(values.filter((item) => item !== value)); // Remove value if already exists
    } else {
      setValues([...values.filter((v) => v !== ""), value]); // Add value if not exists
    }
  };

  const [isPendingSubmit, setIsPendingSubmit] = useState(false);

  const handleSubmit = () => {
    handleClosePopup(values);
  };

  useEffect(() => {
    console.log({
      values,
    });
  }, [values]);

  return (
    <div className={` pb-5`}>
      <div className="grid grid-cols-1 mt-1">
        {/* MALE  */}
        {popupOption?.availableValues.map((opt, index) => (
          <div
            key={index}
            className="form-control flex justify-start items-start w-full "
          >
            <label className="label cursor-pointer flex items-center gap-1">
              <input
                type="checkbox"
                name={popupOption?.title}
                onChange={() => handleCheckboxChange(opt.value)}
                checked={values.includes(opt?.value)}
                className="toggle toggle-xs sm:toggle-xs md:toggle-sm toggle-primary"
              />
              <span className="label-text">{opt?.label}</span>
            </label>
          </div>
        ))}
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
