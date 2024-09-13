import React, { useEffect, useRef, useState } from "react";
import { IoInformationCircleSharp } from "react-icons/io5";

export default function CustomFieldV2({
  patternErrorMsg = "",
  pattern = "",
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
  onBlur = () => {},
  hint = "",
  visibleBorder = false,
  labelClass = "",
  taskField,
  maxLength,
  minLength,
  dataAuto,
}) {
  const inputRef = useRef();

  // pattern = /^[A-Za-z\s]+$/

  const [regexError, setRegexError] = useState(error);

  const handleOnInput = () => {
    const regex = new RegExp(pattern);
    if (inputRef.current.value !== "") {
      if (!regex.test(inputRef.current.value)) {
        setRegexError(patternErrorMsg || "Pattern not matched");
      } else {
        setRegexError("");
      }
    }
  };

  useEffect(() => {
    setRegexError(error);
  }, [error]);
  return (
    <div data-auto={`container-${dataAuto}`} className={`${wrapperClassName}`}>
      {/* LABEL */}
      <div
        data-auto={`label-container${dataAuto}`}
        className={`flex items-center gap-2`}
      >
        {label && (
          <label htmlFor={id} className="label">
            <span
              data-auto={`label-${dataAuto}`}
              className={`label-text text-md font-bold ${labelClass}`}
            >
              {label}{" "}
              {label && required && !disable && (
                <span className="text-error font-bold text-md">*</span>
              )}
            </span>
          </label>
        )}
        {hint && (
          <div data-auto={`hint-${dataAuto}`} className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-ghost btn-xs"
            >
              <IoInformationCircleSharp className={`text-primary`} />
            </div>
            <div
              tabIndex={0}
              className="card compact dropdown-content z-[1] shadow-lg border border-primary-content shadow-primary-content bg-base-300 rounded-xl w-64"
            >
              <div tabIndex={0} className="card-body">
                <h2 className="card-title text-primary">{label}</h2>
                <p> {hint}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FIELD  */}
      <input
        data-auto={`${dataAuto}`}
        onInput={handleOnInput}
        ref={inputRef}
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
        className={`input bg-base-300 ${
          disable &&
          `px-1 py-0 border ${
            visibleBorder && "disabled:border-gray-200 border-opacity-10 px-4"
          }`
        }  focus:outline-primary rounded-md ${
          taskField ? "focus:input-bordered font-bold" : "input-bordered"
        } ${fieldClassName}`}
      />
      {/* VALIDATION MESSAGE  */}
      {(error || regexError) && (
        <label data-auto={`error-${dataAuto}`} className="label ">
          <span
            data-auto={`message-${dataAuto}`}
            className="label-text-alt text-error"
          >
            {error || regexError}
          </span>
        </label>
      )}
    </div>
  );
}
