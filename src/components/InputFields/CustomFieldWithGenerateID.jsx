import React, { useEffect, useState } from "react";
import { FaGears } from "react-icons/fa6";
import ButtonLoading from "../ButtonLoading";
import toast from "react-hot-toast";
import CustomToaster from "../CustomToaster";
import { handleApiError } from "../../utils/apiErrorHandler";

export default function CustomFieldWithGenerateID({
  id,
  label,
  required = false,
  type,
  name,
  value,
  idGenerateFunc = () => {},
  placeholder,
  onChange,
  error,
  defaultValue,
  disable,
  setFormData,
  formData,
  wrapperClassName,
  fieldClassName,
  toolTip = "Generate ID",
  idField,
  initialCall = true,
  onIdChange = (e) => {
    return e;
  },
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [employeeID, setEmployeeID] = useState("");
  useEffect(() => {
    if (initialCall && !value) {
      setIsLoading(true);
      idGenerateFunc()
        .then((res) => {
          setEmployeeID(res.user_id);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          handleApiError(error, "#00119");
        });
    }
  }, []);

  useEffect(() => {
    onIdChange(employeeID);
  }, [employeeID]);
  return (
    <div
      data-cy={"container_custom_field_with_generate_id"}
      className={`relative ${wrapperClassName}`}
    >
      {/* LABEL */}
      <label
        data-cy={"label_custom_field_with_generate_id"}
        htmlFor={id}
        className="label"
      >
        <span
          data-cy={"label_content_custom_field_with_generate_id"}
          className="label-text text-md font-bold"
        >
          {label}{" "}
          {required && (
            <span
              data-cy={"label_required_custom_field_with_generate_id"}
              className="text-error font-bold text-md"
            >
              *
            </span>
          )}
        </span>
      </label>
      {/* FIELD  */}
      <button
        data-cy={"button_field_custom_field_with_generate_id"}
        disabled={isLoading}
        data-tip={toolTip}
        className="absolute tooltip group tooltip-primary w-12 right-0 text-2xl rounded-r-md flex justify-center items-center h-12 bg-primary text-base-300"
        onClick={() => {
          setIsLoading(true);
          idGenerateFunc()
            .then((res) => {
              setFormData({ ...formData, [idField]: res?.user_id });
              setIsLoading(false);
            })
            .catch((error) => {
              setIsLoading(false);

              handleApiError(error, "#00119");
            });
        }}
      >
        {isLoading ? (
          <span
            data-cy={"loading_custom_field_with_generate_id"}
            className="loading loading-bars text-base-300"
          />
        ) : (
          <FaGears className="group-hover:scale-125 duration-150 transition-all" />
        )}
      </button>
      <input
        data-cy={"input_field_custom_field_with_generate_id"}
        id={id}
        onChange={onChange}
        value={value}
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={`${placeholder}${required ? "*" : ""}`}
        className={`input bg-base-300  focus:outline-primary mr-12 focus:outline-none rounded-r-none rounded-l-md input-bordered ${fieldClassName}`}
      />
      {/* VALIDATION MESSAGE  */}
      {error && (
        <label
          data-cy={"error_message_custom_field_with_generate_id"}
          className="label h-7"
        >
          <span
            data-cy={"error_content_custom_field_with_generate_id"}
            className="label-text-alt text-error"
          >
            {error}
          </span>
        </label>
      )}
    </div>
  );
}
