import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { IoIosArrowDown, IoIosWifi } from "react-icons/io";
import { MdFilterList, MdSettingsRemote } from "react-icons/md";
import Headings from "../../../../components/Headings/Headings";
import { useData } from "../../../../context/DataContext";
import { calculateLatLongBounds } from "../../../../utils/map";

export default function FilterSideBar({ isFilterOpen, setIsFilterOpen }) {
  const [isLoading, setIsLoading] = useState(true);
  const {
    homeSearchData,

    setFilterDataToLocalStorage,
    subServices,
    makes,
    models,
    loading,
  } = useData();
  const filterData = localStorage.getItem("search_data")
    ? JSON.parse(localStorage.getItem("search_data"))
    : homeSearchData;

  const [isOpen, setIsOpen] = useState({
    Services: { id: 1, name: "Services", status: false },
    Make: { id: 2, name: "Make", status: false },
    Model: { id: 3, name: "Model", status: false },
    Distance: { id: 4, name: "Distance", status: false },
    Others: { id: 5, name: "Others", status: false },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  });

  // DISTANCE
  const [distance, setDistance] = useState(homeSearchData?.distance);

  useEffect(() => {
    setDistance(homeSearchData?.distance);
  }, [homeSearchData?.distance]);

  // HANDLE THE DISTANCE CHANGE
  const handleDistanceChange = () => {
    const distanceData = calculateLatLongBounds({
      lat: filterData?.lat,
      lon: filterData?.long,
      radiusInKm: distance,
    });

    setFilterDataToLocalStorage({
      ...homeSearchData,
      start_lat: distanceData?.minLat,
      end_lat: distanceData?.maxLat,

      start_long: distanceData?.minLon,
      end_long: distanceData?.maxLon,

      distance: distance,
    });
  };

  return (
    <div
      data-auto={`container-filterSideBar`}
      className={` fixed md:sticky bg-base-300 left-0 top-20 bottom-0 z-30 md:z-20  ${
        isFilterOpen ? "w-full sm:w-[300px] md:w-[400px]" : "w-0"
      }`}
    >
      {/* FILTERS  */}
      <div
        data-auto={`filters-container-filterSideBar`}
        className={`sticky left-0 top-0 duration-100 md:w-full bg-base-300 border-r overflow-x-hidden`}
      >
        {/* HEADER  */}
        <div
          data-auto={`heading-container-filterSideBar`}
          className={`pt-5 pb-4 text-primary border-b-2 shadow px-5 flex justify-between items-center`}
        >
          <Headings
            className={`flex justify-start gap-3 items-center`}
            level={3}
          >
            <MdFilterList size={25} /> Filters
          </Headings>

          <div
            data-auto={`close-filterSideBar`}
            className={`md:hidden cursor-pointer absolute high-zindex top-3 right-3 w-9 h-9 rounded-full bg-primary-content flex justify-center items-center`}
            onClick={() => setIsFilterOpen(false)}
          >
            <FiX className="text-primary text-xl" />
          </div>
        </div>

        {/* FILTER BODY  */}
        <div
          data-auto={`filterBody-filterSideBar`}
          className={`scrollbar-none min-h-[calc(100vh-205px)] max-h-[calc(100vh-205px)] md:h-screen overflow-y-auto overflow-x-hidden`}
        >
          {loading || isLoading ? (
            // LOADING
            <div className={`h-full w-full flex flex-col justify-start`}>
              <div
                className={`bg-base-300 flex items-center justify-between py-5 border-y-2 border-dotted w-full px-5`}
              >
                <div className={`flex items-center gap-5`}>
                  <div
                    className={` h-5 w-32 rounded-full bg-slate-300 animate-pulse`}
                  ></div>
                  <div
                    className={` rounded-full w-5 h-5 bg-slate-300 animate-pulse`}
                  ></div>
                </div>
                <div
                  className={`w-2 h-2 rounded-full bg-slate-300 animate-pulse`}
                ></div>
              </div>
              <div
                className={`bg-base-300 flex items-center justify-between py-5 border-y-2 border-dotted w-full px-5`}
              >
                <div className={`flex items-center gap-5`}>
                  <div
                    className={` h-5 w-32 rounded-full bg-slate-300 animate-pulse`}
                  ></div>
                  <div
                    className={` rounded-full w-5 h-5 bg-slate-300 animate-pulse`}
                  ></div>
                </div>
                <div
                  className={`w-2 h-2 rounded-full bg-slate-300 animate-pulse`}
                ></div>
              </div>
              <div
                className={`bg-base-300 flex items-center justify-between py-5 border-y-2 border-dotted w-full px-5`}
              >
                <div className={`flex items-center gap-5`}>
                  <div
                    className={` h-5 w-32 rounded-full bg-slate-300 animate-pulse`}
                  ></div>
                  <div
                    className={` rounded-full w-5 h-5 bg-slate-300 animate-pulse`}
                  ></div>
                </div>
                <div
                  className={`w-2 h-2 rounded-full bg-slate-300 animate-pulse`}
                ></div>
              </div>
              <div
                className={`bg-base-300 flex items-center justify-between py-5 border-y-2 border-dotted w-full px-5`}
              >
                <div className={`flex items-center gap-5`}>
                  <div
                    className={` h-5 w-32 rounded-full bg-slate-300 animate-pulse`}
                  ></div>
                  <div
                    className={` rounded-full w-5 h-5 bg-slate-300 animate-pulse`}
                  ></div>
                </div>
                <div
                  className={`w-2 h-2 rounded-full bg-slate-300 animate-pulse`}
                ></div>
              </div>
              <div
                className={`bg-base-300 flex items-center justify-between py-5 border-y-2 border-dotted w-full px-5`}
              >
                <div className={`flex items-center gap-5`}>
                  <div
                    className={` h-5 w-32 rounded-full bg-slate-300 animate-pulse`}
                  ></div>
                  <div
                    className={` rounded-full w-5 h-5 bg-slate-300 animate-pulse`}
                  ></div>
                </div>
                <div className={`w-2 h-2 bg-slate-300 animate-pulse`}></div>
              </div>
            </div>
          ) : (
            <div
              data-auto={`service-container-filterSideBar`}
              className="max-w-2xl mx-auto bg-base-300"
            >
              {/* SERVICES  */}
              <div className="border-b-2   border-gray-300 border-dotted">
                <button
                  data-auto={`services-button-filterSideBar`}
                  className="w-full shadow text-left p-4 focus:outline-none"
                  onClick={() =>
                    setIsOpen({
                      ...isOpen,
                      Services: {
                        ...isOpen["Services"],
                        status: !isOpen["Services"]?.status,
                      },
                    })
                  }
                >
                  <div className="flex justify-between items-center ">
                    {/* START TITLE  */}
                    <div
                      className={`flex justify-between items-center gap-x-3`}
                    >
                      <span>Services</span>
                      <span
                        className={`flex justify-center items-center w-6 h-6 rounded-full bg-primary text-base-300 font-medium text-xs`}
                      >
                        {homeSearchData?.sub_services?.length}
                      </span>
                    </div>
                    {/* END TITLE  */}

                    <span
                      className={`${
                        isOpen["Services"]?.status ? "rotate-180" : ""
                      } transition-all duration-200`}
                    >
                      <IoIosArrowDown />
                    </span>
                  </div>
                </button>

                {isOpen["Services"].status && (
                  <div
                    data-auto={`services-filterSideBar`}
                    className="pl-4 bg-base-300 "
                  >
                    {" "}
                    <div
                      className={`flex pt-5 flex-col gap-2 max-h-[300px] overflow-y-auto scrollbar pb-4`}
                    >
                      {subServices?.map((service, index) => (
                        <label
                          data-auto={`service${index + 1}-filterSideBar`}
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
                            name={"service"}
                            className={`checkbox-primary checkbox checkbox-sm`}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilterDataToLocalStorage({
                                  ...homeSearchData,
                                  sub_services: [
                                    ...homeSearchData.sub_services,
                                    service.id,
                                  ],
                                });
                              } else {
                                setFilterDataToLocalStorage({
                                  ...homeSearchData,
                                  sub_services:
                                    homeSearchData.sub_services.filter(
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
                  </div>
                )}
              </div>

              {/* MAKE  */}
              <div
                data-auto={`make-container-filterSideBar`}
                className="border-b-2 border-gray-300 border-dotted"
              >
                <button
                  data-auto={`makes-button-filterSideBar`}
                  className="w-full shadow text-left p-4 focus:outline-none"
                  onClick={() =>
                    setIsOpen({
                      ...isOpen,
                      Make: {
                        ...isOpen["Make"],
                        status: !isOpen["Make"]?.status,
                      },
                    })
                  }
                >
                  <div className="flex justify-between items-center ">
                    <div
                      className={`flex justify-between items-center gap-x-3`}
                    >
                      <span>Makes</span>
                      <span
                        className={`flex justify-center items-center w-6 h-6 rounded-full bg-primary text-base-300 font-medium text-xs`}
                      >
                        {homeSearchData?.makes?.length}
                      </span>
                    </div>
                    <span
                      className={`${
                        isOpen["Make"]?.status ? "rotate-180" : ""
                      } transition-all duration-200`}
                    >
                      <IoIosArrowDown />
                    </span>
                  </div>
                </button>
                {isOpen["Make"].status && (
                  <div
                    data-auto={`makes-filterSideBar`}
                    className="pl-4 bg-base-300"
                  >
                    {/* CONTENT  */}
                    <div
                      className={`flex pt-5 flex-col gap-2 max-h-[300px] overflow-y-auto scrollbar pb-4`}
                    >
                      {makes?.map((make, index) => (
                        <label
                          data-auto={`make${index + 1}-filterSideBar`}
                          key={index}
                          htmlFor={`${make?.name}-${index}`}
                          className={`inline-flex items-start justify-start gap-x-2 hover:text-primary cursor-pointer`}
                        >
                          <input
                            type="radio"
                            id={`${make?.name}-${index}`}
                            checked={homeSearchData?.makes?.some(
                              (s) => s === make.id
                            )}
                            name="make"
                            className={`radio-primary radio checkbox-sm`}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilterDataToLocalStorage({
                                  ...homeSearchData,
                                  makes: [make.id],
                                });
                              } else {
                                setFilterDataToLocalStorage({
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
                  </div>
                )}
              </div>

              {/* MODEL  */}
              {homeSearchData.makes?.length > 0 && (
                <div
                  data-auto={`model-container-filterSideBar`}
                  className="border-b-2 border-gray-300 border-dotted"
                >
                  <button
                    data-auto={`model-button-filterSideBar`}
                    className="w-full shadow text-left p-4 focus:outline-none"
                    onClick={() =>
                      setIsOpen({
                        ...isOpen,
                        Model: {
                          ...isOpen["Model"],
                          status: !isOpen["Model"]?.status,
                        },
                      })
                    }
                  >
                    <div className="flex justify-between items-center ">
                      <div
                        className={`flex justify-between items-center gap-x-3`}
                      >
                        <span>Models</span>
                        <span
                          className={`flex justify-center items-center w-6 h-6 rounded-full bg-primary text-base-300 font-medium text-xs`}
                        >
                          {homeSearchData?.models?.length}
                        </span>
                      </div>
                      <span
                        className={`${
                          isOpen["Model"]?.status ? "rotate-180" : ""
                        } transition-all duration-200`}
                      >
                        <IoIosArrowDown />
                      </span>
                    </div>
                  </button>
                  {isOpen["Model"].status && (
                    <div
                      data-auto={`models-filterSideBar`}
                      className="pl-4 bg-base-300"
                    >
                      {/* CONTENT  */}
                      <div
                        className={`flex pt-5 flex-col gap-2 max-h-[300px] overflow-y-auto scrollbar pb-4`}
                      >
                        {models
                          ?.filter((make) =>
                            homeSearchData.makes?.some(
                              (make2) => make2 === make?.automobile_make_id
                            )
                          )
                          .map((model, index) => (
                            <label
                              data-auto={`model${index + 1}-filterSideBar`}
                              key={index}
                              htmlFor={`${model?.name}-${index}`}
                              className={`inline-flex items-start justify-start gap-x-2 hover:text-primary cursor-pointer`}
                            >
                              <input
                                type="radio"
                                id={`${model?.name}-${index}`}
                                checked={homeSearchData?.models?.some(
                                  (s) => s === model.id
                                )}
                                name="model"
                                className={`radio-primary radio radio-sm`}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setFilterDataToLocalStorage({
                                      ...homeSearchData,
                                      models: [model.id],
                                    });
                                  } else {
                                    setFilterDataToLocalStorage({
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
                    </div>
                  )}
                </div>
              )}

              {/* Distance  */}
              {!!homeSearchData?.address && (
                <div
                  data-auto={`distance-container-filterSideBar`}
                  className="border-b-2 border-gray-300 border-dotted"
                >
                  <button
                    data-auto={`distance-button-filterSideBar`}
                    className="w-full shadow text-left p-4 focus:outline-none"
                    onClick={() =>
                      setIsOpen({
                        ...isOpen,
                        Distance: {
                          ...isOpen["Distance"],
                          status: !isOpen["Distance"]?.status,
                        },
                      })
                    }
                  >
                    <div className="flex justify-between items-center ">
                      <div
                        className={`flex justify-between items-center gap-x-3`}
                      >
                        <span>Distance</span>
                        <span
                          className={`flex justify-center items-center gap-1 px-2 h-6 rounded-full bg-primary text-base-300 font-medium text-xs`}
                        >
                          <span>{distance}</span> <span>KM</span>
                        </span>
                      </div>
                      <span
                        className={`${
                          isOpen["Distance"]?.status ? "rotate-180" : ""
                        } transition-all duration-200`}
                      >
                        <IoIosArrowDown />
                      </span>
                    </div>
                  </button>
                  {isOpen["Distance"].status && (
                    <div
                      data-auto={`distances-filterSideBar`}
                      className="pl-4 bg-base-300"
                    >
                      {/* CONTENT  */}
                      <div
                        className={`flex pt-5 justify-between items-center gap-x-3 pb-5  pr-5`}
                      >
                        <input
                          data-auto={`distance-input-filterSideBar`}
                          type="range"
                          min={3}
                          max={200}
                          value={distance}
                          className="range range-primary range-sm"
                          step={1}
                          onChange={(e) =>
                            setDistance(parseInt(e.target.value))
                          }
                          onMouseUp={handleDistanceChange}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Others  */}
              <div
                data-auto={`others-container-filterSideBar`}
                className="border-b-2 border-gray-300 border-dotted"
              >
                <button
                  data-auto={`others-button-filterSideBar`}
                  className="shadow w-full text-left p-4 focus:outline-none"
                  onClick={() =>
                    setIsOpen({
                      ...isOpen,
                      Others: {
                        ...isOpen["Others"],
                        status: !isOpen["Others"]?.status,
                      },
                    })
                  }
                >
                  <div className="flex justify-between items-center ">
                    <div
                      className={`flex justify-between items-center gap-x-3`}
                    >
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
                    <span
                      className={`${
                        isOpen["Others"]?.status ? "rotate-180" : ""
                      } transition-all duration-200`}
                    >
                      <IoIosArrowDown />
                    </span>
                  </div>
                </button>
                {isOpen["Others"].status && (
                  <div
                    data-auto={`others-filterSideBar`}
                    className="pl-4 bg-base-300"
                  >
                    {/* CONTENT  */}
                    <div className={`pt-5 grid grid-cols-2 gap-5 pr-5 pb-5`}>
                      {/* WIFI  */}
                      <button
                        data-auto={`wifi-filterSideBar`}
                        onClick={() => {
                          setFilterDataToLocalStorage({
                            ...homeSearchData,
                            wifi_available: !homeSearchData?.wifi_available,
                          });
                        }}
                        className={`${
                          homeSearchData?.wifi_available
                            ? "text-primary bg-primary-content border-primary"
                            : "border-gray-300 text-gray-400 bg-base-300"
                        } flex justify-center items-center gap-2 flex-col p-5 border-2 rounded-xl`}
                      >
                        <IoIosWifi
                          className={`${
                            homeSearchData?.wifi_available
                              ? "text-primary"
                              : "text-gray-400"
                          } text-2xl`}
                        />
                        <span className={`text-xs`}>Wifi Available</span>
                      </button>

                      {/* REMOTE  */}
                      <button
                        data-auto={`remote-filterSideBar`}
                        onClick={() => {
                          setFilterDataToLocalStorage({
                            ...homeSearchData,
                            is_mobile_garage: !homeSearchData?.is_mobile_garage,
                          });
                        }}
                        className={`${
                          homeSearchData?.is_mobile_garage
                            ? "text-primary bg-primary-content border-primary"
                            : "border-gray-300 text-gray-400 bg-base-300"
                        } flex justify-center items-center gap-2 flex-col p-5 border-2 rounded-xl`}
                      >
                        <MdSettingsRemote
                          className={`${
                            homeSearchData?.is_mobile_garage
                              ? "text-primary"
                              : "text-gray-400"
                          } text-2xl`}
                        />
                        <span className={`text-xs`}>Remote Garage</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
