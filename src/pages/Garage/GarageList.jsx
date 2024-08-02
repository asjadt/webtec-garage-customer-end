import { useEffect, useState } from "react";
import { MdFilterList } from "react-icons/md";
import { getGarages } from "../../Apis/homepageapi";
import AccordionForFilter from "../../components/Accordion/Accordion";
import CustomLoading from "../../components/CustomLoading";
import Headings from "../../components/Headings/Headings";
import { useData } from "../../context/DataContext";
import { handleApiError } from "../../utils/apiErrorHandler";
import ActionBar from "./components/ActionBar";
import CreateAndUpdateJobForm from "./components/CreateAndUpdateJobForm";
import GarageListComponent from "./components/GarageListComponent";
import { useGeoLocationData } from "../../context/GeoLocationDataContext";
import { getGaragesV2 } from "../../Apis/garage";

export default function GarageList() {
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
    setGarageList,
  } = useData();
  const [locationDistanceRange, setLocationDistanceRange] = useState(3);
  const [tab, setTab] = useState("garages"); // ACCEPT "garages" OR "job"
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    // MAKES
    {
      title: (
        <div className={`flex justify-between items-center gap-x-3`}>
          <span>Makes</span>
          <span
            className={`flex justify-center items-center w-6 h-6 rounded-full bg-primary text-base-300 font-medium text-xs`}
          >
            {homeSearchData?.makes?.length}
          </span>
        </div>
      ),
      Content: (
        <div
          className={`flex flex-col gap-2 max-h-[300px] overflow-y-auto scrollbar pb-4`}
        >
          {makes?.map((make, index) => (
            <label
              key={index}
              htmlFor={`${make}-${index}`}
              className={`inline-flex items-start justify-start gap-x-2 hover:text-primary cursor-pointer`}
            >
              <input
                type="checkbox"
                id={`${make}-${index}`}
                checked={homeSearchData?.makes?.some((s) => s === make.id)}
                className={`checkbox-primary checkbox checkbox-sm`}
                onChange={(e) => {
                  if (e.target.checked) {
                    setHomeSearchData({
                      ...homeSearchData,
                      makes: [...homeSearchData.makes, make.id],
                    });
                  } else {
                    setHomeSearchData({
                      ...homeSearchData,
                      makes: homeSearchData.makes.filter(
                        (sub) => sub !== make.id
                      ),
                    });
                  }
                }}
              />{" "}
              {make?.name}
            </label>
          ))}
        </div>
      ),
    },
    // MODELS
    {
      title: (
        <div className={`flex justify-between items-center gap-x-3`}>
          <span>Models</span>
          <span
            className={`flex justify-center items-center w-6 h-6 rounded-full bg-primary text-base-300 font-medium text-xs`}
          >
            {homeSearchData?.models?.length}
          </span>
        </div>
      ),
      Content: (
        <div
          className={`flex flex-col gap-2 max-h-[300px] overflow-y-auto scrollbar pb-4`}
        >
          {models?.map((model, index) => (
            <label
              key={index}
              htmlFor={`${model}-${index}`}
              className={`inline-flex items-start justify-start gap-x-2 hover:text-primary cursor-pointer`}
            >
              <input
                type="checkbox"
                id={`${model}-${index}`}
                checked={homeSearchData?.models?.some((s) => s === model.id)}
                className={`checkbox-primary checkbox checkbox-sm`}
                onChange={(e) => {
                  if (e.target.checked) {
                    setHomeSearchData({
                      ...homeSearchData,
                      models: [...homeSearchData.models, model.id],
                    });
                  } else {
                    setHomeSearchData({
                      ...homeSearchData,
                      models: homeSearchData.models.filter(
                        (sub) => sub !== model.id
                      ),
                    });
                  }
                }}
              />{" "}
              {model?.name}
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
            className={`flex justify-center items-center px-2 h-6 rounded-full bg-primary text-base-300 font-medium text-xs`}
          >
            {locationDistanceRange} KM
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
    // Others
    {
      title: (
        <div className={`flex justify-between items-center gap-x-3`}>
          <span>Others</span>
          <span
            className={`flex justify-center items-center w-6 h-6 rounded-full bg-primary text-base-300 font-medium text-xs`}
          >
            {!!homeSearchData?.wifi_available &&
            !!homeSearchData?.is_mobile_garage
              ? 2
              : !!homeSearchData?.wifi_available ||
                !!homeSearchData?.is_mobile_garage
              ? 1
              : 0}
          </span>
        </div>
      ),
      Content: (
        <div
          className={`flex flex-col gap-2 max-h-[300px] overflow-y-auto scrollbar pb-4`}
        >
          {/* WIFI  */}
          <label
            htmlFor={`wifi`}
            className={`inline-flex items-start justify-start gap-x-2 hover:text-primary cursor-pointer`}
          >
            <input
              type="checkbox"
              id={`wifi`}
              checked={homeSearchData?.wifi_available}
              className={`checkbox-primary checkbox checkbox-sm`}
              onChange={(e) => {
                setHomeSearchData({
                  ...homeSearchData,
                  wifi_available: !!e.target.checked,
                });
              }}
            />
            Wifi
          </label>

          {/* Remote Garage  */}
          <label
            htmlFor={`remote_garage`}
            className={`inline-flex items-start justify-start gap-x-2 hover:text-primary cursor-pointer`}
          >
            <input
              type="checkbox"
              id={`remote_garage`}
              checked={homeSearchData?.is_mobile_garage}
              className={`checkbox-primary checkbox checkbox-sm`}
              onChange={(e) => {
                setHomeSearchData({
                  ...homeSearchData,
                  is_mobile_garage: !!e.target.checked,
                });
              }}
            />
            Remote Garage
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
            className={`flex justify-center items-center px-2 h-6 rounded-full bg-primary text-base-300 font-medium text-xs`}
          >
            {locationDistanceRange} KM
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
      // MAKES
      {
        title: (
          <div className={`flex justify-between items-center gap-x-3`}>
            <span>Makes</span>
            <span
              className={`flex justify-center items-center w-6 h-6 rounded-full bg-primary text-base-300 font-medium text-xs`}
            >
              {homeSearchData?.makes?.length}
            </span>
          </div>
        ),
        Content: (
          <div
            className={`flex flex-col gap-2 max-h-[300px] overflow-y-auto scrollbar pb-4`}
          >
            {makes?.map((make, index) => (
              <label
                key={index}
                htmlFor={`${make}-${index}`}
                className={`inline-flex items-start justify-start gap-x-2 hover:text-primary cursor-pointer`}
              >
                <input
                  type="checkbox"
                  id={`${make}-${index}`}
                  checked={homeSearchData?.makes?.some((s) => s === make.id)}
                  className={`checkbox-primary checkbox checkbox-sm`}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setHomeSearchData({
                        ...homeSearchData,
                        makes: [...homeSearchData.makes, make.id],
                      });
                    } else {
                      setHomeSearchData({
                        ...homeSearchData,
                        makes: homeSearchData.makes.filter(
                          (sub) => sub !== make.id
                        ),
                      });
                    }
                  }}
                />{" "}
                {make?.name}
              </label>
            ))}
          </div>
        ),
      },
      // MODELS
      {
        title: (
          <div className={`flex justify-between items-center gap-x-3`}>
            <span>Models</span>
            <span
              className={`flex justify-center items-center w-6 h-6 rounded-full bg-primary text-base-300 font-medium text-xs`}
            >
              {homeSearchData?.models?.length}
            </span>
          </div>
        ),
        Content: (
          <div
            className={`flex flex-col gap-2 max-h-[300px] overflow-y-auto scrollbar pb-4`}
          >
            {models?.map((model, index) => (
              <label
                key={index}
                htmlFor={`${model}-${index}`}
                className={`inline-flex items-start justify-start gap-x-2 hover:text-primary cursor-pointer`}
              >
                <input
                  type="checkbox"
                  id={`${model}-${index}`}
                  checked={homeSearchData?.models?.some((s) => s === model.id)}
                  className={`checkbox-primary checkbox checkbox-sm`}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setHomeSearchData({
                        ...homeSearchData,
                        models: [...homeSearchData.models, model.id],
                      });
                    } else {
                      setHomeSearchData({
                        ...homeSearchData,
                        models: homeSearchData.models.filter(
                          (sub) => sub !== model.id
                        ),
                      });
                    }
                  }}
                />{" "}
                {model?.name}
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
              className={`flex justify-center items-center px-2 h-6 rounded-full bg-primary text-base-300 font-medium text-xs`}
            >
              {locationDistanceRange} KM
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
      // Others
      {
        title: (
          <div className={`flex justify-between items-center gap-x-3`}>
            <span>Others</span>
            <span
              className={`flex justify-center items-center w-6 h-6 rounded-full bg-primary text-base-300 font-medium text-xs`}
            >
              {!!homeSearchData?.wifi_available &&
              !!homeSearchData?.is_mobile_garage
                ? 2
                : !!homeSearchData?.wifi_available ||
                  !!homeSearchData?.is_mobile_garage
                ? 1
                : 0}
            </span>
          </div>
        ),
        Content: (
          <div
            className={`flex flex-col gap-2 max-h-[300px] overflow-y-auto scrollbar pb-4`}
          >
            {/* WIFI  */}
            <label
              htmlFor={`wifi`}
              className={`inline-flex items-start justify-start gap-x-2 hover:text-primary cursor-pointer`}
            >
              <input
                type="checkbox"
                id={`wifi`}
                checked={homeSearchData?.wifi_available}
                className={`checkbox-primary checkbox checkbox-sm`}
                onChange={(e) => {
                  setHomeSearchData({
                    ...homeSearchData,
                    wifi_available: !!e.target.checked,
                  });
                }}
              />
              Wifi
            </label>

            {/* Remote Garage  */}
            <label
              htmlFor={`remote_garage`}
              className={`inline-flex items-start justify-start gap-x-2 hover:text-primary cursor-pointer`}
            >
              <input
                type="checkbox"
                id={`remote_garage`}
                checked={homeSearchData?.is_mobile_garage}
                className={`checkbox-primary checkbox checkbox-sm`}
                onChange={(e) => {
                  setHomeSearchData({
                    ...homeSearchData,
                    is_mobile_garage: !!e.target.checked,
                  });
                }}
              />
              Remote Garage
            </label>
          </div>
        ),
      },
    ]);
    setTimeout(() => {
      const filterData = localStorage.getItem("search_data")
        ? JSON.parse(localStorage.getItem("search_data"))
        : homeSearchData;

      setIsLoading(true);
      if (filterData) {
        getGaragesV2({
          perPage: filterData?.perPage,
          search_key: filterData?.search_key,
          country_code: filterData?.country_code,
          address: filterData?.address,
          city: filterData?.city,
          service_ids: filterData?.services,
          sub_service_ids: filterData?.sub_services,
          make_ids: filterData?.makes,
          model_ids: filterData?.models,

          start_lat: filterData?.start_lat,
          end_lat: filterData?.end_lat,
          start_long: filterData?.start_long,
          end_long: filterData?.end_long,

          wifi_available: filterData?.wifi_available,
          is_mobile_garage: filterData?.is_mobile_garage,
          page: filterData?.page,
          date_time: filterData?.date_time,
        })
          .then((res) => {
            if (res?.data?.data?.length === 0) {
              setTotalGarageFound(0);
              setGarageList([]);
              setTab("job");
            } else {
              setTotalGarageFound(5);
              setGarageList(res?.data?.data);
              setTab("garage");
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
          className={`relative min-h-[calc(100vh-180px)] md:min-h-[calc(100vh-130px)] flex items-start`}
        >
          <div
            className={` sticky bg-base-300 left-0 top-0 z-20 ${
              isFilterOpen ? "w-full md:w-[400px]" : "w-0"
            }`}
          >
            {/* FILTERS  */}
            <div
              className={`sticky top-0 duration-100 w-full bg-base-300 border-r overflow-x-hidden`}
            >
              <div
                className={`pt-5 pb-4 text-primary border-b px-5 flex flex-col md:flex-row justify-between items-center`}
              >
                <Headings
                  className={`flex justify-start gap-3 items-center`}
                  level={3}
                >
                  <MdFilterList size={25} /> Filters
                </Headings>
              </div>
              <div
                className={`scrollbar-none min-h-[calc(100vh-245px)] max-h-[calc(100vh-245px)] md:min-h-[calc(100vh-305px)] md:max-h-[calc(100vh-305px)] overflow-y-auto overflow-x-hidden`}
              >
                <AccordionForFilter items={filterItems} />
              </div>
            </div>
          </div>

          {/* GARAGES OR JOB FORM  */}
          <div className={`relative w-full duration-100`}>
            <div
              className={`sticky z-20 bg-base-300 top-0 right-0 w-full px-5 pt-5 pb-2 shadow-md`}
            >
              {/* ACTIONS  */}
              <ActionBar
                tab={tab}
                setTab={setTab}
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
              />

              {tab === "garage" && (
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
                    {totalGarageFound > 1 ? "Garages" : "Garage"} were found
                  </p>
                </>
              )}
            </div>

            {/* MAIN SECTION  */}
            <div
              className={`${
                tab === "garage" ? "pt-5 px-5 " : ""
              } max-h-[calc(100vh-320px)] md:max-h-[calc(100vh-150px)] pb-5 scrollbar overflow-y-auto`}
            >
              {isLoading ? (
                <CustomLoading h="h-[300px]" />
              ) : (
                <div>
                  {tab === "garage" && <GarageListComponent />}
                  {tab === "job" && <CreateAndUpdateJobForm />}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
