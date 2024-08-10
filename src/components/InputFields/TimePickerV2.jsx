import { useState } from "react";
import { OutsideClickHandler } from "../OutsideClickHandler";

export default function TimePickerV2({
  disabled = false,
  visibleBorder = true,
  fieldClassName = "",
}) {
  const [isOpenPicker, setIsOpenPicker] = useState(false);
  return (
    <OutsideClickHandler
      onOutsideClick={() => setIsOpenPicker(false)}
      className={``}
    >
      <input
        type="datetime"
        className={`bg-base-300 ${
          disabled
            ? `${visibleBorder && "disabled:border-gray-200 border-opacity-10"}`
            : ""
        } input rounded-md input-bordered w-full ${fieldClassName} flex focus-within:outline-primary`}
        name=""
        id=""
      />
    </OutsideClickHandler>
  );
}
