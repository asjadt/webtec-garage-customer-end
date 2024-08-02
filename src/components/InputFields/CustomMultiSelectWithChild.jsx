import React, { Fragment, useEffect, useState } from "react";
import { AiFillAlert } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
import { FiPlus, FiSearch } from "react-icons/fi";
import { TiTick } from "react-icons/ti";
import { OutsideClickHandler } from "../OutsideClickHandler";
import ButtonLoading from "../ButtonLoading";
import { MdOutlineChangeCircle } from "react-icons/md";
import { TfiExchangeVertical } from "react-icons/tfi";
import { IoInformationCircleSharp } from "react-icons/io5";
import truncateText from "../../utils/truncateText";
import toast from "react-hot-toast";
import CustomToaster from "../CustomToaster";
export default function CustomMultiSelectWithChild({
  options = [], // required []
  defaultSelectedValues = [], // []
  showCheckbox = true,
  loading = false,
  inputStyleClass = "",
  optionStyleClass = "",
  optionContainerClass = "",
  maxHeight = "max-h-[200px]",
  emptyRecordMsg = "No option found!",
  placeholder = "Search",
  onSelect = (e) => {
    return e;
  },
  onRemove = (e) => {
    return e;
  },
  onSearch = (e) => {
    return e;
  },
  singleSelect = false,
  caseSensitiveSearch = false,
  closeOnSelect = true,
  CustomCloseIcon = RxCrossCircled,
  CustomCheckIcon = TiTick,
  disable = false,
  required = false,
  addButtonLabel = "Select",
  AddButtonIcon = FiPlus,
  ChangeButtonIcon = TfiExchangeVertical,
  label,
  error,
  id,
  top = false,
  left = true,
  right = false,
  bottom = true,

  selectAllOption = false,

  addNewItemButton = false,
  onClickAddNewItemButton = () => {},
  hint = "",
  visibleBorder = false,
  isSearchEnabled = true,
  max = null,
  groupForeignKey = "parent_id",
  groups = [],
  size = "",
}) {
  // useEffect(() => {
  //   console.log({ defaultSelectedValues });
  // }, [defaultSelectedValues]);

  const [selectedValues, setSelectedValues] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [componentLoading, setComponentLoading] = useState(true);
  const [searchFieldValue, setSearchFieldValue] = useState("");

  const [isAllSelected, setIsAllSelected] = useState(
    options.length === selectedValues?.length
  );

  useEffect(() => {
    setComponentLoading(true);
    if (!loading) {
      setComponentLoading(true);
      setSelectedValues(defaultSelectedValues);
      setFilteredOptions(options);
      setComponentLoading(false);
    }
  }, [loading]);

  const [isFirstTime, setIsFirstTime] = useState(true);
  useEffect(() => {
    if (options.length > 0) {
      if (options.length === selectedValues?.length) {
        setIsAllSelected(true);
      } else {
        setIsAllSelected(false);
      }
    } else {
      setIsAllSelected(false);
    }
  }, [selectedValues]);

  //  SEARCH
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchFieldValue(searchTerm);
    setFilteredOptions(
      options.filter(
        (option) =>
          option.name &&
          option.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  useEffect(() => {
    if (!isOptionOpen) {
      setSearchFieldValue("");
      setFilteredOptions(
        options.filter(
          (option) =>
            option.name && option.name.toString().toLowerCase().includes("")
        )
      );
    }
  }, [isOptionOpen]);

  useEffect(() => {
    if (searchFieldValue !== "") {
      setIsOptionOpen(true);
    }
  }, [searchFieldValue]);

  return (
    <div data-cy={"container_custom_multi_select"} className="w-full relative">
      {/* LABEL */}
      <div
        data-cy={"label_container_custom_multi_select"}
        className="flex gap-5 items-center justify-between"
      >
        <div
          data-cy={"label_sub_container_custom_multi_select"}
          className={`flex items-center gap-2`}
        >
          {label ? (
            <label
              data-cy={"label_custom_multi_select"}
              htmlFor={id}
              className={`label`}
            >
              <span
                data-cy={"label_content_custom_multi_select"}
                className="label-text  text-md font-bold"
              >
                {label}{" "}
                {required && !disable && (
                  <span
                    data-cy={"label_required_custom_multi_select"}
                    className="text-error font-bold text-md"
                  >
                    *
                  </span>
                )}
              </span>
            </label>
          ) : (
            <></>
          )}

          {hint && (
            <div
              data-cy={"hint_container_custom_multi_select"}
              className={`dropdown ${right && "dropdown-start"} ${
                top && "dropdown-top"
              } ${bottom && "dropdown-bottom"}`}
            >
              <div
                data-cy={"hint_details_custom_multi_select"}
                tabIndex={0}
                role="button"
                title="info"
                className=" btn btn-circle btn-ghost btn-xs mt-1"
              >
                <IoInformationCircleSharp className={`text-primary text-xl `} />
              </div>
              <div
                data-cy={"_hint_label_container_custom_multi_select"}
                tabIndex={0}
                className="card compact dropdown-content z-[1] shadow-lg border border-primary-content shadow-primary-content bg-base-300 rounded-xl w-64"
              >
                <div
                  data-cy={"hint_label_custom_multi_select"}
                  tabIndex={0}
                  className="card-body"
                >
                  <h2
                    data-cy={"hint_label_content_custom_multi_select"}
                    className="card-title text-primary"
                  >
                    {label}
                  </h2>
                  <p data-cy={"hint_custom_multi_select"}> {hint}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        {selectAllOption ? (
          <div
            data-cy={"select_all_container_custom_multi_select"}
            className="mt-2 flex items-center gap-2"
          >
            <label
              data-cy={"select_all_label_custom_multi_select"}
              role="button"
              htmlFor=""
            >
              Select all
            </label>
            <input
              data-cy={"select_all_input_custom_multi_select"}
              id=""
              name=""
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedValues(options);
                } else {
                  setSelectedValues([]);
                }
              }}
              checked={isAllSelected}
              type="checkbox"
              className={`${size} checkbox checkbox-xs checkbox-primary mr-2`}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      {/* FIELD  */}
      <div
        data-cy={"field_container_custom_multi_select"}
        style={{ display: "flex" }}
        className={`relative z-10 ${
          disable
            ? `h-auto cursor-not-allowed  ${
                visibleBorder ? "border rounded-md border-opacity-10" : ""
              }`
            : `h-auto w-full input ${size} ${
                isOptionOpen ? "border-2 border-primary" : ""
              }  flex-wrap rounded-md bg-base-300 input-bordered outline-none focus:outline-none items-center px-1`
        }`}
      >
        {/* SELECTED OPTIONS  */}
        {!disable || selectedValues?.length !== 0 ? (
          selectedValues?.map((opt, index) => (
            <span
              data-cy={`selected_option_${index}_custom_multi_select`}
              onClick={() => {
                !disable && setIsOptionOpen(true);
              }}
              title={opt?.name}
              key={index}
              className={`bg-primary-content ${
                !disable && "cursor-pointer"
              } z-10 px-5 ${
                singleSelect ? " py-[0.3rem]" : " py-[0.25rem]"
              } rounded-md my-1 mx-1 inline-flex gap-2 items-center`}
            >
              {opt?.Icon && <opt.Icon />}{" "}
              {typeof opt?.name === "string" && truncateText(opt?.name, 20)}{" "}
              {!disable && (
                <button
                  data-cy={`selected_option_button_${index}_custom_multi_select`}
                  onClick={() => {
                    onSelect(
                      selectedValues?.filter((s_opt) => s_opt?.id !== opt?.id)
                    );
                    onRemove(
                      selectedValues?.filter((s_opt) => s_opt?.id !== opt?.id)
                    );
                    selectedValues?.filter((s_opt) => s_opt?.id !== opt?.id)
                      ?.length > 0 &&
                      closeOnSelect &&
                      singleSelect &&
                      setIsOptionOpen(false);
                    setFilteredOptions(options);
                    setSearchFieldValue("");

                    setSelectedValues(
                      selectedValues?.filter((s_opt) => s_opt?.id !== opt?.id)
                    );
                  }}
                >
                  <CustomCloseIcon
                    className={`text-red-500 hover:bg-red-500 rounded-full hover:text-base-300`}
                  />
                </button>
              )}
            </span>
          ))
        ) : (
          <span className={`text-gray-300 pl-2 pt-3`}>N/A</span>
        )}

        {disable ? (
          <div
            data-cy={`selected_option_disable_custom_multi_select`}
            onClick={() => {
              setIsOptionOpen(!isOptionOpen);
            }}
            className={`relative flex-1 min-w-[100px!important] ${
              singleSelect && selectedValues?.length > 0
                ? "h-[0.26rem]"
                : "h-11"
            } items-center text-gray-600`}
          >
            {singleSelect ? (
              <>
                {selectedValues?.length > 0 ? (
                  ""
                ) : (
                  <input
                    data-cy={`selected_option_disable_length_0+_input_custom_multi_select`}
                    type="text"
                    value={searchFieldValue}
                    onChange={handleSearch}
                    placeholder={placeholder}
                    disabled
                    className={`${size} w-full input-bordered outline-none bg-transparent px-2 h-full`}
                  />
                )}
              </>
            ) : (
              <input
                data-cy={`selected_option_disable_length_0_input_custom_multi_select`}
                disabled
                type="text"
                value={searchFieldValue}
                onChange={handleSearch}
                placeholder={placeholder}
                className={`${size} w-full input-bordered outline-none bg-transparent px-2 h-full`}
              />
            )}
          </div>
        ) : (
          <div
            data-cy={`selected_option_no_disable_custom_multi_select`}
            onClick={() => {
              setIsOptionOpen(!isOptionOpen);
            }}
            className={`relative flex-1 min-w-[100px!important] ${
              singleSelect && selectedValues?.length > 0
                ? "h-[0.26rem]"
                : "h-11"
            } items-center text-gray-600`}
          >
            {singleSelect ? (
              <>
                {selectedValues?.length > 0 ? (
                  ""
                ) : (
                  <input
                    data-cy={`selected_option_no_disable_single_select_input_custom_multi_select`}
                    onClick={() => {
                      setIsOptionOpen(!isOptionOpen);
                    }}
                    type="text"
                    value={searchFieldValue}
                    onChange={handleSearch}
                    placeholder={placeholder}
                    className={`${size} w-full input-bordered outline-none bg-transparent px-2 h-full`}
                  />
                )}
              </>
            ) : (
              <input
                data-cy={`selected_option_no_disable_multi_select_custom_multi_select`}
                onClick={() => {
                  setIsOptionOpen(!isOptionOpen);
                }}
                type="text"
                value={searchFieldValue}
                onChange={handleSearch}
                placeholder={placeholder}
                className={`${size} w-full input-bordered outline-none bg-transparent px-2 h-full`}
              />
            )}
          </div>
        )}
      </div>

      {/* OPTIONS  */}
      <OutsideClickHandler
        className={`absolute ${
          top ? "bottom-full -mb-7" : "top-full mt-2"
        } z-30 bg-base-300 duration-200 transition-all overflow-hidden  ${
          isOptionOpen ? "opacity-100 h-auto block" : "opacity-0 h-0 hidden"
        }  shadow-lg border-2 border-primary rounded-md w-full left-0`}
        onOutsideClick={() => {
          setIsOptionOpen(false);
        }}
      >
        <div
          data-cy={`options_container_custom_multi_select`}
          className={`overflow-y-auto px-0 py-0 overflow-x-hidden ${maxHeight}  scrollbar `}
        >
          {componentLoading ? (
            <div
              data-cy={`options_container_loading_custom_multi_select`}
              className="flex justify-center items-center py-5"
            >
              <ButtonLoading />
            </div>
          ) : filteredOptions.length > 0 ? (
            <>
              {groups?.length > 0 ? (
                <>
                  {groups
                    ?.filter((group) =>
                      filteredOptions?.some(
                        (opt) => opt[groupForeignKey] === group?.id
                      )
                    )
                    ?.map((group, index) => (
                      <Fragment key={index}>
                        <h3 className={`text-primary font-bold text-lg px-5`}>
                          {group?.name}
                        </h3>
                        {filteredOptions
                          ?.filter((opt) => opt[groupForeignKey] === group?.id)
                          ?.map((opt, index) => (
                            <Fragment key={index}>
                              <button
                                data-cy={`options_container_button_${index}_custom_multi_select`}
                                onClick={() => {
                                  if (
                                    selectedValues?.some(
                                      (s_opt) => s_opt?.id === opt?.id
                                    )
                                  ) {
                                    // IF ALREADY SELECTED
                                    onSelect(
                                      selectedValues?.filter(
                                        (s_opt) => s_opt?.id !== opt?.id
                                      )
                                    );
                                    onRemove(
                                      selectedValues?.filter(
                                        (s_opt) => s_opt?.id !== opt?.id
                                      )
                                    );
                                    selectedValues?.filter(
                                      (s_opt) => s_opt?.id !== opt?.id
                                    )?.length > 0 &&
                                      closeOnSelect &&
                                      singleSelect &&
                                      setIsOptionOpen(false);
                                    setFilteredOptions(options);
                                    setSearchFieldValue("");

                                    setSelectedValues(
                                      selectedValues?.filter(
                                        (s_opt) => s_opt?.id !== opt?.id
                                      )
                                    );
                                  } else {
                                    // IF NOT SELECTED
                                    if (!max) {
                                      if (singleSelect) {
                                        onSelect([opt]);
                                        onRemove([opt]);
                                        [opt]?.length > 0 &&
                                          closeOnSelect &&
                                          singleSelect &&
                                          setIsOptionOpen(false);
                                        setFilteredOptions(options);
                                        setSearchFieldValue("");

                                        setSelectedValues([opt]);
                                      } else {
                                        onSelect([...selectedValues, opt]);
                                        onRemove([...selectedValues, opt]);
                                        [...selectedValues, opt]?.length > 0 &&
                                          closeOnSelect &&
                                          singleSelect &&
                                          setIsOptionOpen(false);
                                        setFilteredOptions(options);
                                        setSearchFieldValue("");

                                        setSelectedValues([
                                          ...selectedValues,
                                          opt,
                                        ]);
                                      }
                                    } else {
                                      if (selectedValues?.length + 1 >= max) {
                                        setIsOptionOpen(false);
                                      }
                                      if (selectedValues?.length < max) {
                                        if (singleSelect) {
                                          onSelect([opt]);
                                          onRemove([opt]);
                                          [opt]?.length > 0 &&
                                            closeOnSelect &&
                                            singleSelect &&
                                            setIsOptionOpen(false);
                                          setFilteredOptions(options);
                                          setSearchFieldValue("");

                                          setSelectedValues([opt]);
                                        } else {
                                          onSelect([...selectedValues, opt]);
                                          onRemove([...selectedValues, opt]);
                                          [...selectedValues, opt]?.length >
                                            0 &&
                                            closeOnSelect &&
                                            singleSelect &&
                                            setIsOptionOpen(false);
                                          setFilteredOptions(options);
                                          setSearchFieldValue("");

                                          setSelectedValues([
                                            ...selectedValues,
                                            opt,
                                          ]);
                                        }
                                      } else {
                                        toast.custom((t) => (
                                          <CustomToaster
                                            t={t}
                                            type={"error"}
                                            text={`Maximum items exceeded!`}
                                          />
                                        ));
                                      }
                                    }
                                  }
                                }}
                                className={`px-5 py-1   justify-between w-full flex gap-2 items-center   ${
                                  showCheckbox &&
                                  selectedValues?.some(
                                    (s_opt) => s_opt?.id === opt?.id
                                  )
                                    ? "bg-primary text-base-300"
                                    : "hover:bg-primary-content"
                                }`}
                              >
                                <span className="inline-flex gap-2 items-center text-left w-full">
                                  {opt?.Icon && <opt.Icon />} {opt?.name}
                                </span>

                                {selectedValues?.some(
                                  (s_opt) => s_opt?.id === opt?.id
                                ) &&
                                  showCheckbox && (
                                    <CustomCheckIcon
                                      className={`${
                                        selectedValues?.some(
                                          (s_opt) => s_opt?.id === opt?.id
                                        )
                                          ? "text-base-300"
                                          : ""
                                      }`}
                                    />
                                  )}
                              </button>
                              {index + 1 < filteredOptions.length ? <hr /> : ""}
                            </Fragment>
                          ))}
                      </Fragment>
                    ))}
                </>
              ) : (
                <>
                  {filteredOptions.map((opt, index) => (
                    <Fragment key={index}>
                      <button
                        data-cy={`options_container_button_${index}_custom_multi_select`}
                        onClick={() => {
                          if (
                            selectedValues?.some(
                              (s_opt) => s_opt?.id === opt?.id
                            )
                          ) {
                            // IF ALREADY SELECTED
                            onSelect(
                              selectedValues?.filter(
                                (s_opt) => s_opt?.id !== opt?.id
                              )
                            );
                            onRemove(
                              selectedValues?.filter(
                                (s_opt) => s_opt?.id !== opt?.id
                              )
                            );
                            selectedValues?.filter(
                              (s_opt) => s_opt?.id !== opt?.id
                            )?.length > 0 &&
                              closeOnSelect &&
                              singleSelect &&
                              setIsOptionOpen(false);
                            setFilteredOptions(options);
                            setSearchFieldValue("");

                            setSelectedValues(
                              selectedValues?.filter(
                                (s_opt) => s_opt?.id !== opt?.id
                              )
                            );
                          } else {
                            // IF NOT SELECTED
                            if (!max) {
                              if (singleSelect) {
                                onSelect([opt]);
                                onRemove([opt]);
                                [opt]?.length > 0 &&
                                  closeOnSelect &&
                                  singleSelect &&
                                  setIsOptionOpen(false);
                                setFilteredOptions(options);
                                setSearchFieldValue("");

                                setSelectedValues([opt]);
                              } else {
                                onSelect([...selectedValues, opt]);
                                onRemove([...selectedValues, opt]);
                                [...selectedValues, opt]?.length > 0 &&
                                  closeOnSelect &&
                                  singleSelect &&
                                  setIsOptionOpen(false);
                                setFilteredOptions(options);
                                setSearchFieldValue("");

                                setSelectedValues([...selectedValues, opt]);
                              }
                            } else {
                              if (selectedValues?.length + 1 >= max) {
                                setIsOptionOpen(false);
                              }
                              if (selectedValues?.length < max) {
                                if (singleSelect) {
                                  onSelect([opt]);
                                  onRemove([opt]);
                                  [opt]?.length > 0 &&
                                    closeOnSelect &&
                                    singleSelect &&
                                    setIsOptionOpen(false);
                                  setFilteredOptions(options);
                                  setSearchFieldValue("");

                                  setSelectedValues([opt]);
                                } else {
                                  onSelect([...selectedValues, opt]);
                                  onRemove([...selectedValues, opt]);
                                  [...selectedValues, opt]?.length > 0 &&
                                    closeOnSelect &&
                                    singleSelect &&
                                    setIsOptionOpen(false);
                                  setFilteredOptions(options);
                                  setSearchFieldValue("");

                                  setSelectedValues([...selectedValues, opt]);
                                }
                              } else {
                                toast.custom((t) => (
                                  <CustomToaster
                                    t={t}
                                    type={"error"}
                                    text={`Maximum items exceeded!`}
                                  />
                                ));
                              }
                            }
                          }
                        }}
                        className={`px-5 py-1   justify-between w-full flex gap-2 items-center   ${
                          showCheckbox &&
                          selectedValues?.some((s_opt) => s_opt?.id === opt?.id)
                            ? "bg-primary text-base-300"
                            : "hover:bg-primary-content"
                        }`}
                      >
                        <span className="inline-flex gap-2 items-center text-left w-full">
                          {opt?.Icon && <opt.Icon />} {opt?.name}
                        </span>

                        {selectedValues?.some(
                          (s_opt) => s_opt?.id === opt?.id
                        ) &&
                          showCheckbox && (
                            <CustomCheckIcon
                              className={`${
                                selectedValues?.some(
                                  (s_opt) => s_opt?.id === opt?.id
                                )
                                  ? "text-base-300"
                                  : ""
                              }`}
                            />
                          )}
                      </button>
                      {index + 1 < filteredOptions.length ? <hr /> : ""}
                    </Fragment>
                  ))}
                </>
              )}
            </>
          ) : (
            <div
              data-cy={`options_container_empty_message_custom_multi_select`}
              className="flex justify-center items-center py-5"
            >
              <span
                data-cy={`options_container_empty_message_content_custom_multi_select`}
                className={`font-bold text-red-500`}
              >
                {emptyRecordMsg}
              </span>
            </div>
          )}
        </div>
        {addNewItemButton && (
          <button
            data-cy={`add_new_item_button_custom_multi_select`}
            onClick={onClickAddNewItemButton}
            className={`w-full border-t border-base-100 text-center bg-primary text-base-300 py-2 hover:bg-primary-focus`}
          >
            Add New
          </button>
        )}
      </OutsideClickHandler>

      {/* VALIDATION MESSAGE  */}
      {error && (
        <label
          data-cy={`error_label_custom_multi_select`}
          className="label h-7"
        >
          <span
            data-cy={`error_content_custom_multi_select`}
            className="label-text-alt text-error"
          >
            {error}
          </span>
        </label>
      )}
    </div>
  );
}
