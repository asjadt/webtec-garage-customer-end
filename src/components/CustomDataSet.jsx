import React from "react";
import { CgMenuMotion } from "react-icons/cg";

export default function CustomDataSet({
  cols,
  setCols,
  top = false,
  bottom = true,
  left = false,
  right = false,
}) {
  const handleCheckChange = (event) => {
    const { name, checked } = event.target;

    setCols((prevCols) =>
      prevCols.map((col) =>
        col.name === name ? { ...col, show: checked } : col
      )
    );
  };
  return (
    <details
      data-cy={"container_custom_dataset"}
      data-tip="Dataset"
      className={`dropdown hidden md:block tooltip tooltip-primary ${
        bottom && "tooltip-bottom"
      } ${top && "tooltip-top"} ${right && "tooltip-right"} ${
        left && "tooltip-left"
      } w-10 mt-1`}
    >
      <summary
        data-cy={"menu_custom_dataset"}
        className="bg-primary px-2 py-1 rounded-lg  tooltip tooltip-primary tooltip-bottom"
      >
        {" "}
        <CgMenuMotion className="text-2xl text-base-300" />
      </summary>
      <ul
        data-cy={"columns_container_custom_dataset"}
        className="p-2 shadow menu dropdown-content z-[1] bg-base-200 rounded-box w-52"
      >
        {cols.map((col, i) => (
          <li data-cy={"column_list_custom_dataset"} key={i}>
            <div
              data-cy={"column_container_custom_dataset"}
              className="flex justify-between"
            >
              <span data-cy={"column_name_custom_dataset"}>
                {col.name.toUpperCase()}
              </span>
              <input
                data-cy={"column_input_custom_dataset"}
                onChange={handleCheckChange}
                type="checkbox"
                name={col?.name}
                disabled={
                  cols.filter((col) => col.show).length === 1 && col.show
                }
                className="toggle toggle-xs toggle-primary"
                defaultChecked={col?.show}
              />
            </div>
          </li>
        ))}
      </ul>
    </details>
  );
}
