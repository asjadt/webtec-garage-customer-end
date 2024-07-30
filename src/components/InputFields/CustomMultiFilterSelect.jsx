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
import CustomPopup from "../CustomPopup";
import TextFilter from "./Filters/TextFilter";
import NumberFilter from "./Filters/NumberFilter";
import CustomPopupForFilter from "../CustomPopupForFilter";
import DateWithRangeFilter from "./Filters/DateWithRangeFilter";
import CheckboxFilter from "./Filters/CheckboxFilter";
import RadioFilter from "./Filters/RadioFilter";
import DateWithoutRangeFilter from "./Filters/DateWithoutRangeFilter";
import MultiSelectFilter from "./Filters/MultiSelectFilter";
import SingleSelectFilter from "./Filters/SingleSelectFilter";
import { TbFilter } from "react-icons/tb";
export default function CustomMultiFilterSelect({
  options = [], // required []
  defaultSelectedValues = [], // []
  showCheckbox = true,
  loading = false,
  inputStyleClass = "",
  optionStyleClass = "",
  optionContainerClass = "",
  maxHeight = "max-h-[200px]",
  emptyRecordMsg = "No option found!",
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
  closeOnSelect = false,
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
  setSearchTerm = () => {},
  searchTerm = "",
}) {
  // useEffect(() => {
  //   console.log({ defaultSelectedValues });
  // }, [defaultSelectedValues]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [filteredOptions, setFilterdOptions] = useState([]);
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
      setSelectedValues(
        defaultSelectedValues?.length > 0 ? defaultSelectedValues : []
      );
      // setFilterdOptions(options);
      setComponentLoading(false);
    }
  }, [loading]);

  const [isFirstTime, setIsFirstTime] = useState(true);
  useEffect(() => {
    if (isFirstTime) {
      setIsFirstTime(false);
    } else {
      onSelect(
        selectedValues.map((value) => ({
          label: value?.label,
          selectedValue: value?.selectedValue,
          ref: value?.ref,
          type: value?.type,
        }))
      );

      // closeOnSelect && singleSelect && setIsOptionOpen(false);
      setFilterdOptions(options);
      setSearchFieldValue("");
    }
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
    setFilterdOptions(
      options.filter(
        (option) =>
          option.label &&
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleKeyPress = () => {
    if (searchFieldValue) {
      setSearchTerm(searchFieldValue);
      setSearchFieldValue("");
      setFilterdOptions(options);
    } else {
      console.log("Enter key pressed!");
    }
  };

  // SELECT FILTER
  // POPUP OPTIONS
  const [popupOption, setPopupOption] = useState({
    open: false,
    type: "",
    title: "",
    availableValues: [],
    selectedValue: [],
    selectedValues: [],
    onClose: () => {
      setPopupOption({ ...popupOption, open: false });
    },
    overlayStyle: { background: "red" },
    closeOnDocumentClick: false,
  });

  const handleSelect = (opt) => {
    setPopupOption((prev) => ({
      ...prev,
      open: true,
      type: opt?.type,
      title: opt?.label,
      availableValues: opt?.availableValues,
      selectedValue: opt?.selectedValue,
      selectedValues: selectedValues,
      setSelectedValues: setSelectedValues,
    }));
  };

  useEffect(() => {
    console.log({ selectedValues });
  }, [selectedValues]);
  return (
    <div
      data-cy={"container_custom_multi_filter_select"}
      className="flex bg-base-100 w-full h-auto input px-0 rounded-xl outline-none  border-primary focus:outline-none input-bordered relative"
    >
      <div
        data-cy={"filter_container_custom_multi_filter_select"}
        data-tip="Filter"
        className={`tooltip tooltip-bottom tooltip-primary h-12 flex justify-center items-center w-12`}
      >
        <TbFilter
          onClick={() => setIsOptionOpen(!isOptionOpen)}
          className="text-xl text-primary cursor-pointer "
        />
      </div>
      {/* POPUP  */}
      <CustomPopupForFilter
        popupClasses={``}
        popupOption={popupOption}
        setPopupOption={setPopupOption}
        Component={
          <>
            {popupOption?.type === "text" && (
              <TextFilter
                popupOption={popupOption}
                handleClosePopup={(value) => {
                  // SET VALUE
                  setSelectedValues([
                    ...options
                      .map((values) => {
                        if (popupOption?.title === values.label) {
                          // Checking Matching value from option
                          return { ...values, selectedValue: value }; // if found then set value to selectedValue state
                        } else {
                          // If not match
                          if (
                            selectedValues.filter(
                              (v) => values?.label === v?.label
                            )?.length > 0
                          ) {
                            // Then check if selectedValues have value with same label
                            return selectedValues.find(
                              (v) => values?.label === v?.label
                            ); // Then return the value
                          }
                        }
                      })
                      .filter((item) => item !== undefined),
                  ]);

                  // CLOSE POPUP
                  setPopupOption({
                    open: false,
                    type: "",
                    id: null,
                    title: "",
                    onClose: () => {
                      setPopupOption({ ...popupOption, open: false });
                    },
                    overlayStyle: { background: "red" },
                    closeOnDocumentClick: false,
                  });
                }}
              />
            )}
            {popupOption?.type === "number" && (
              <NumberFilter
                popupOption={popupOption}
                handleClosePopup={(value) => {
                  // SET VALUE
                  setSelectedValues([
                    ...options
                      .map((values) => {
                        if (popupOption?.title === values.label) {
                          // Checking Matching value from option
                          return { ...values, selectedValue: value }; // if found then set value to selectedValue state
                        } else {
                          // If not match
                          if (
                            selectedValues.filter(
                              (v) => values?.label === v?.label
                            )?.length > 0
                          ) {
                            // Then check if selectedValues have value with same label
                            return selectedValues.find(
                              (v) => values?.label === v?.label
                            ); // Then return the value
                          }
                        }
                      })
                      .filter((item) => item !== undefined),
                  ]);

                  // CLOSE POPUP
                  setPopupOption({
                    open: false,
                    type: "",
                    id: null,
                    title: "",
                    onClose: () => {
                      setPopupOption({ ...popupOption, open: false });
                    },
                    overlayStyle: { background: "red" },
                    closeOnDocumentClick: false,
                  });
                }}
              />
            )}
            {popupOption?.type === "date_with_range" && (
              <DateWithRangeFilter
                popupOption={popupOption}
                handleClosePopup={(value) => {
                  // SET VALUE
                  setSelectedValues([
                    ...options
                      .map((values) => {
                        if (popupOption?.title === values.label) {
                          // Checking Matching value from option
                          return { ...values, selectedValue: value }; // if found then set value to selectedValue state
                        } else {
                          // If not match
                          if (
                            selectedValues.filter(
                              (v) => values?.label === v?.label
                            )?.length > 0
                          ) {
                            // Then check if selectedValues have value with same label
                            return selectedValues.find(
                              (v) => values?.label === v?.label
                            ); // Then return the value
                          }
                        }
                      })
                      .filter((item) => item !== undefined),
                  ]);

                  // CLOSE POPUP
                  setPopupOption({
                    open: false,
                    type: "",
                    id: null,
                    title: "",
                    onClose: () => {
                      setPopupOption({ ...popupOption, open: false });
                    },
                    overlayStyle: { background: "red" },
                    closeOnDocumentClick: false,
                  });
                }}
              />
            )}
            {popupOption?.type === "date_without_range" && (
              <DateWithoutRangeFilter
                popupOption={popupOption}
                handleClosePopup={(value) => {
                  // SET VALUE
                  setSelectedValues([
                    ...options
                      .map((values) => {
                        if (popupOption?.title === values.label) {
                          // Checking Matching value from option
                          return { ...values, selectedValue: value }; // if found then set value to selectedValue state
                        } else {
                          // If not match
                          if (
                            selectedValues.filter(
                              (v) => values?.label === v?.label
                            )?.length > 0
                          ) {
                            // Then check if selectedValues have value with same label
                            return selectedValues.find(
                              (v) => values?.label === v?.label
                            ); // Then return the value
                          }
                        }
                      })
                      .filter((item) => item !== undefined),
                  ]);

                  // CLOSE POPUP
                  setPopupOption({
                    open: false,
                    type: "",
                    id: null,
                    title: "",
                    onClose: () => {
                      setPopupOption({ ...popupOption, open: false });
                    },
                    overlayStyle: { background: "red" },
                    closeOnDocumentClick: false,
                  });
                }}
              />
            )}
            {popupOption?.type === "checkbox" && (
              <CheckboxFilter
                popupOption={popupOption}
                handleClosePopup={(value) => {
                  // SET VALUE
                  setSelectedValues([
                    ...options
                      .map((values) => {
                        if (popupOption?.title === values.label) {
                          // Checking Matching value from option
                          return { ...values, selectedValue: value }; // if found then set value to selectedValue state
                        } else {
                          // If not match
                          if (
                            selectedValues.filter(
                              (v) => values?.label === v?.label
                            )?.length > 0
                          ) {
                            // Then check if selectedValues have value with same label
                            return selectedValues.find(
                              (v) => values?.label === v?.label
                            ); // Then return the value
                          }
                        }
                      })
                      .filter((item) => item !== undefined),
                  ]);

                  // CLOSE POPUP
                  setPopupOption({
                    open: false,
                    type: "",
                    id: null,
                    title: "",
                    onClose: () => {
                      setPopupOption({ ...popupOption, open: false });
                    },
                    overlayStyle: { background: "red" },
                    closeOnDocumentClick: false,
                  });
                }}
              />
            )}
            {popupOption?.type === "radio" && (
              <RadioFilter
                popupOption={popupOption}
                handleClosePopup={(value) => {
                  // SET VALUE
                  setSelectedValues([
                    ...options
                      .map((values) => {
                        if (popupOption?.title === values.label) {
                          // Checking Matching value from option
                          return { ...values, selectedValue: value }; // if found then set value to selectedValue state
                        } else {
                          // If not match
                          if (
                            selectedValues.filter(
                              (v) => values?.label === v?.label
                            )?.length > 0
                          ) {
                            // Then check if selectedValues have value with same label
                            return selectedValues.find(
                              (v) => values?.label === v?.label
                            ); // Then return the value
                          }
                        }
                      })
                      .filter((item) => item !== undefined),
                  ]);

                  // CLOSE POPUP
                  setPopupOption({
                    open: false,
                    type: "",
                    id: null,
                    title: "",
                    onClose: () => {
                      setPopupOption({ ...popupOption, open: false });
                    },
                    overlayStyle: { background: "red" },
                    closeOnDocumentClick: false,
                  });
                }}
              />
            )}
            {popupOption?.type === "multi_select" && (
              <MultiSelectFilter
                popupOption={popupOption}
                handleClosePopup={(value) => {
                  // SET VALUE
                  setSelectedValues([
                    ...options
                      .map((values) => {
                        if (popupOption?.title === values.label) {
                          // Checking Matching value from option
                          return { ...values, selectedValue: value }; // if found then set value to selectedValue state
                        } else {
                          // If not match
                          if (
                            selectedValues.filter(
                              (v) => values?.label === v?.label
                            )?.length > 0
                          ) {
                            // Then check if selectedValues have value with same label
                            return selectedValues.find(
                              (v) => values?.label === v?.label
                            ); // Then return the value
                          }
                        }
                      })
                      .filter((item) => item !== undefined),
                  ]);

                  // CLOSE POPUP
                  setPopupOption({
                    open: false,
                    type: "",
                    id: null,
                    title: "",
                    onClose: () => {
                      setPopupOption({ ...popupOption, open: false });
                    },
                    overlayStyle: { background: "red" },
                    closeOnDocumentClick: false,
                  });
                }}
              />
            )}
            {popupOption?.type === "single_select" && (
              <SingleSelectFilter
                popupOption={popupOption}
                handleClosePopup={(value) => {
                  // SET VALUE
                  setSelectedValues([
                    ...options
                      .map((values) => {
                        if (popupOption?.title === values.label) {
                          // Checking Matching value from option
                          return { ...values, selectedValue: value }; // if found then set value to selectedValue state
                        } else {
                          // If not match
                          if (
                            selectedValues.filter(
                              (v) => values?.label === v?.label
                            )?.length > 0
                          ) {
                            // Then check if selectedValues have value with same label
                            return selectedValues.find(
                              (v) => values?.label === v?.label
                            ); // Then return the value
                          }
                        }
                      })
                      .filter((item) => item !== undefined),
                  ]);

                  // CLOSE POPUP
                  setPopupOption({
                    open: false,
                    type: "",
                    id: null,
                    title: "",
                    onClose: () => {
                      setPopupOption({ ...popupOption, open: false });
                    },
                    overlayStyle: { background: "red" },
                    closeOnDocumentClick: false,
                  });
                }}
              />
            )}
          </>
        }
      />
      {/* LABEL */}
      <div
        data-cy={"label_container_custom_multi_filter_select"}
        className="flex gap-5 items-center justify-between"
      >
        <div
          data-cy={"label_sub_container_custom_multi_filter_select"}
          className={`flex items-center gap-2`}
        >
          {label ? (
            <label
              data-cy={"label_custom_multi_filter_select"}
              htmlFor={id}
              className={`label`}
            >
              <span
                data-cy={"label_content_custom_multi_filter_select"}
                className="label-text  text-md font-bold"
              >
                {label}{" "}
                {required && !disable && (
                  <span
                    data-cy={"label_is_required_custom_multi_filter_select"}
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
        </div>
      </div>

      {/* FIELD  */}
      <div
        data-cy={"field_container_custom_multi_filter_select"}
        // disabled={disable}
        style={{ display: "flex" }}
        className={`z-10 w-full  bg-transparent flex-wrap  outline-none focus:outline-none items-center px-1 h-auto`}
      >
        {/* SELECTED OPTIONS  */}
        {searchTerm && (
          <span
            data-cy={"search_term_content_custom_multi_filter_select"}
            className="bg-primary-content z-10 px-5 py-1 rounded-md my-1 mx-1 shadow-md inline-flex gap-2 items-center"
          >
            Search Term: {searchTerm}
            <button
              data-cy={"close_search_term_custom_multi_filter_select"}
              onClick={() => {
                setSearchTerm("");
                setSearchFieldValue("");
              }}
            >
              <CustomCloseIcon />
            </button>
          </span>
        )}

        {selectedValues?.map((opt, index) => {
          return (
            <span
              data-cy={"selected_value_custom_multi_filter_select"}
              key={index}
              className="bg-primary-content z-10 px-5 py-1 rounded-md my-1 mx-1 shadow-md inline-flex gap-2 items-center"
            >
              {/* ICON  */}
              {opt?.Icon && <opt.Icon />}

              {/* LABEL  */}
              {`${opt?.label}: `}

              {/*
                ================================================
                VALUES
                ================================================
              */}

              {opt?.type === "text" ? opt?.selectedValue?.join(" ") : ""}
              {opt?.type === "number" ? opt?.selectedValue?.join(" ") : ""}

              {opt?.type === "date_with_range"
                ? opt?.selectedValue.filter((item) => item !== "")?.length > 1
                  ? opt?.selectedValue?.join(" to ")
                  : opt?.selectedValue[0]
                : ""}

              {opt?.type === "date_without_range" ? opt?.selectedValue[0] : ""}

              {opt?.type === "radio"
                ? opt?.availableValues.find(
                    (v) => v?.value === opt?.selectedValue[0]
                  )?.label
                : ""}

              {opt?.type === "multi_select"
                ? opt.availableValues
                    .filter((item) => opt.selectedValue.includes(item.id))
                    .map((item) => item.label)
                    .join(", ")
                : ""}

              {opt?.type === "single_select"
                ? opt.availableValues
                    .filter((item) => opt.selectedValue.includes(item.id))
                    .map((item) => item.label)
                    .join(", ")
                : ""}

              {opt?.type === "checkbox"
                ? opt.availableValues
                    .filter((item) => opt.selectedValue.includes(item.value))
                    .map((item) => item.label)
                    .join(", ")
                : ""}

              {opt?.type !== "date_with_range" &&
              opt?.type !== "date_without_range" &&
              opt?.type !== "number" &&
              opt?.type !== "radio" &&
              opt?.type !== "multi_select" &&
              opt?.type !== "single_select" &&
              opt?.type !== "checkbox" &&
              opt?.type !== "text"
                ? opt?.selectedValue?.join(",")
                : ""}
              {/*
                ================================================
                ================================================
              */}

              {/* REMOVE BUTTON  */}
              {!disable && (
                <button
                  data-cy={"remove_button_custom_multi_filter_select"}
                  onClick={() => {
                    setSelectedValues(
                      selectedValues?.filter((s_opt) => s_opt?.id !== opt?.id)
                    );
                    onRemove(opt?.ref);
                  }}
                >
                  <CustomCloseIcon />
                </button>
              )}
            </span>
          );
        })}

        {/* SELECT MORE BUTTON  */}
        {!disable && (
          <div
            data-cy={"select_more_button_custom_multi_filter_select"}
            onClick={() => {
              setIsOptionOpen(!isOptionOpen);
            }}
            className={`relative min-w-[100px!important] bg-transparent h-11 items-center text-gray-600  flex-1`}
          >
            <input
              data-cy={"select_more_input_custom_multi_filter_select"}
              title="Change"
              value={searchFieldValue}
              placeholder="Filter"
              disabled={options?.length === 0}
              onChange={handleSearch}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleKeyPress();
                }
              }}
              className={`w-full input-bordered outline-none bg-transparent px-2 h-full`}
            />
            {/* OPTIONS  */}
            {isOptionOpen ? (
              <OutsideClickHandler
                className={`absolute shadow-lg  border border-t-none bg-base-300  border-primary  rounded-b-md z-10 w-auto left-0 top-[105%] overflow-hidden`}
              >
                <div
                  data-cy={"option_container_custom_multi_filter_select"}
                  className={`overflow-y-auto px-0 py-0 overflow-x-hidden ${maxHeight} scrollbar-none `}
                >
                  {componentLoading ? (
                    <div
                      data-cy={
                        "component_loading_container_custom_multi_filter_select"
                      }
                      className="flex justify-center items-center py-5"
                    >
                      <ButtonLoading />
                    </div>
                  ) : filteredOptions.filter(
                      (opt) =>
                        !selectedValues?.some((s_opt) => s_opt?.id === opt?.id)
                    ).length > 0 ? (
                    <>
                      {searchFieldValue && (
                        <Fragment>
                          <button
                            onClick={handleKeyPress}
                            className={`px-5 py-1 justify-between w-full flex gap-2 items-center hover:bg-primary-content`}
                          >
                            Search : {searchFieldValue}
                          </button>
                        </Fragment>
                      )}
                      {filteredOptions
                        .filter(
                          (opt) =>
                            !selectedValues?.some(
                              (s_opt) => s_opt?.id === opt?.id
                            )
                        )
                        .map((opt, index) => (
                          <Fragment key={index}>
                            <button
                              data-cy={
                                "filtered_option_button_custom_multi_filter_select"
                              }
                              onClick={() => {
                                // IF NOT SELECTED
                                handleSelect(opt);
                              }}
                              className={`px-5 py-1 justify-between w-full flex gap-2 items-center   ${
                                showCheckbox &&
                                selectedValues?.some(
                                  (s_opt) => s_opt?.id === opt?.id
                                )
                                  ? "bg-primary text-base-300"
                                  : "hover:bg-primary-content"
                              }`}
                            >
                              <span
                                data-cy={
                                  "filtered_option_button_content_custom_multi_filter_select"
                                }
                                className="inline-flex gap-2 items-center text-left w-full"
                              >
                                {opt?.Icon && <opt.Icon />} {opt?.label}
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
                  ) : (
                    <div
                      data-cy={
                        "search_field_container_custom_multi_filter_select"
                      }
                      className="flex flex-col justify-center items-center "
                    >
                      {searchFieldValue && (
                        <Fragment>
                          <button
                            data-cy={
                              "search_field_button_custom_multi_filter_select"
                            }
                            onClick={handleKeyPress}
                            className={`px-5 py-1 justify-between w-full flex gap-2 items-center hover:bg-primary-content`}
                          >
                            Search : {searchFieldValue}
                          </button>
                        </Fragment>
                      )}
                      <span
                        data-cy={
                          "search_field_empty_message_custom_multi_filter_select"
                        }
                        className={`font-bold text-red-500 py-5 px-5 block`}
                      >
                        {emptyRecordMsg}
                      </span>
                    </div>
                  )}
                </div>

                {addNewItemButton && (
                  <button
                    data-cy={"add_new_item_button_custom_multi_filter_select"}
                    onClick={onClickAddNewItemButton}
                    className={`w-full text-center bg-primary text-base-300 py-2 hover:bg-primary-focus`}
                  >
                    Add New
                  </button>
                )}
              </OutsideClickHandler>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  );
}
