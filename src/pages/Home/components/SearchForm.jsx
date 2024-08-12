import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CustomAutoComplete from "../../../components/CustomAutoComplete";
import Headings from "../../../components/Headings/Headings";
import CustomDatePickerWithTime from "../../../components/InputFields/CustomDatePickerWithTime";
import CustomMultiSelect from "../../../components/InputFields/CustomMultiSelect";
import CustomMultiSelectWithChild from "../../../components/InputFields/CustomMultiSelectWithChild";
import { useData } from "../../../context/DataContext";
import { useGeoLocationData } from "../../../context/GeoLocationDataContext";
import { motion } from "framer-motion";
import CustomDatePickerV2 from "../../../components/InputFields/CustomDatePickerV2";
import CustomTimePickerV2 from "../../../components/InputFields/CustomTimePickerV2";
import { calculateLatLongBounds } from "../../../utils/map";
export default function SearchForm() {
  const navigate = useNavigate();

  const { location } = useGeoLocationData();

  const {
    services,
    subServices,
    makes,
    models,
    loading,
    homeSearchData,
    setHomeSearchData,
  } = useData();
  const [searchData, setSearchData] = useState({
    address_line_1: "",
  });

  const [isMakeChangeLoading, setIsMakeChangeLoading] = useState(false);
  const [modelsForMultiSelect, setModelsForMultiSelect] = useState(makes);

  const [dateData, setDateData] = useState("");
  const [timeData, setTimeData] = useState("");

  const [showAdvanceOption, setShowAdvanceOption] = useState(false);

  // CREATING A LOADING STATE FOR MULTISELECT
  useEffect(() => {
    setIsMakeChangeLoading(true);
    setModelsForMultiSelect(
      models?.filter((model) =>
        homeSearchData?.makes?.some(
          (make) => model?.automobile_make_id === make
        )
      )
    );
    setTimeout(() => {
      setIsMakeChangeLoading(false);
    }, 100);
  }, [homeSearchData?.makes]);

  // TOGGLE ADVANCE OPTION
  const toggleAdvanceOption = () => {
    if (homeSearchData?.makes && homeSearchData?.makes?.length !== 0) {
      setShowAdvanceOption(true);
    } else {
      Swal.fire({
        title: "Alert",
        icon: "info",
        text: "You need to select at least a make to go to the advance search options",
        customClass: "shadow-2xl bg-white rounded-xl p-5",
      });
    }
  };

  // HANDLE FORM DATA CHANGE
  const onFormDataChange = (e) => {
    setHomeSearchData((prev) => ({
      ...prev,
      address: e.target.value,
    }));
  };

  const [errors, setErrors] = useState({});
  // VALIDATE
  const validateForm = () => {
    /**
     * Validates the form data and sets the errors state accordingly.
     * Returns true if there are no errors, false otherwise.
     * @returns {boolean}
     */
    const newErrors = {};

    // Example date and time string
    const dateTimeString = `${dateData} ${timeData}`;
    // Format of the date and time string
    const format = "DD-MM-YYYY hh:mm A";
    // Check if the date and time string is valid
    if (dateData || timeData) {
      if (!moment(dateTimeString, format, true).isValid()) {
        // Set an error message for the 'timing' field
        newErrors.timing = "Please select date and time properly";
      }
    }

    // Set the errors state with the new errors
    setErrors(newErrors);

    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  // HANDLE SEARCH
  const searchGarages = () => {
    if (validateForm()) {
      if (homeSearchData?.address) {
        console.log("hit 1");
        const distanceData = calculateLatLongBounds({
          lat: location?.latitude,
          lon: location?.longitude,
          radiusInKm: 3,
        });
        setHomeSearchData({
          ...homeSearchData,
          page: 1,
          search_key: "",
          distance: 3,
          wifi_available: false,
          is_mobile_garage: false,
          services: [], //DONE
          lat: location?.latitude, //DONE
          long: location?.longitude, //DONE
          start_lat: distanceData?.minLat, //DONE
          end_lat: distanceData?.maxLat, //DONE
          start_long: distanceData?.minLon, //DONE
          end_long: distanceData?.maxLon, //DONE
          date_time:
            dateData || timeData
              ? moment(
                  `${dateData} + " " + ${timeData}`,
                  "DD-MM-YYYY hh:mm A"
                ).format("YYYY-MM-DD HH:mm")
              : "",
        });
      } else {
        console.log("hit 2");

        setHomeSearchData({
          ...homeSearchData,
          page: 1,
          search_key: "",
          distance: 0,
          wifi_available: false,
          is_mobile_garage: false,
          services: [], //DONE
          lat: location?.latitude, //DONE
          long: location?.longitude, //DONE
          start_lat: "", //DONE
          start_long: "", //DONE
          date_time:
            dateData || timeData
              ? moment(
                  `${dateData} + " " + ${timeData}`,
                  "DD-MM-YYYY hh:mm A"
                ).format("YYYY-MM-DD HH:mm")
              : "",
        });
      }

      navigate("garages");
    }
  };

  return (
    <motion.div
      data-auto={`container-searchForm`}
      className={`relative w-full md:w-[500px] bg-base-300 z-60 -bottom-[230px] ${
        showAdvanceOption ? "md:-bottom-[50px]" : "md:-bottom-[100px]"
      } left-1/2 md:left-[50px] -translate-x-1/2 md:translate-x-0 rounded-xl p-5 border border-base-300 shadow-xl`}
    >
      <motion.div
        data-auto={`heading-container-searchForm`}
        className="w-full "
      >
        <Headings level={2} className={`text-center mb-5 text-primary`}>
          Search Garage
        </Headings>

        <br />
        <div
          data-auto={`form-container-searchForm`}
          className={`flex flex-col gap-y-2`}
        >
          {/* LOCATION  */}
          <CustomAutoComplete
            disable={false}
            className={`input input-bordered rounded-md w-full`}
            placeholder="Address"
            type="text"
            name="address"
            onChange={onFormDataChange}
            searchData={homeSearchData}
            setFormData={setHomeSearchData}
            defaultValue={homeSearchData?.address}
            dataAuto={`address-searchForm`}
          />

          {/* SERVICES & MAKES  */}
          <div className={`grid grid-cols-1 gap-y-2`}>
            {/* SERVICES  */}
            <div data-auto={`services-container-searchForm`} className="w-full">
              <CustomMultiSelectWithChild
                loading={loading}
                groupForeignKey={"service_id"}
                options={subServices}
                groups={services}
                required={true}
                placeholder="Select Services"
                defaultSelectedValues={subServices?.filter((sub_service) =>
                  homeSearchData?.sub_services?.some(
                    (selected_sub_service_id) =>
                      sub_service?.id === selected_sub_service_id
                  )
                )}
                onSelect={(e) => {
                  setHomeSearchData({
                    ...homeSearchData,
                    sub_services: e.map((wl) => wl?.id),
                  });
                }}
                dataAuto={`subServices-searchForm`}
              />
            </div>

            {/* MAKES  */}
            <div data-auto={`makes-container-searchForm`} className="w-full">
              <CustomMultiSelect
                singleSelect
                loading={loading}
                placeholder="Select Makes"
                options={makes}
                required={true}
                defaultSelectedValues={makes?.filter((make) =>
                  homeSearchData?.makes?.some(
                    (selected_make_id) => make?.id === selected_make_id
                  )
                )}
                onSelect={(e) => {
                  setHomeSearchData({
                    ...homeSearchData,
                    makes: e.map((wl) => wl?.id),
                  });
                }}
                dataAuto={`makes-searchForm`}
              />
            </div>
          </div>

          {/* MODELS & TIMING  */}
          {!showAdvanceOption ? (
            // ADVANCE OPTION BUTTON
            <div className={``}>
              <button
                data-auto={`advance-option-searchForm`}
                onClick={toggleAdvanceOption}
                className={`btn btn-outline btn-primary w-full`}
              >
                Advance Options
              </button>
            </div>
          ) : (
            <div className={`grid grid-cols-1 gap-y-2`}>
              {/* MODEL  */}
              <div data-auto={`model-container-searchForm`} className="w-full">
                <CustomMultiSelect
                  loading={loading || isMakeChangeLoading}
                  placeholder="Select Models"
                  options={modelsForMultiSelect}
                  required={true}
                  defaultSelectedValues={models?.filter((model) =>
                    homeSearchData?.models?.some(
                      (selected_model_id) => model?.id === selected_model_id
                    )
                  )}
                  singleSelect
                  onSelect={(e) => {
                    setHomeSearchData({
                      ...homeSearchData,
                      models: e.map((wl) => wl?.id),
                    });
                  }}
                  dataAuto={`model-searchForm`}
                />
              </div>

              {/* TIMING  */}
              <div
                data-auto={`timing-container-searchForm`}
                className="w-full flex flex-col gap-y-2"
              >
                <CustomDatePickerV2
                  from={moment(new Date()).format("DD-MM-YYYY")}
                  right
                  value={dateData}
                  format="dd-LL-yyyy"
                  disable={false}
                  fieldClassName={"w-full"}
                  id={"timing"}
                  name={"timing"}
                  onChange={(date) => {
                    setDateData(date);
                  }}
                  placeholder={"Timing"}
                  type={"text"}
                  wrapperClassName={"w-full"}
                  dataAuto={`timing-searchForm`}
                  error={errors?.timing}
                />

                <CustomTimePickerV2
                  value={timeData}
                  // TIME
                  timeFormat="24"
                  onTimeChange={(time) => {
                    setTimeData(time);
                  }}
                  error={errors?.timing}
                  dataAuto={`time-searchForm`}
                />
              </div>
            </div>
          )}

          <div
            data-auto={`button-container-searchForm`}
            className={`w-full flex justify-center items-center`}
          >
            <button
              data-auto={`search-searchForm`}
              disabled={loading}
              onClick={searchGarages}
              className={`btn btn-primary w-full`}
            >
              Search
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
