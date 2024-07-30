import React from "react";

export default function CustomSingleFileField({
  id,
  label,
  required = false,
  name,
  value,
  placeholder,
  onChange,
  error,
  defaultValue,
  disable,
  wrapperClassName,
  fieldClassName,
  accept,

  // FILE UPLOADING
  isFileUploading = false,

  fileName,
}) {
  // const handleUploadButtonClick = () => {
  //   const fileInput = document.createElement("customSingleFileUpload");
  //   fileInput.type = "file";
  //   fileInput.click();
  // };

  return (
    <div className={`${wrapperClassName}`}>
      {/* LABEL */}
      <label htmlFor={id} className="label flex justify-between">
        <span
          className={`label-text text-md font-bold ${
            disable && "text-gray-500"
          }`}
        >
          {label}{" "}
          {required && <span className="text-error font-bold text-md">*</span>}
        </span>
        {isFileUploading ? (
          <>
            <span className="loading loading-spinner text-primary loading-md"></span>
          </>
        ) : (
          <></>
        )}
      </label>
      {/* FIELD  */}
      <input
        id="customSingleFileUpload"
        // style={{ display: "none" }}
        disabled={disable}
        onChange={onChange}
        // value={value}
        type="file"
        accept={accept}
        name={name}
        defaultValue={defaultValue}
        placeholder={`${placeholder}${required ? "*" : ""}`}
        className="file-input file-input-bordered file-input-primary w-full ${fieldClassName}"
      />
      {/* <button onClick={handleUploadButtonClick}>Upload {fileName}</button> */}
      {/* VALIDATION MESSAGE  */}
      {error && (
        <label className="label h-7">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
}
