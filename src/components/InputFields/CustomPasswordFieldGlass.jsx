import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function CustomPasswordFieldGlass({
  id,
  label,
  required = false,
  name,
  value,
  placeholder,
  onChange,
  error,
  defaultValue,
  wrapperClassName,
  fieldClassName,
  disabled,
  visibleBorder = false,
  labelClass = "",
  eyeToggleClass = "",
  dataCyInput,
  dataCyLabel,
  dataCyError,
}) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className={`${wrapperClassName}`}>
      {/* LABEL */}
      <label data-cy={dataCyLabel} htmlFor={id} className="label">
        <span className={`label-text text-md font-bold ${labelClass}`}>
          {label}{" "}
          {required && <span className="text-error font-bold text-md">*</span>}
        </span>
      </label>
      <div className={`w-full relative ${eyeToggleClass}`}>
        {isVisible ? (
          <AiOutlineEyeInvisible
            onClick={() => {
              setIsVisible(!isVisible);
            }}
            className="absolute text-white right-3 text-xl top-1/2 -translate-y-1/2"
          />
        ) : (
          <AiOutlineEye
            onClick={() => {
              setIsVisible(!isVisible);
            }}
            className="absolute text-white right-3 text-xl top-1/2 -translate-y-1/2"
          />
        )}
        <input
          data-cy={dataCyInput}
          id={id}
          // required
          disabled={disabled}
          onChange={onChange}
          type={isVisible ? "text" : "password"}
          defaultValue={defaultValue}
          value={value}
          name={name}
          placeholder={`${placeholder}${required && "*"}`}
          className={`bg-transparent placeholder:text-gray-300  text-white border-white focus:outline-none input rounded-md input-bordered  ${
            disabled &&
            `px-1 py-0 border ${
              visibleBorder && "disabled:border-gray-200 border-opacity-10 px-4"
            }`
          } ${fieldClassName}`}
        />
      </div>
      {/* VALIDATION MESSAGE  */}
      {error && (
        <label data-cy={dataCyError} className="label mt-4 h-7">
          <span className="label-text-alt text-red-300">{error}</span>
        </label>
      )}
    </div>
  );
}
