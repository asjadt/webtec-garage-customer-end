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
export default function SearchForm() {
  const navigate = useNavigate();

  const { location, currentLat, llFromDistance } = useGeoLocationData();

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

  useEffect(() => {
    console.log({ homeSearchData });
  }, [homeSearchData]);

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
      // WHEN THE COUNTRY IS AVAILABLE
      if (!homeSearchData?.country_code) {
        setHomeSearchData({
          ...homeSearchData,
          page: 1,
          search_key: "",
          wifi_available: false,
          is_mobile_garage: false,
          services: [],
          address: "",
          start_lat: "",
          start_long: "",
          end_lat: "",
          end_long: "",
          locationDetails: {
            start_lat: "",
            start_long: "",
            end_lat: "",
            end_long: "",
          },
          date_time:
            dateData || timeData
              ? moment(
                  `${dateData} + " " + ${timeData}`,
                  "DD-MM-YYYY hh:mm A"
                ).format("YYYY-MM-DD HH:mm")
              : "",
        });

        navigate("garages");
      }
      // WHEN THE COUNTRY IS NOT AVAILABLE
      else {
        const distanceData = llFromDistance({
          latitude: homeSearchData.start_lat,
          longitude: homeSearchData.start_long,
          distance: Math.sqrt(2) * (3 * 1),
          bearing: 135,
        });
        setHomeSearchData({
          ...homeSearchData,
          page: 1,
          search_key: "",
          wifi_available: false,
          is_mobile_garage: false,
          services: [], //DONE
          // start_lat: "", //DONE
          // start_long: "", //DONE
          end_lat: distanceData?.latitude,
          end_long: distanceData?.longitude,
          locationDetails: {
            start_lat: location?.latitude - 0.27,
            start_long: location?.longitude + 0.27,
            end_lat: currentLat?.latitude + 0.27,
            end_long: currentLat?.longitude - 0.27,
          },
          date_time:
            dateData || timeData
              ? moment(
                  `${dateData} + " " + ${timeData}`,
                  "DD-MM-YYYY hh:mm A"
                ).format("YYYY-MM-DD HH:mm")
              : "",
        });

        navigate("garages");
      }
    }
  };

  return (
    <motion.div
      initial={{ bottom: "-330px" }}
      animate={{ bottom: "-230px" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className={`relative  w-full max-w-screen-xl bg-base-300 z-60 -bottom-[230px] left-1/2 -translate-x-1/2 rounded-xl p-5 border border-base-300 shadow-xl`}
    >
      <motion.div className="w-full ">
        <Headings level={2} className={`text-center mb-5 text-primary`}>
          Search Garage
        </Headings>
        <div className={`flex flex-col gap-y-2 md:gap-y-5`}>
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
            dataAuto={`homepage-address-searchPlace`}
          />

          {/* SERVICES & MAKES  */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 md:gap-x-5 md:gap-y-0  gap-y-2`}
          >
            {/* SERVICES  */}
            <div className="w-full">
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
                dataAuto={`work_location-create-employee`}
              />
            </div>

            {/* MAKES  */}
            <div className="w-full">
              <CustomMultiSelect
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
                dataAuto={`work_location-create-employee`}
              />
            </div>
          </div>

          {/* MODELS & TIMING  */}
          {!showAdvanceOption ? (
            // ADVANCE OPTION BUTTON
            <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6`}>
              <button
                onClick={toggleAdvanceOption}
                className={`btn btn-outline btn-primary btn-sm text-xs md:text-md`}
              >
                Advance Options
              </button>
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 md:grid-cols-2 md:gap-x-5 md:gap-y-0 gap-y-2`}
            >
              {/* MODEL  */}
              <div className="w-full">
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
                  onSelect={(e) => {
                    setHomeSearchData({
                      ...homeSearchData,
                      models: e.map((wl) => wl?.id),
                    });
                  }}
                  dataAuto={`work_location-create-employee`}
                />
              </div>

              {/* TIMING  */}
              <div className="w-full">
                <CustomDatePickerWithTime
                  // TIME
                  timeFormat="24"
                  timeVale={timeData}
                  onTimeChange={(time) => {
                    console.log({ time });
                    setTimeData(time);
                  }}
                  // DATE
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
                  dataAuto={`search-timing`}
                  error={errors?.timing}
                />
              </div>
            </div>
          )}

          <div className={`w-full flex justify-center items-center`}>
            <button
              disabled={loading}
              onClick={searchGarages}
              className={`btn btn-primary w-52 `}
            >
              Search
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
