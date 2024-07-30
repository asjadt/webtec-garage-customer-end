import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { arrayToObject } from "../../utils/arrayToObject";
import CustomLoading from "../CustomLoading";
import CustomDatePicker from "../InputFields/CustomDatePicker";
import CustomField from "../InputFields/CustomField";
import CustomMultiSelect from "../InputFields/CustomMultiSelect";
import CustomNumberField from "../InputFields/CustomNumberField";
import CustomNumberFieldWithCurrency from "../InputFields/CustomNumberFieldWithCurrency";
import Footer from "./Footer";
import Header from "./Header";
import ToggleFilterButton from "./ToggleFilterButton";
import { formatRole } from "../../utils/formatRole";

const allTypes = [
  "text",
  "email",
  "number",
  "currency",
  "single-date",
  "date-range",
  "range",
  "multi-select",
  "single-select",

  // "single-select-button",
  // "multi-select-button",
];

const CustomFilter = ({ isLoading, onApplyChange, options, totalData }) => {
  const [isDropdownLoading, setIsDropdownLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});

  const renderField = (option, index) => {
    switch (option.type) {
      case "text":
        return (
          <CustomField
            key={index}
            value={selectedFilters[option?.id]}
            fieldClassName={"w-full"}
            label={option?.label}
            id={option?.id}
            name={option?.id}
            onChange={(e) =>
              setSelectedFilters((prev) => ({
                ...prev,
                [option?.id]: e?.target?.value,
              }))
            }
            placeholder={option?.label}
            type={"text"}
            wrapperClassName={"w-full"}
          />
        );
      case "email":
        return (
          <CustomField
            key={index}
            value={selectedFilters[option?.id]}
            fieldClassName={"w-full"}
            label={option?.label}
            id={option?.id}
            name={option?.id}
            onChange={(e) =>
              setSelectedFilters((prev) => ({
                ...prev,
                [option?.id]: e?.target?.value,
              }))
            }
            placeholder={option?.label}
            type={"email"}
            wrapperClassName={"w-full"}
          />
        );
      case "number":
        return (
          <CustomNumberField
            key={index}
            value={selectedFilters[option?.id]}
            fieldClassName={"w-full"}
            label={option?.label}
            id={option?.id}
            name={option?.id}
            onChange={(e) =>
              setSelectedFilters((prev) => ({
                ...prev,
                [option?.id]: e?.target?.value,
              }))
            }
            placeholder={option?.label}
            type={"number"}
            wrapperClassName={"w-full"}
          />
        );
      case "currency":
        return (
          <CustomNumberFieldWithCurrency
            key={index}
            currency={option?.currency}
            value={selectedFilters[option?.id]}
            disable={option?.disable}
            fieldClassName={"w-full"}
            id={option?.id}
            name={option?.id}
            label={option?.label}
            onChange={(e) =>
              setSelectedFilters((prev) => ({
                ...prev,
                [option?.id]: e?.target?.value,
              }))
            }
            placeholder={option?.label}
            type={option?.type}
            wrapperClassName={"w-full"}
          />
        );
      case "single-date":
        return (
          <CustomDatePicker
            key={index}
            top={index > 4}
            format="dd-LL-yyyy"
            value={selectedFilters[option?.id]}
            from={option?.from}
            to={option?.to}
            right
            fieldClassName={"w-full"}
            id={option?.id}
            label={option?.label}
            name={option?.id}
            onChange={(e) => {
              setSelectedFilters((prev) => ({
                ...prev,
                [option?.id]: e,
              }));
            }}
            placeholder={option?.label}
            type={option?.type}
            wrapperClassName={"w-full"}
            dataAuto="custom-filter-single"
          />
        );
      case "multi-select":
        return (
          <CustomMultiSelect
            key={index}
            top={index > 4}
            label={option?.label}
            loading={isDropdownLoading || isLoading}
            singleSelect={false}
            options={option?.options}
            defaultSelectedValues={
              selectedFilters[option?.id]?.length > 0
                ? option?.options.filter((opt) =>
                    selectedFilters[option?.id].some((val) => val === opt?.id)
                  )
                : []
            }
            onSelect={(e) =>
              setSelectedFilters((prev) => ({
                ...prev,
                [option?.id]: e?.map((opt) => opt?.value),
              }))
            }
          />
        );
      case "single-select":
        return (
          <CustomMultiSelect
            key={index}
            top={index > 4}
            label={option?.label}
            disable={option?.disable}
            loading={isDropdownLoading || isLoading}
            singleSelect
            options={option?.options}
            defaultSelectedValues={
              selectedFilters[option?.id]?.length > 0
                ? option?.options.filter(
                    (opt) => opt?.value === selectedFilters[option?.id][0]
                  )
                : []
            }
            onSelect={(e) => {
              console.log(e?.map((opt) => opt?.value));
              setSelectedFilters((prev) => ({
                ...prev,
                [option?.id]: e?.map((opt) => opt?.value),
              }));
            }}
          />
        );
      case "date-range":
        return (
          <div key={index} className={`flex gap-2`}>
            {/* START  */}
            <CustomDatePicker
              format="dd-LL-yyyy"
              value={selectedFilters[option?.id][0] || ""}
              from={option?.from}
              to={selectedFilters[option?.id][1] || ""}
              left
              fieldClassName={"w-full"}
              id={option?.id}
              label={`${formatRole(option?.label)} Start Date`}
              name={option?.id}
              top={index > 3}
              onChange={(e) => {
                let arr = [];
                if (selectedFilters[option?.id][1] === undefined) {
                  arr[1] = "";
                } else {
                  arr[1] = selectedFilters[option?.id][1];
                }
                arr[0] = e;

                if (arr.every((element) => element === "")) {
                  setSelectedFilters((prev) => ({
                    ...prev,
                    [option?.id]: [],
                  }));
                } else {
                  setSelectedFilters((prev) => ({
                    ...prev,
                    [option?.id]: arr,
                  }));
                }
              }}
              placeholder={`${formatRole(option?.label)} Start Date`}
              type={option?.type}
              wrapperClassName={"w-full"}
              dataAuto="custom-filter-start"
            />

            {/* END  */}
            <CustomDatePicker
              format="dd-LL-yyyy"
              value={selectedFilters[option?.id][1] || ""}
              from={selectedFilters[option?.id][0]}
              to={option?.to}
              right
              fieldClassName={"w-full"}
              id={option?.id}
              top={index > 4}
              label={`${formatRole(option?.label)} End Date`}
              name={option?.id}
              onChange={(e) => {
                let arr = [];
                if (selectedFilters[option?.id][0] === undefined) {
                  arr[0] = "";
                } else {
                  arr[0] = selectedFilters[option?.id][0];
                }
                arr[1] = e;

                if (arr.every((element) => element === "")) {
                  setSelectedFilters((prev) => ({
                    ...prev,
                    [option?.id]: [],
                  }));
                } else {
                  setSelectedFilters((prev) => ({
                    ...prev,
                    [option?.id]: arr,
                  }));
                }
              }}
              placeholder={`${formatRole(option?.label)} End Date`}
              type={option?.type}
              wrapperClassName={"w-full"}
              dataAuto="custom-filter-end"
            />
          </div>
        );
      case "range":
        return (
          <div key={index} className={`flex gap-2`}>
            <CustomNumberField
              value={selectedFilters[option?.id][0] || ""}
              fieldClassName={"w-full"}
              label={`${option?.label} From`}
              max={selectedFilters[option?.id][1]}
              id={option?.id}
              name={option?.id}
              top={index > 3}
              onChange={(e) => {
                let arr = [];
                if (selectedFilters[option?.id][1] === undefined) {
                  arr[1] = "";
                } else {
                  arr[1] = selectedFilters[option?.id][1];
                }
                arr[0] = e?.target?.value;
              }}
              placeholder={`${option?.label} From`}
              type={"number"}
              wrapperClassName={"w-full"}
            />
            <CustomNumberField
              value={selectedFilters[option?.id][1] || ""}
              fieldClassName={"w-full"}
              label={`${option?.label} To`}
              min={selectedFilters[option?.id][0]}
              id={option?.id}
              name={option?.id}
              top={index > 3}
              onChange={(e) => {
                let arr = [];
                if (selectedFilters[option?.id][0] === undefined) {
                  arr[0] = "";
                } else {
                  arr[0] = selectedFilters[option?.id][0];
                }

                if (arr.every((element) => element === "")) {
                  setSelectedFilters((prev) => ({
                    ...prev,
                    [option?.id]: [],
                  }));
                } else {
                  setSelectedFilters((prev) => ({
                    ...prev,
                    [option?.id]: arr,
                  }));
                }
              }}
              placeholder={`${option?.label} To`}
              type={"number"}
              wrapperClassName={"w-full"}
            />
          </div>
        );
      default:
        return <div key={index}>Invalid Type</div>;
    }
  };

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(options[0]?.groupName);

  const buttonRef = useRef(null);

  const handleButtonClick = () => {
    setIsFilterOpen((prev) => !prev);
  };

  useEffect(() => {
    setSelectedFilters(
      arrayToObject(
        options?.map((opt) => {
          if (opt?.defaultSelectedValues !== undefined) {
            return {
              [opt?.id]:
                opt?.defaultSelectedValues?.length > 0
                  ? opt?.defaultSelectedValues
                  : [],
            };
          } else {
            return { [opt?.id]: opt?.defaultValue || "" };
          }
        })
      )
    );
  }, [options]);

  const handleClear = () => {
    setSelectedFilters(
      arrayToObject(
        options?.map((opt) => {
          if (opt?.defaultSelectedValues !== undefined) {
            return {
              [opt?.id]: [],
            };
          } else {
            return { [opt?.id]: "" };
          }
        })
      )
    );
    onApplyChange(
      arrayToObject(
        options?.map((opt) => {
          if (opt?.defaultSelectedValues?.length > 0) {
            return {
              [opt?.id]: [],
            };
          } else {
            return { [opt?.id]: "" };
          }
        })
      )
    );
    setIsFilterOpen(false);
  };
  const handleApplyAllFilters = () => {
    onApplyChange(selectedFilters);
    setIsFilterOpen(false);
  };

  useEffect(() => {
    console.log({ selectedFilters });
  }, [selectedFilters]);

  return (
    <div className={`relative py-5`}>
      {/* TOGGLE BUTTON  */}
      <ToggleFilterButton
        options={options}
        buttonRef={buttonRef}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        handleButtonClick={handleButtonClick}
      />

      {/* MODAL  */}
      {isFilterOpen ? (
        <div
          className={` absolute top-20 right-0 border z-10 bg-base-300 rounded-xl shadow-xl w-[calc(100vw-20px)] sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[800px]`}
        >
          {/* HEADER  */}
          <Header />

          {/* MAIN SECTION  */}
          {isLoading ? (
            <CustomLoading />
          ) : (
            <>
              <div
                className={`flex  overflow-y-auto overflow-x-hidden scrollbar scrollbarX flex-col min-h-[400px] max-h-[500px]`}
              >
                <div className="join join-vertical w-full">
                  {[
                    ...new Set(options?.map((option) => option?.groupName)),
                  ]?.map((option, index) => (
                    <div
                      key={index}
                      data-auto={`custom-filter-selected-filter${
                        index + 1
                      }-all-page`}
                      className="collapse collapse-arrow join-item rounded-none border-base-300 border"
                    >
                      <input
                        defaultChecked={
                          [
                            ...new Set(
                              options?.map((option) => option?.groupName)
                            ),
                          ]?.length === 1 &&
                          [
                            ...new Set(
                              options?.map((option) => option?.groupName)
                            ),
                          ][0] === ""
                            ? true
                            : false
                        }
                        onClick={() => {
                          setIsDropdownLoading(true);
                          setSelectedFilter(option);
                          setTimeout(() => {
                            setIsDropdownLoading(false);
                          }, 10);
                        }}
                        type={
                          [
                            ...new Set(
                              options?.map((option) => option?.groupName)
                            ),
                          ]?.length === 1 &&
                          [
                            ...new Set(
                              options?.map((option) => option?.groupName)
                            ),
                          ][0] === ""
                            ? "radio"
                            : "checkbox"
                        }
                        name="my-accordion-4"
                      />
                      <div
                        className={`collapse-title text-sm border-b pb-0 pt-5 font-medium ${
                          selectedFilter === option
                            ? "bg-primary text-base-300"
                            : ""
                        }`}
                      >
                        {Array.isArray(selectedFilters[option?.id]) ? (
                          <>
                            {selectedFilters[option?.id]?.length !== 0 ? (
                              <span
                                className={`inline-block w-2 h-2 rounded-full  ${
                                  selectedFilter === option
                                    ? "bg-base-300 group-hover:bg-base-300"
                                    : "bg-primary group-hover:bg-primary"
                                } `}
                              ></span>
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          <>
                            {selectedFilters[option?.id]?.length ? (
                              <span
                                className={`inline-block w-2 h-2 rounded-full  ${
                                  selectedFilter === option?.label
                                    ? "bg-base-300 group-hover:bg-base-300"
                                    : "bg-primary group-hover:bg-primary"
                                } `}
                              ></span>
                            ) : (
                              ""
                            )}
                          </>
                        )}
                        {[
                          ...new Set(
                            options?.map((option) => option?.groupName)
                          ),
                        ]?.length === 1 &&
                        [
                          ...new Set(
                            options?.map((option) => option?.groupName)
                          ),
                        ][0] === ""
                          ? "Available Filters"
                          : formatRole(option)}
                      </div>
                      <div className="collapse-content bg-base-100">
                        <div className={`min-h-[600px]`}>
                          {options
                            ?.filter((opt) => option === opt?.groupName)
                            ?.map((option, index) =>
                              renderField(option, index)
                            )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* FIELDS  */}
                {/* <div
                  data-auto={`custom-filter-fields-all-page`}
                  className={`p-5 hidden md:block w-[calc(100%-200px)] overflow-y-auto scrollbar scrollbarX`}
                >
                  {options?.filter((option) => selectedFilter === option?.label)
                    ?.length > 0
                    ? options
                        ?.filter((option) => selectedFilter === option?.label)
                        ?.map((option, index) => renderField(option, index))
                    : ""}
                </div> */}
              </div>
            </>
          )}

          {/* FOOTER  */}
          <Footer
            handleClear={handleClear}
            handleApplyAllFilters={handleApplyAllFilters}
            totalResult={totalData}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

CustomFilter.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf(allTypes).isRequired,
      min: PropTypes.number,
      max: PropTypes.number,
      minLength: PropTypes.number,
      maxLength: PropTypes.number,
      id: PropTypes.string.isRequired,
      onChange: PropTypes.func,
      disable: PropTypes.bool,
      currency: PropTypes.string,
      defaultValue: PropTypes.any,
      value: PropTypes.any,
      from: PropTypes.string,
      to: PropTypes.string,
      loading: PropTypes.bool,
      options: PropTypes.array,
      defaultSelectedValues: PropTypes.array,
      onSelect: PropTypes.func,
    })
  ).isRequired,
};

export default CustomFilter;
