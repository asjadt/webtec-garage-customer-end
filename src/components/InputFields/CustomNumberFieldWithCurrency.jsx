import { useEffect, useRef, useState } from "react";

export default function CustomNumberFieldWithCurrency({
  id,
  label,
  required,
  name,
  type = "number",
  value,
  defaultValue,
  placeholder,
  onChange,
  error = "",
  min,
  minMsg,
  max,
  maxLength,
  maxMsg,
  minLength,
  wrapperClassName,
  fieldClassName,
  currency = "£",
  disable = false,
  visibleBorder = false,
}) {
  const inputRef = useRef();
  const [validationError, setValidationError] = useState(error);

  // Input value change validation field
  const onInputChange = () => {
    const inputValue = inputRef.current.value;
    const min = Number(inputRef.current.min);
    const max = Number(inputRef.current.max);
    const maxLength =
      inputRef.current.maxLength !== -1 ? inputRef.current.maxLength : Infinity;

    if (inputValue === "") {
      setValidationError(error || "");
      return;
    }

    // Handle maxLength validation
    if (!!maxLength && inputValue.length > maxLength) {
      inputRef.current.value = inputValue.slice(0, maxLength);
    }

    // Handle number validations
    const numericValue = Number(inputRef.current.value);

    if (numericValue < 0) {
      setValidationError("Value cannot be negative");
    } else if (min && numericValue < min) {
      setValidationError(minMsg || "Value is too low");
    } else if (max && numericValue > max) {
      setValidationError(maxMsg || `Value exceeds ${max}`);
    } else {
      setValidationError("");
    }
  };

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
    };

    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
      }
    };

    const inputElement = inputRef.current;

    if (inputElement) {
      inputElement.addEventListener("wheel", handleWheel, { passive: false });
      inputElement.addEventListener("keydown", handleKeyDown, {
        passive: false,
      });

      return () => {
        inputElement.removeEventListener("wheel", handleWheel);
        inputElement.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  return (
    <div
      data-cy={"container_custom_number_field_with_currency"}
      className={`${wrapperClassName} `}
    >
      {/* LABEL */}
      <label
        data-cy={"label_container_custom_number_field_with_currency"}
        htmlFor={id}
        className="label"
      >
        <span
          data-cy={"label_content_custom_number_field_with_currency"}
          className="label-text text-md font-bold"
        >
          {label}{" "}
          {required && !disable && (
            <span
              data-cy={"label_required_custom_number_field_with_currency"}
              className="text-error font-bold text-md"
            >
              *
            </span>
          )}
        </span>
      </label>
      {/* FIELD  */}
      <div
        data-cy={"field_container_custom_number_field_with_currency"}
        className="w-full flex justify-center items-center "
      >
        <span
          data-cy={"currency_custom_number_field_with_currency"}
          className={`flex justify-center items-center h-[50px] w-[50px] ${
            disable ? "bg-primary" : "bg-primary"
          }  text-base-100 rounded-l-md`}
        >
          {currency}
        </span>
        <input
          data-cy={"input_custom_number_field_with_currency"}
          ref={inputRef}
          onInput={onInputChange}
          disabled={disable}
          id={id}
          onChange={onChange}
          value={value}
          defaultValue={defaultValue}
          type={type}
          name={name}
          min={min}
          max={max}
          maxLength={maxLength}
          minLength={minLength}
          placeholder={`${placeholder}${required ? "*" : ""}`}
          className={`bg-base-300 ${
            disable &&
            `px-1 py-0 border ${
              visibleBorder && "disabled:border-gray-200 border-opacity-10 px-4"
            }`
          } focus:outline-primary input rounded-r-md rounded-l-none focus:outline-none input-bordered ${fieldClassName}`}
        />
      </div>
      {/* VALIDATION MESSAGE  */}
      {(error || validationError) && (
        <label
          data-cy={"error_message_custom_number_field_with_currency"}
          className="label h-7"
        >
          <span
            data-cy={"error_content_custom_number_field_with_currency"}
            className="label-text-alt text-error"
          >
            {error || validationError}
          </span>
        </label>
      )}
    </div>
  );
}
