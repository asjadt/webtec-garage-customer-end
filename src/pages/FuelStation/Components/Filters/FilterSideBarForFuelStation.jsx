import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { IoTimeOutline } from "react-icons/io5";
import { MdFilterList } from "react-icons/md";
import Headings from "../../../../components/Headings/Headings";
import { useData } from "../../../../context/DataContext";
import { calculateLatLongBounds } from "../../../../utils/map";
import moment from "moment";
export default function FilterSideBarForFuelStation({
  isFilterOpen,
  setIsFilterOpen,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const {
    fuelStationSearchData,
    fuelStationServices,
    setFuelStationFilterDataToLocalStorage,
    loading,
  } = useData();
  const filterData = localStorage.getItem("search_data_for_fuel_station")
    ? JSON.parse(localStorage.getItem("search_data_for_fuel_station"))
    : fuelStationSearchData;

  const [isOpen, setIsOpen] = useState({
    Services: { id: 1, name: "Services", status: false },
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
  const [distance, setDistance] = useState(fuelStationSearchData?.distance);

  useEffect(() => {
    setDistance(fuelStationSearchData?.distance);
  }, [fuelStationSearchData?.distance]);

  // HANDLE THE DISTANCE CHANGE
  const handleDistanceChange = () => {
    const distanceData = calculateLatLongBounds({
      lat: filterData?.lat,
      lon: filterData?.long,
      radiusInKm: distance,
    });

    setFuelStationFilterDataToLocalStorage({
      ...fuelStationSearchData,

      start_lat: distanceData?.minLat,
      end_lat: distanceData?.maxLat,
      start_long: distanceData?.minLon,
      end_long: distanceData?.maxLon,

      distance: distance,
    });
  };

  return (
    <div
      className={` fixed md:sticky bg-base-300 left-0 top-20 bottom-0 z-30 md:z-20  ${
        isFilterOpen ? "w-full sm:w-[300px] md:w-[400px]" : "w-0"
      }`}
    >
      {/* FILTERS  */}
      <div
        className={`sticky left-0 top-0 duration-100 md:w-full bg-base-300 border-r overflow-x-hidden`}
      >
        {/* HEADER  */}
        <div
          className={`pt-5 pb-4 text-primary border-b-2 shadow px-5 flex justify-between items-center`}
        >
          <Headings
            className={`flex justify-start gap-3 items-center`}
            level={3}
          >
            <MdFilterList size={25} /> Filters
          </Headings>

          <div
            className={`md:hidden cursor-pointer absolute high-zindex top-3 right-3 w-9 h-9 rounded-full bg-primary-content flex justify-center items-center`}
            onClick={() => setIsFilterOpen(false)}
          >
            <FiX className="text-primary text-xl" />
          </div>
        </div>

        {/* FILTER BODY  */}
        <div
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
            <div className="max-w-2xl mx-auto bg-base-300">
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
                        {fuelStationSearchData?.services?.length}
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
                      {fuelStationServices?.map((service, index) => (
                        <label
                          data-auto={`service${index + 1}-filterSideBar`}
                          key={index}
                          htmlFor={`${service}-${index}`}
                          className={`inline-flex items-start justify-start gap-x-2 hover:text-primary cursor-pointer`}
                        >
                          <input
                            type="checkbox"
                            id={`${service}-${index}`}
                            checked={fuelStationSearchData?.services?.some(
                              (s) => s === service.id
                            )}
                            name={"service"}
                            className={`checkbox-primary checkbox checkbox-sm`}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFuelStationFilterDataToLocalStorage({
                                  ...fuelStationSearchData,
                                  services: [
                                    ...fuelStationSearchData.services,
                                    service.id,
                                  ],
                                });
                              } else {
                                setFuelStationFilterDataToLocalStorage({
                                  ...fuelStationSearchData,
                                  services:
                                    fuelStationSearchData.services.filter(
                                      (sub) => sub !== service.id
                                    ),
                                });
                              }
                            }}
                          />{" "}
                          <span className={`flex gap-x-2 items-center`}>
                            <span>
                              <i className={service.icon} />
                            </span>{" "}
                            <span>{service?.name}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Distance  */}
              {!!fuelStationSearchData?.address && (
                <div className="border-b-2 border-gray-300 border-dotted">
                  <button
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

                  {isOpen["Distance"]?.status && (
                    <div className="pl-4 bg-base-300">
                      {/* CONTENT  */}
                      <div
                        className={`flex pt-5 justify-between items-center gap-x-3 pb-5  pr-5`}
                      >
                        <input
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
              <div className="border-b-2 border-gray-300 border-dotted">
                <button
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
                      {!!fuelStationSearchData?.time && (
                        <span
                          className={`flex justify-center items-center w-20 h-6 rounded-full bg-primary text-base-300 font-medium text-xs`}
                        >
                          {fuelStationSearchData?.time ? "Open Now" : ""}
                        </span>
                      )}
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
                {isOpen["Others"]?.status && (
                  <div className="pl-4 bg-base-300">
                    {/* CONTENT  */}
                    <div className={`pt-5 grid grid-cols-2 gap-5 pr-5 pb-5`}>
                      {/* open now  */}
                      <button
                        onClick={() => {
                          setFuelStationFilterDataToLocalStorage({
                            ...fuelStationSearchData,
                            time: fuelStationSearchData?.time
                              ? ""
                              : moment().format("HH:mm"),
                          });
                        }}
                        className={`${
                          fuelStationSearchData?.time
                            ? "text-primary bg-primary-content border-primary"
                            : "border-gray-300 text-gray-400 bg-base-300"
                        } flex justify-center items-center gap-2 flex-col p-5 border-2 rounded-xl`}
                      >
                        <IoTimeOutline
                          className={`${
                            fuelStationSearchData?.time
                              ? "text-primary"
                              : "text-gray-400"
                          } text-2xl`}
                        />
                        <span className={`text-xs`}>Open Now</span>
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
