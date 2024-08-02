// ===========================================
// #00122
// ===========================================

import React, { Fragment, useState } from "react";
import { BiError } from "react-icons/bi";
import Pagination from "./Pagination";
import CustomPerPageSelector from "./CustomPerPageSelector";
import CustomDropDownForTable from "./CustomDropDownForTable";
import CustomLoading from "./CustomLoading";
import { checkPermissions } from "../utils/checkPermissions";

export default function Table({
  getFullDataToActionHandler = false,
  rows,
  cols,
  isLoading,
  actions = [],
  isFullActionList = true,
  itemsPerPage,
  totalItems,
  onChangePage,
  setPerPage,
  perPage,
  selectedIds,
  setSelectedIds,
  checkBoxes = false,
  minWidth = "900px",
  header = true,
  tableHeaderClass = "bg-base-100",
  col1Width = "w-[30%]",
  col2Width = "w-[70%]",
}) {
  const [allChecked, setAllChecked] = useState(false);

  const permissions = localStorage.getItem("permissions");

  const handleTickAll = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setSelectedIds(rows.map((d) => parseInt(d.id)));
      setAllChecked(true);
    } else {
      setSelectedIds([]);
      setAllChecked(false);
    }
  };

  const handleTick = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setSelectedIds([...selectedIds, parseInt(value)]);
    } else {
      setSelectedIds(
        selectedIds.filter((single_id) => single_id !== parseInt(value))
      );
      setAllChecked(false);
    }
  };

  const htmlMode = document.documentElement.getAttribute("data-theme");

  return (
    <div
      data-cy={"container_table"}
      className={`overflow-x-auto scrollbarX  top-0 w-full bg-base-200 md:bg-base-200 min-h-[300px]`}
    >
      {/* FOR DESKTOP VIEW  */}
      <table
        data-cy={"desktop_view_container_table"}
        className="hidden md:table gap-2 rounded-xl "
      >
        {header ? (
          <thead
            data-cy={"desktop_view_table_head_table"}
            className={`${tableHeaderClass} border-b-2 border-primary-content bg-primary `}
          >
            <tr
              data-cy={"desktop_view_table_head_table_row_table"}
              className="h-16 text-base-300 border-b border-primary-content"
            >
              {checkBoxes ? (
                <th
                  data-cy={"desktop_view_table_head_table_row_table_head_table"}
                  style={{
                    width: `1%`,
                  }}
                  className=" px-8"
                >
                  <label
                    data-cy={
                      "desktop_view_table_head_table_row_table_head_label_table"
                    }
                  >
                    <input
                      data-cy={
                        "desktop_view_table_head_table_row_table_head_input_table"
                      }
                      checked={
                        allChecked ||
                        (selectedIds?.length === rows?.length &&
                          selectedIds?.length !== 0)
                      }
                      onClick={handleTickAll}
                      onChange={() => {}}
                      type="checkbox"
                      className={`checkbox checkbox-primary`}
                    />
                  </label>
                </th>
              ) : (
                ""
              )}
              <th
                data-cy={"desktop_view_table_head_table_row_table_head2_table"}
                style={{
                  width: `1%`,
                }}
                className="px-5"
              >
                <div
                  data-cy={
                    "desktop_view_table_head_table_row_table_head_div_table"
                  }
                  className="flex flex-col items-start justify-start gap-2"
                ></div>
              </th>
              {cols.map((th, i) => (
                <Fragment key={i}>
                  {th?.show ? (
                    <th
                      data-cy={
                        "desktop_view_table_head_table_row_table_head_cols_table"
                      }
                      className={`px-5 ${
                        th?.isMainField ? "table-cell" : "hidden"
                      } md:table-cell`}
                      style={{
                        width: `${th?.minWidth}%`,
                        textAlign: th?.align ? th?.align : `left`,
                      }}
                    >
                      <div
                        data-cy={
                          "desktop_view_table_head_table_row_table_head_cols_content_table"
                        }
                        className={`flex flex-col text-center  ${
                          th?.align === "center"
                            ? "items-center"
                            : "items-start"
                        }  justify-start gap-2 font-semibold`}
                      >
                        {th?.name.slice(0, 1).toUpperCase() + th?.name.slice(1)}{" "}
                      </div>
                    </th>
                  ) : (
                    ""
                  )}
                </Fragment>
              ))}

              {actions.length > 0 ? (
                <th
                  data-cy={
                    "desktop_view_table_head_table_row_table_head_actions_table"
                  }
                  style={{
                    minWidth: "1%",
                    paddingRight: "20px",
                  }}
                >
                  <div
                    data-cy={
                      "desktop_view_table_head_table_row_table_head_action_content_container_table"
                    }
                    className="flex items-center justify-end"
                  >
                    <span
                      data-cy={
                        "desktop_view_table_head_table_row_table_head_action_content_table"
                      }
                    >
                      Actions
                    </span>
                  </div>
                </th>
              ) : (
                ""
              )}
            </tr>
          </thead>
        ) : (
          ""
        )}

        <tbody data-cy={"desktop_view_table_body_table"} className="">
          {!isLoading ? (
            rows && rows?.length > 0 ? (
              rows.map((data, i) => (
                <tr
                  data-cy={"desktop_view_table_body_row_table"}
                  key={i}
                  className={`border-b ${
                    i % 2 === 1 ? "bg-base-100" : "bg-base-300"
                  } border-primary-content  h-16 hover:bg-base-100 text-neutral group tableRowAdmin hover:overflow-hidden`}
                >
                  {checkBoxes ? (
                    <td
                      data-cy={
                        "desktop_view_table_body_row_checkbox_container_table"
                      }
                      className="w-[50px] px-8"
                    >
                      <label
                        data-cy={
                          "desktop_view_table_body_row_checkbox_label_table"
                        }
                      >
                        <input
                          data-cy={
                            "desktop_view_table_body_row_checkbox_input_table"
                          }
                          checked={allChecked || selectedIds.includes(data.id)}
                          value={data?.id}
                          onClick={handleTick}
                          onChange={() => {}}
                          type="checkbox"
                          className="checkbox checkbox-primary"
                        />
                      </label>
                    </td>
                  ) : (
                    ""
                  )}
                  <td
                    data-cy={"desktop_view_table_body_row_count_table"}
                    key={i}
                    style={{
                      minWidth: "1%",
                    }}
                    className="px-5"
                  >
                    <span
                      data-cy={
                        "desktop_view_table_body_row_count_content_table"
                      }
                    >
                      {i + 1}
                    </span>
                  </td>

                  {cols.map((col, j) => (
                    <Fragment key={j}>
                      {col?.show ? (
                        <td
                          data-cy={"desktop_view_table_body_row_cols_table"}
                          style={{
                            width: `${col?.minWidth}%`,
                          }}
                          key={j}
                          className={`px-5 ${
                            col?.isMainField ? "table-cell" : "hidden"
                          } ${
                            col?.align === "center" && "text-center"
                          } md:table-cell ${
                            col?.wrap ? "overflow-wrap-anywhere" : ""
                          }`}
                        >
                          {data[col?.attribute_name]}
                        </td>
                      ) : (
                        ""
                      )}
                    </Fragment>
                  ))}

                  {actions?.length > 0 ? (
                    <td
                      data-cy={"desktop_view_table_body_row_actions_table"}
                      style={{
                        width: "1%",
                        paddingRight: "20px",
                      }}
                      className="text-right"
                    >
                      {!isFullActionList ? (
                        <CustomDropDownForTable
                          getFullDataToActionHandler={
                            getFullDataToActionHandler
                          }
                          isDeleteDisabled={data?.is_system_default}
                          disabled={selectedIds.length > 1}
                          fullData={rows}
                          index={i}
                          isDataLoading={isLoading}
                          isShareDataLoading={isLoading}
                          data={data}
                          actions={actions}
                        />
                      ) : (
                        <span
                          data-cy={
                            "desktop_view_table_body_row_actions_action_table"
                          }
                          className="flex gap-5 justify-end items-center"
                        >
                          {actions
                            .filter((action) => {
                              return !action.disabledOn.some((disable) => {
                                const conditionValue =
                                  data[disable.attributeName];
                                return conditionValue === disable.value;
                              });
                            })
                            .slice(0, 3)
                            .map((action, index) => (
                              <Fragment key={index}>
                                {action.permissions ? (
                                  <button
                                    onClick={() =>
                                      action.handler(
                                        getFullDataToActionHandler
                                          ? data
                                          : data?.id
                                      )
                                    }
                                    data-tip={action.name}
                                    className={`tooltip ${
                                      action === actions[actions.length - 1]
                                        ? "tooltip-left"
                                        : "tooltip-top"
                                    } tooltip-primary`}
                                    key={index}
                                  >
                                    <action.Icon
                                      className={`text-xl ${
                                        action.name === "delete"
                                          ? " text-red-500"
                                          : "text-primary"
                                      }`}
                                    />
                                  </button>
                                ) : (
                                  ""
                                )}
                              </Fragment>
                            ))}

                          {actions.length > 3 ? (
                            <CustomDropDownForTable
                              isDeleteDisabled={data?.is_system_default}
                              disabled={selectedIds.length > 1}
                              fullData={rows}
                              index={i}
                              isDataLoading={isLoading}
                              isShareDataLoading={isLoading}
                              data={data}
                              actions={actions
                                .filter((action) => {
                                  return !action.disabledOn.some((disable) => {
                                    const conditionValue =
                                      data[disable.attributeName];
                                    return conditionValue === disable.value;
                                  });
                                })
                                .slice(3)}
                            />
                          ) : (
                            ""
                          )}
                        </span>
                      )}
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
              ))
            ) : (
              <tr data-cy={"desktop_view_nothing_found_container_table"}>
                <td
                  data-cy={"desktop_view_nothing_found_sub_container_table"}
                  className="text-center py-5 bg-base-200"
                  colSpan={cols?.length + 4}
                >
                  {/* FOR DEFAULT LIGHT THEME  */}
                  <div
                    data-cy={"desktop_view_nothing_found_start_table"}
                    className="flex justify-center items-center flex-col"
                  >
                    <div
                      data-cy={"desktop_view_nothing_found_table"}
                      className="w-[200px] flex flex-col gap-2 justify-center items-center"
                    >
                      <img
                        data-cy={"desktop_view_nothing_found_image_table"}
                        className="w-20"
                        src="/assets/nodatafound.svg"
                        alt="no data found"
                      />
                      <div
                        data-cy={
                          "desktop_view_nothing_found_content_container_table"
                        }
                      >
                        <h4
                          data-cy={"desktop_view_nothing_found_text_table"}
                          className="font-medium text-lg"
                        >
                          Nothing Found!
                        </h4>
                        <p
                          data-cy={"desktop_view_add_content_table"}
                          className="font-light"
                        >
                          Please add a new entity to see the content here. Thank
                          you!
                        </p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            )
          ) : (
            <tr data-cy={"desktop_view_loading_spinner_container_table"}>
              <td
                data-cy={"desktop_view_loading_spinner_sub_container_table"}
                className="text-center py-5"
                colSpan={cols?.length + 4}
              >
                <span
                  data-cy={"desktop_view_loading_spinner_table"}
                  className="loading loading-spinner text-primary loading-lg"
                ></span>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* FOR MOBILE VIEW  */}
      <div
        data-cy={"mobile_view_container_table"}
        className={`w-full block md:hidden `}
      >
        {!isLoading ? (
          rows?.length > 0 ? (
            <div
              data-cy={"mobile_view_rows_table"}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-0 bg-base-200 "
            >
              {rows?.map((data, i) => (
                <div
                  data-cy={"mobile_view_rows_container_table"}
                  key={i}
                  className="p-5 my-2 rounded-xl bg-base-300 border border-primary-content shadow-md shadow-primary-content flex flex-col overflow-auto scrollbar-none"
                >
                  <div
                    data-cy={"mobile_view_actions_container_table"}
                    className={`w-full flex justify-center pt-1 pb-5`}
                  >
                    {actions?.length > 0 ? (
                      <td
                        data-cy={"mobile_view_actions_sub_container_table"}
                        className="text-right p-0"
                      >
                        {!isFullActionList ? (
                          <CustomDropDownForTable
                            isDeleteDisabled={data?.is_system_default}
                            disabled={selectedIds.length > 1}
                            fullData={rows}
                            index={i}
                            isDataLoading={isLoading}
                            isShareDataLoading={isLoading}
                            data={data}
                            actions={actions}
                          />
                        ) : (
                          <div
                            data-cy={"mobile_view_actions_table"}
                            className="flex gap-2 justify-end items-center"
                          >
                            {actions
                              .filter((action) => {
                                return !action.disabledOn.some((disable) => {
                                  const conditionValue =
                                    data[disable.attributeName];
                                  return conditionValue === disable.value;
                                });
                              })
                              .map((action, index) => (
                                <React.Fragment key={index}>
                                  {action.permissions ? (
                                    <button
                                      data-cy={
                                        "mobile_view_actions_button_table"
                                      }
                                      onClick={() =>
                                        action.handler(
                                          getFullDataToActionHandler
                                            ? data
                                            : data?.id
                                        )
                                      }
                                      data-tip={action.name}
                                      className={`tooltip tooltip-bottom tooltip-primary`}
                                      key={index}
                                    >
                                      <action.Icon
                                        className={`text-xl ${
                                          action.name === "delete"
                                            ? " text-red-500"
                                            : "text-primary"
                                        }`}
                                      />
                                    </button>
                                  ) : (
                                    ""
                                  )}
                                </React.Fragment>
                              ))}
                          </div>
                        )}
                      </td>
                    ) : (
                      ""
                    )}
                  </div>
                  {/* DATA  */}
                  <table
                    data-cy={"mobile_view_table_table"}
                    className="table w-full "
                  >
                    <tbody data-cy={"mobile_view_table_body_table"}>
                      {cols.map((col, j) => (
                        <Fragment key={j}>
                          {col?.show ? (
                            <>
                              {data[col?.attribute_name] ? (
                                <tr
                                  data-cy={"mobile_view_cols_tr_table"}
                                  key={j}
                                  className={`px-5 border-y border-primary-content w-full`}
                                >
                                  <td
                                    data-cy={"mobile_view_cols_td_table"}
                                    className={`font-bold border border-primary-content text-primary ${col1Width}`}
                                  >
                                    {col.name}:
                                  </td>
                                  <td
                                    data-cy={"mobile_view_cols_td2_table"}
                                    className={`border border-primary-content overflow-wrap-anywhere ${col2Width}`}
                                  >
                                    {data[col?.attribute_name]}
                                  </td>
                                </tr>
                              ) : (
                                ""
                              )}
                            </>
                          ) : (
                            ""
                          )}
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ) : (
            <div
              data-cy={"mobile_view_no_data_container_table"}
              className="flex justify-center items-center flex-col bg-base-200 p-5  rounded-xl"
            >
              <div
                data-cy={"mobile_view_no_data_sub_container_table"}
                className="w-[200px] flex flex-col gap-2 justify-center items-center"
              >
                <img
                  data-cy={"mobile_view_no_data_image_table"}
                  className="w-20"
                  src="/assets/nodatafound.svg"
                  alt="no data found"
                />
                <div
                  data-cy={"mobile_view_no_data_message_container_table"}
                  className={`flex justify-center items-center flex-col`}
                >
                  <h4
                    data-cy={"mobile_view_no_data_message_content_table"}
                    className="font-medium text-lg text-center"
                  >
                    Nothing Found!
                  </h4>
                  <p
                    data-cy={"mobile_view_no_data_message_sub_content_table"}
                    className="font-light text-center"
                  >
                    Please add a new entity to see the content here. Thank you!
                  </p>
                </div>
              </div>
            </div>
          )
        ) : (
          <CustomLoading h={"h-[40vh]"} />
        )}
      </div>
    </div>
  );
}
