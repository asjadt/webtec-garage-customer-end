import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { Controller } from "react-hook-form";
import MultiSelectV2 from "./MultiSelectV2";
import { OctagonAlert } from "lucide-react";
import { FiPlus } from "react-icons/fi";

export default function ControllerMultiSelectV2({
  control,
  id,
  name,
  className,
  placeholder,
  options = [],
  singleSelect = true,
  closeMenuOnSelect = false,
  defaultValue = [],
  label = "Test",
  disable = false,
  addNewItem = true,
  handleAddNewItem = () => {},
  hintIcon = <OctagonAlert color="#000000" />,
  onHintIconClick = () => {},
  isClearable = false,
  isSearchable = true,
  isAllSelectable = false,
  required = false,
  isHintShow = false,
  visibleBorder = false,
  maxHeight = "max-h-[200px]",
  top = false,
  left = true,
  right = false,
  bottom = true,
  addButtonLabel = "Select",
  AddButtonIcon = FiPlus,
  onSelect = (event) => event,
  errors,
}) {
  return (
    <div>
      <Controller
        control={control}
        name={name}
        rules={{
          required: {
            value: true,
            message: "Employment Status is required",
          },
        }}
        render={({ field }) => (
          <MultiSelectV2
            {...field}
            className={className}
            placeholder={placeholder}
            options={options}
            singleSelect={singleSelect}
            closeMenuOnSelect={closeMenuOnSelect}
            defaultValue={defaultValue}
            label={label}
            disable={disable}
            addNewItem={addNewItem}
            handleAddNewItem={handleAddNewItem}
            hintIcon={hintIcon}
            onHintIconClick={onHintIconClick}
            isClearable={isClearable}
            isSearchable={isSearchable}
            isAllSelectable={isAllSelectable}
            required={required}
            isHintShow={isHintShow}
            visibleBorder={visibleBorder}
            maxHeight={maxHeight}
            top={top}
            left={left}
            right={right}
            bottom={bottom}
            addButtonLabel={addButtonLabel}
            AddButtonIcon={AddButtonIcon}
            onSelect={onSelect}
          />
        )}
      />
      {/* Error Message */}
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <label className="label h-7">
            <p
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
