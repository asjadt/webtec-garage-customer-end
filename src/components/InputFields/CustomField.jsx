import React, { useEffect, useRef, useState } from "react";
import { IoInformationCircleSharp } from "react-icons/io5";

export default function CustomField({
  pattern,
  id,
  label,
  required = false,
  type,
  name,
  value,
  placeholder,
  onChange,
  error,
  defaultValue,
  disable = false,
  wrapperClassName,
  fieldClassName,
  onBlur = () => { },
  hint = "",
  visibleBorder = false,
  labelClass = "",
  taskField,
  maxLength,
  minLength,
  patternErrorMsg,
}) {
  const inputRef = useRef();

  // pattern = /^[A-Za-z\s]+$/

  const [validationError, setValidationError] = useState('');

  const handleOnInput = () => {
    const regex = new RegExp(pattern);
    if (inputRef.current.value !== "") {
      if (!regex.test(inputRef.current.value)) {
        setValidationError(patternErrorMsg || "Pattern not matched");
      } else {
        setValidationError("");
      }
    }
  };

  useEffect(() => {
    setValidationError(error);
  }, [error]);
  return (
    <div data-cy={"container_custom_field"} className={`${wrapperClassName}`}>
      {/* LABEL */}
      <div
        data-cy={"label_hint_container_custom_field"}
        className={`flex items-center gap-2`}
      >
        {label && (
          <label
            data-cy={"label_container_custom_field"}
            htmlFor={id}
            className="label"
          >
            <span
              data-cy={"label_content_custom_field"}
              className={`label-text text-md font-bold ${labelClass}`}
            >
              {label}{" "}
              {label && required && !disable && (
                <span
                  data-cy={"label_required_custom_field"}
                  className="text-error font-bold text-md"
                >
                  *
                </span>
              )}
            </span>
          </label>
        )}
        {hint && (
          <div
            data-cy={"hint_container_custom_field"}
            className="dropdown dropdown-end"
          >
            <div
              data-cy={"hint_header_custom_field"}
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-ghost btn-xs"
            >
              <IoInformationCircleSharp className={`text-primary`} />
            </div>
            <div
              data-cy={"hint_body_container_custom_field"}
              tabIndex={0}
              className="card compact dropdown-content z-[1] shadow-lg border border-primary-content shadow-primary-content bg-base-300 rounded-xl w-64"
            >
              <div
                data-cy={"hint_body_custom_field"}
                tabIndex={0}
                className="card-body"
              >
                <h2
                  data-cy={"hint_label_custom_field"}
                  className="card-title text-primary"
                >
                  {label}
                </h2>
                <p data-cy={"hint_custom_field"}> {hint}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FIELD  */}
      <input
        ref={inputRef}
        onInput={handleOnInput}
        data-cy={"input_custom_field"}
        onInvalidCapture={() => {
          console.log("his");
        }}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        disabled={disable}
        id={id}
        onChange={onChange}
        value={value}
        type={type}
        name={name}
        onBlur={onBlur}
        defaultValue={defaultValue}
        placeholder={`${placeholder}${required ? (taskField ? "" : "*") : ""}`}
        className={`input bg-base-300

        ${disable &&
          `px-1 py-0 border ${visibleBorder && "disabled:border-gray-200 border-opacity-10 px-4"
          }`
          }  focus:outline-primary rounded-md ${taskField ? "focus:input-bordered font-bold" : "input-bordered"
          } ${fieldClassName}`}
      />
      {/* VALIDATION MESSAGE  */}
      {validationError && (
        <label data-cy={"error_label_custom_field"} className="label">
          <span
            data-cy={"error_content_custom_field"}
            className="label-text-alt text-error"
          >
            {validationError}
          </span>
        </label>
      )}
    </div>
  );
}
