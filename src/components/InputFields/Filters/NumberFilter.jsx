import { useEffect, useState } from "react";
import CustomField from "../CustomField";
import ButtonSpinner from "../../Loaders/ButtonSpinner";
import CustomNumberField from "../CustomNumberField";
import CustomMultiSelect from "../CustomMultiSelect";

export default function NumberFilter({ handleClosePopup, popupOption }) {
  const [values, setValues] = useState(popupOption?.selectedValue || [""]);
  const [selectedCondition, setSelectedCondition] = useState(
    popupOption?.selectedValue[0] || ""
  );
  const [selectedNumber, setSelectedNumber] = useState(
    popupOption?.selectedValue[1] || ""
  );
  const handleChange = (e) => {
    setSelectedNumber(e.target.value);
  };

  useEffect(() => {
    setValues([selectedCondition, selectedNumber]);
  }, [selectedCondition, selectedNumber]);

  useEffect(() => {
    console.log({ values });
  }, [values]);

  const [isPendingSubmit, setIsPendingSubmit] = useState(false);

  const handleSubmit = () => {
    handleClosePopup(values);
  };

  return (
    <div className={`pb-10 `}>
      <CustomMultiSelect
        options={[
          { id: 1, label: "=", value: "=" },
          { id: 2, label: ">=", value: ">=" },
          { id: 3, label: "<=", value: "<=" },
        ]}
        singleSelect
        defaultSelectedValues={[{ id: 1, label: "=", value: "=" }]}
        onSelect={(e) => {
          setSelectedCondition(e[0]?.value);
        }}
        isSearchEnabled={false}
      />
      {console.log({ popupOption })}
      <CustomNumberField
        defaultValue={selectedNumber}
        disable={false}
        fieldClassName={"w-full"}
        onChange={handleChange}
        placeholder={popupOption?.title}
        wrapperClassName={"w-full"}
      />

      <div className="mt-5 flex justify-end">
        <button
          disabled={values[0] === ""}
          onClick={handleSubmit}
          className="btn btn-sm w-1/2 btn-primary"
        >
          {isPendingSubmit ? <ButtonSpinner /> : "Apply"}
        </button>
      </div>
    </div>
  );
}
