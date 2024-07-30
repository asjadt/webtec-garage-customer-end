import PropTypes from "prop-types";
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";

export default function NumberFieldV2({
  control,
  id,
  name,
  label,
  min,
  max,
  maxLength,
  minLength,
  pattern,
  defaultValue = "", // Ensure a default value is set
  placeholder = "", // Default placeholder
  required = false,
  readOnly = false,
  disabled = false,
  visibleBorder = false,
  minLengthMessage,
  maxLengthMessage,
  patternMessage,
  requiredMessage,
  minMessage,
  maxMessage,
  onChange = (event) => event,
  errors,
  wrapperClassName,
  fieldClassName,
}) {
  return (
    <div className={`flex flex-col gap-y-2 ${wrapperClassName}`}>
      {/* LABEL */}
      {label && (
        <label data-cy={`shared-label-number-field-v2`} className="label">
          <span className={`label-text text-md font-bold`}>
            {label}{" "}
            {required && !disabled && (
              <span className="text-error font-bold text-md">*</span>
            )}
          </span>
        </label>
      )}

      {/* INPUT FIELD */}
      <Controller
        data-cy={`shared-controller-number-field-v2`}
        defaultValue={defaultValue}
        disabled={disabled}
        name={name}
        control={control}
        rules={{
          required: {
            value: required,
            message: requiredMessage || "Field is required",
          },
          min: {
            value: min,
            message: "Minimum value not met",
          },
          max: {
            value: max,
            message: "Maximum value exceeded",
          },
          maxLength: {
            value: maxLength,
            message: maxLengthMessage || "Maximum length exceeded",
          },
          minLength: {
            value: minLength,
            message: minLengthMessage || "Minimum length not met",
          },
          pattern: {
            value: pattern,
            message: patternMessage || "Invalid values",
          },
        }}
        render={({ field, fieldState: { invalid, error } }) => (
          <input
            {...field}
            type="number"
            id={id}
            onChange={(event) => {
              // Call the custom onChange prop
              onChange(event);
              // Call the field's onChange method
              field.onChange(event);
            }}
            value={field.value || ""} // Ensure value is never undefined
            placeholder={placeholder}
            aria-placeholder={placeholder} // Use aria-placeholder for accessibility
            aria-invalid={invalid}
            aria-describedby={error ? `${id}-error` : undefined}
            readOnly={readOnly}
            autoComplete="off" // Disable autocomplete
            spellCheck={false} // Disable spell checking
            autoFocus={false} // Don't auto-focus
            // className={`rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none ${
            //   invalid
            //     ? "border-red-500 focus:border-red-500"
            //     : "border-gray-300 focus:border-blue-500"
            // }`}
            className={`bg-base-300 input focus:outline-primary input-bordered
                ${
                  disabled &&
                  `px-1  ${
                    visibleBorder &&
                    "disabled:border-gray-200 border-opacity-10 px-4"
                  }`
                }  ${fieldClassName}
                 ${invalid ? "border-red-500 focus:border-red-500" : ""}
             `}
          />
        )}
      />

      {/* Error Message */}
      <ErrorMessage
        data-cy={`shared-error-message-number-field-v2`}
        errors={errors}
        name={name}
        render={({ message }) => (
          <label className="label h-7">
            <p
              id={`${id}-error`} // ID to link with input field's aria-describedby
              role="alert"
              aria-label="error message"
              aria-live="assertive" // Ensures screen readers announce the message immediately
              aria-atomic="true" // Ensures the whole message is read out
              className="label-text-alt text-error"
            >
              {message}
            </p>
          </label>
        )}
      />
    </div>
  );
}

NumberFieldV2.propTypes = {
  control: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  pattern: PropTypes.instanceOf(RegExp),
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  minLengthMessage: PropTypes.string,
  maxLengthMessage: PropTypes.string,
  patternMessage: PropTypes.string,
  onChange: PropTypes.func,
  errors: PropTypes.object,
};
