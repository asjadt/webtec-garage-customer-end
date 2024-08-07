import { useEffect, useState } from "react";
import { MdFilterList } from "react-icons/md";
import { getGarages } from "../../Apis/homepageapi";
import AccordionForFilter from "../../components/Accordion/Accordion";
import CustomLoading from "../../components/CustomLoading";
import Headings from "../../components/Headings/Headings";
import { useData } from "../../context/DataContext";
import { handleApiError } from "../../utils/apiErrorHandler";
import { useGeoLocationData } from "../../context/GeoLocationDataContext";
import { getGaragesV2 } from "../../Apis/garage";
import { IoIosArrowBack, IoMdClose } from "react-icons/io";
import ActionBar from "../Garage/components/ActionBar";
import GarageListComponent from "../Garage/components/GarageListComponent";
import { searchKeywordFuelStation } from "../../Apis/fuelStation";
import FuelStationListComponent from "./Components/FuelStationListComponent";
import SearchField from "../../components/InputFields/SearchField";

export default function FuelStationList() {
  const { llFromDistance, location } = useGeoLocationData();
  const {
    loading,
    homeSearchData,
    setHomeSearchData,
    subServices,
    makes,
    models,
    totalGarageFound,
    setTotalGarageFound,
    setFuelStations,
  } = useData();
  const [locationDistanceRange, setLocationDistanceRange] = useState(3);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  console.log({ isFilterOpen });
  const { fuelStations } = useData();
  console.log({ fuelStations });

  // HANDLE THE DISTANCE CHANGE
  const handleDistanceChange = () => {
    const distanceData = llFromDistance({
      latitude: homeSearchData.start_lat || location?.latitude,
      longitude: homeSearchData.start_long || location?.longitude,
      distance: Math.sqrt(2) * (locationDistanceRange * 1),
      bearing: 135,
    });

    setHomeSearchData((prev) => ({
      ...prev,
      start_lat: homeSearchData?.start_lat || location?.latitude,
      start_long: homeSearchData?.start_ong || location?.longitude,
      end_lat: distanceData?.latitude,
      end_long: distanceData?.longitude,
    }));
  };

  const [filterItems, setFilterItems] = useState([
    // SUB SERVICES
    {
      title: (
        <div className={`flex justify-between items-center gap-x-3`}>
          <span>Services</span>
          <span
            className={`flex justify-center items-center w-6 h-6 rounded-full bg-primary text-base-300 font-medium text-xs`}
          >
            {homeSearchData?.sub_services?.length}
          </span>
        </div>
      ),
      Content: (
        <div
          className={`flex  flex-col gap-2 max-h-[300px] overflow-y-auto scrollbar pb-4`}
        >
          {subServices?.map((service, index) => (
            <label
              key={index}
              htmlFor={`${service}-${index}`}
              className={`inline-flex items-start justify-start gap-x-2 hover:text-primary cursor-pointer`}
            >
              <input
                type="checkbox"
                id={`${service}-${index}`}
                checked={homeSearchData?.sub_services?.some(
                  (s) => s === service.id
                )}
                className={`checkbox-primary checkbox checkbox-sm`}
                onChange={(e) => {
                  if (e.target.checked) {
                    setHomeSearchData({
                      ...homeSearchData,
                      sub_services: [
                        ...homeSearchData.sub_services,
                        service.id,
                      ],
                    });
                  } else {
                    setHomeSearchData({
                      ...homeSearchData,
                      sub_services: homeSearchData.sub_services.filter(
                        (sub) => sub !== service.id
                      ),
                    });
                  }
                }}
              />{" "}
              {service?.name}
            </label>
          ))}
        </div>
      ),
    },

    // Location Distance Range
    {
      title: (
        <div className={`flex justify-between items-center gap-x-3`}>
          <span>Location Distance Range</span>
          <span
            className={`flex justify-center items-center gap-1 px-2 h-6 rounded-full bg-primary text-base-300 font-medium text-xs`}
          >
            <span>{locationDistanceRange}</span> <span>KM</span>
          </span>
        </div>
      ),
      Content: (
        <div className={`flex justify-between items-center gap-x-3 pb-5  pr-5`}>
          <input
            type="range"
            min={3}
            max={200}
            defaultValue={locationDistanceRange}
            className="range range-primary range-sm"
            step={1}
            onChange={(e) => {
              setLocationDistanceRange(parseInt(e.target.value));
            }}
            onMouseUp={handleDistanceChange}
          />
        </div>
      ),
    },
    // FUEL TIMING
    {
      title: (
        <div className={`flex justify-between items-center gap-x-3`}>
          <span>Timing</span>
          <span
            className={`flex justify-center items-center w-6 h-6 rounded-full bg-primary text-base-300 font-medium text-xs`}
          >
            {!!homeSearchData?.open_now ? 1 : 0}
          </span>
        </div>
      ),
      Content: (
        <div
          className={`flex flex-col gap-2 max-h-[300px] overflow-y-auto scrollbar pb-4`}
        >
          {/* OPEN NOW  */}
          <label
            htmlFor={`openNow`}
            className={`inline-flex items-start justify-start gap-x-2 hover:text-primary cursor-pointer`}
          >
            <input
              type="checkbox"
              id={`open_now`}
              checked={homeSearchData?.open_now}
              className={`checkbox-primary checkbox checkbox-sm`}
              onChange={(e) => {
                setHomeSearchData({
                  ...homeSearchData,
                  open_now: !!e.target.checked,
                });
              }}
            />
            Open Now
          </label>
        </div>
      ),
    },
  ]);

  useEffect(() => {
    let copyFilters = [...filterItems];
    copyFilters[3] = {
      title: (
        <div className={`flex justify-between items-center gap-x-3`}>
          <span>Location Distance Range</span>
          <span
            className={`flex justify-center items-center gap-1 px-2 h-6 rounded-full bg-primary text-base-300 font-medium text-xs`}
          >
            <span>{locationDistanceRange}</span> <span>KM</span>
          </span>
        </div>
      ),
      Content: (
        <div className={`flex justify-between items-center gap-x-3 pb-5  pr-5`}>
          <input
            type="range"
            min={3}
            max={200}
            defaultValue={locationDistanceRange}
            className="range range-primary range-sm"
            step={1}
            onChange={(e) => {
              setLocationDistanceRange(parseInt(e.target.value));
            }}
            onMouseUp={handleDistanceChange}
          />
        </div>
      ),
    };
    setFilterItems(copyFilters);
  }, [locationDistanceRange]);

  const [isLoading, setIsLoading] = useState(true);

  // GET DATA
  useEffect(() => {
    setIsLoading(true);
    // UPDATE FILTER ITEMS
    setFilterItems([
      // SUB SERVICES
      {
        title: (
          <div className={`flex justify-between items-center gap-x-3`}>
            <span>Services</span>
            <span
              className={`flex justify-center items-center w-6 h-6 rounded-full bg-primary text-base-300 font-medium text-xs`}
            >
              {homeSearchData?.sub_services?.length}
            </span>
          </div>
        ),
        Content: (
          <div className={`py-5`}>
            <SearchField contentWidth={"w-[90%]"} />
          </div>
        ),
      },

      // Location Distance Range
      {
        title: (
          <div className={`flex justify-between items-center gap-x-3`}>
            <span>Location Distance Range</span>
            <span
              className={`flex justify-center items-center gap-1 px-2 h-6 rounded-full bg-primary text-base-300 font-medium text-xs`}
            >
              <span>{locationDistanceRange}</span> <span>KM</span>
            </span>
          </div>
        ),
        Content: (
          <div
            className={`flex justify-between items-center gap-x-3 pb-5  pr-5`}
          >
            <input
              type="range"
              min={3}
              max={200}
              defaultValue={locationDistanceRange}
              className="range range-primary range-sm"
              step={1}
              onChange={(e) => {
                setLocationDistanceRange(parseInt(e.target.value));
              }}
              onMouseUp={handleDistanceChange}
            />
          </div>
        ),
      },
      // FUEL TIMING
      {
        title: (
          <div className={`flex justify-between items-center gap-x-3`}>
            <span>Timing</span>
            <span
              className={`flex justify-center items-center w-6 h-6 rounded-full bg-primary text-base-300 font-medium text-xs`}
            >
              {!!homeSearchData?.open_now ? 1 : 0}
            </span>
          </div>
        ),
        Content: (
          <div
            className={`flex flex-col gap-2 max-h-[300px] overflow-y-auto scrollbar pb-4`}
          >
            {/* OPEN NOW  */}
            <label
              htmlFor={`openNow`}
              className={`inline-flex items-start justify-start gap-x-2 hover:text-primary cursor-pointer`}
            >
              <input
                type="checkbox"
                id={`open_now`}
                checked={homeSearchData?.open_now}
                className={`checkbox-primary checkbox checkbox-sm`}
                onChange={(e) => {
                  setHomeSearchData({
                    ...homeSearchData,
                    open_now: !!e.target.checked,
                  });
                }}
              />
              Open Now
            </label>
          </div>
        ),
      },
    ]);
    setTimeout(() => {
      const filterData = localStorage.getItem("search_data")
        ? JSON.parse(localStorage.getItem("search_data"))
        : homeSearchData;

      console.log({ filterData });

      setIsLoading(true);
      if (filterData) {
        searchKeywordFuelStation({
          perPage: filterData?.perPage,
          page: filterData?.page,
          search_key: filterData?.search_key,

          address_line_1: filterData?.address,
          country: filterData?.country_code,
          city: filterData?.city,

          active_option_ids: [],
          start_lat: filterData?.start_lat,
          end_lat: filterData?.end_lat,
          start_long: filterData?.start_long,
          end_long: filterData?.end_long,
          time: filterData?.date_time,
        })
          .then((res) => {
            console.log({ res });
            if (res?.data?.data?.length === 0) {
              setTotalGarageFound(0);
              setFuelStations([]);
            } else {
              setTotalGarageFound(res?.data?.data?.length);
              setFuelStations(res?.data?.data);
            }
            setIsLoading(false);
          })
          .catch((error) => {
            handleApiError(error, "");
            setIsLoading(false);
          });
      }
    }, 200);
  }, [homeSearchData]);

  if (loading) {
    return <CustomLoading />;
  } else {
    return (
      <div data-cy="dashboard" className={`w-full`}>
        <div
          className={`relative h-full md:min-h-[calc(100vh-130px)] flex items-start `}
        >
          <div
            className={` fixed md:sticky bg-base-300 left-0 top-20 bottom-0 z-30 md:z-20  ${
              isFilterOpen ? "w-full sm:w-[300px] md:w-[400px]" : "w-0"
            }`}
          >
            {/* FILTERS  */}
            <div
              className={`sticky left-0 top-0 duration-100 md:w-full bg-base-300 border-r overflow-x-hidden`}
            >
              <div
                className={`pt-5 pb-4 text-primary border-b px-5 flex justify-between items-center`}
              >
                <Headings
                  className={`flex justify-start gap-3 items-center`}
                  level={3}
                >
                  <MdFilterList size={25} /> Filters
                </Headings>
                <div
                  className={`md:hidden`}
                  onClick={() => setIsFilterOpen(false)}
                >
                  <IoMdClose size={20} />
                </div>
              </div>
              <div
                className={`scrollbar-none min-h-[calc(100vh-245px)] max-h-[calc(100vh-245px)] md:min-h-[calc(100vh-305px)] md:max-h-[calc(100vh-305px)] overflow-y-auto overflow-x-hidden`}
              >
                <AccordionForFilter items={filterItems} />
              </div>
            </div>
          </div>

          {/* GARAGES OR JOB FORM  */}
          <div className={`relative w-full duration-100 `}>
            <div
              className={`sticky z-20 bg-base-300 top-0 right-0 w-full px-5 pt-5 pb-2 shadow-md`}
            >
              {/* ACTIONS  */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`${
                  isFilterOpen ? "btn-outline" : ""
                } btn-primary btn btn-sm mb-2`}
              >
                {isFilterOpen ? (
                  <IoMdClose size={20} />
                ) : (
                  <IoIosArrowBack className={`rotate-180`} size={20} />
                )}
                Filter
              </button>

              <>
                {/* SEARCH BAR  */}
                <div className={`flex items-center justify-between`}>
                  <div
                    data-auto={`search-container-home`}
                    className={`input flex input-primary py-1 pr-1 pl-5 border outline-none focus-visible:outline-none focus-within:outline-none bg-base-300 w-full h-[2.58rem] rounded-lg text-primary`}
                  >
                    <input
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                      }}
                      data-auto={`searchInput-home`}
                      type="text"
                      placeholder="Search Here..."
                      className={`w-full bg-transparent outline-none focus-visible:outline-none focus-within:outline-none focus:outline-none`}
                    />
                    <button
                      onClick={() => {
                        setHomeSearchData((prev) => ({
                          ...prev,
                          search_key: searchQuery,
                        }));
                      }}
                      data-auto={`searchButton-home`}
                      className={`btn  btn-sm  h-full btn-primary w-24 sm:w-24`}
                    >
                      Search
                    </button>
                  </div>
                </div>
                <p
                  data-auto={`totalRestaurant-home`}
                  className={`font-bold pt-2`}
                >
                  {totalGarageFound}{" "}
                  {totalGarageFound > 1 ? "Fuel Stations" : "Fuel Station"} were
                  found
                </p>
              </>
            </div>

            {/* MAIN SECTION  */}
            <div className={`pt-5 px-5 pb-5 scrollbar  overflow-y-auto`}>
              {isLoading ? (
                <CustomLoading h="h-[300px]" />
              ) : (
                <div>
                  <FuelStationListComponent />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
