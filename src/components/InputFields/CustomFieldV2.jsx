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
    <div
      data-cy={"container_custom_field_v2"}
      className={`${wrapperClassName}`}
    >
      {/* LABEL */}
      <div
        data-cy={"label_container_custom_field_v2"}
        className={`flex items-center gap-2`}
      >
        {label && (
          <label
            data-cy={"is_label_custom_field_v2"}
            htmlFor={id}
            className="label"
          >
            <span
              data-cy={"is_label_content_custom_field_v2"}
              className={`label-text text-md font-bold ${labelClass}`}
            >
              {label}{" "}
              {label && required && !disable && (
                <span
                  data-cy={"is_label_content_required_custom_field_v2"}
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
            data-cy={"hint_container_custom_field_v2"}
            className="dropdown dropdown-end"
          >
            <div
              data-cy={"hint_head_custom_field_v2"}
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-ghost btn-xs"
            >
              <IoInformationCircleSharp className={`text-primary`} />
            </div>
            <div
              data-cy={"hint_body_container_custom_field_v2"}
              tabIndex={0}
              className="card compact dropdown-content z-[1] shadow-lg border border-primary-content shadow-primary-content bg-base-300 rounded-xl w-64"
            >
              <div
                data-cy={"hint_body_custom_field_v2"}
                tabIndex={0}
                className="card-body"
              >
                <h2
                  data-cy={"hint_label_custom_field_v2"}
                  className="card-title text-primary"
                >
                  {label}
                </h2>
                <p data-cy={"hint_custom_field_v2"}> {hint}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FIELD  */}
      <input
        data-cy={"input_custom_field_v2"}
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
      {console.log({ error })}
      {/* VALIDATION MESSAGE  */}
      {(error || regexError) && (
        <label data-cy={"error_message_custom_field_v2"} className="label ">
          <span
            data-cy={"error_content_custom_field_v2"}
            className="label-text-alt text-error"
          >
            {error || regexError}
          </span>
        </label>
      )}
    </div>
  );
}
