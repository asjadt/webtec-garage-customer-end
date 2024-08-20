import { BiReset } from "react-icons/bi";
import { FiX } from "react-icons/fi";
import { useData } from "../../../../context/DataContext";
import { calculateLatLongBounds } from "../../../../utils/map";

export default function SelectedFiltersForFuelStation() {
  const {
    fuelStationSearchData,
    fuelStationServices,
    setFuelStationFilterDataToLocalStorage,
  } = useData();

  const filterData = localStorage.getItem("search_data_for_fuel_station")
    ? JSON.parse(localStorage.getItem("search_data_for_fuel_station"))
    : fuelStationSearchData;

  return (
    <div className={`w-full inline-block`}>
      {/* SERVICES  */}
      {fuelStationServices
        ?.filter((s) =>
          fuelStationSearchData?.services?.some((s2) => s.id === s2)
        )
        .map((item, index) => (
          <div
            key={index}
            className={`inline-flex items-center justify-between gap-x-2 py-2 px-3 bg-primary-content border-2 border-primary rounded-full text-primary font-medium text-xs m-1`}
          >
            <span>
              <i className={item.icon} />
            </span>{" "}
            <span>{item?.name}</span>
            <FiX
              className={`cursor-pointer`}
              onClick={() => {
                setFuelStationFilterDataToLocalStorage({
                  ...fuelStationSearchData,
                  services: fuelStationSearchData?.services?.filter(
                    (sub) => sub !== item.id
                  ),
                });
              }}
              size={18}
            />
          </div>
        ))}

      {/* DISTANCE  */}
      {!!fuelStationSearchData?.distance && (
        <div
          className={`inline-flex items-center justify-between gap-x-2 py-2 px-3 bg-primary-content border-2 border-primary rounded-full text-primary font-medium text-xs m-1`}
        >
          {fuelStationSearchData?.distance} KM{" "}
          <BiReset
            className={`cursor-pointer`}
            onClick={() => {
              const distanceData = calculateLatLongBounds({
                lat: filterData?.lat,
                lon: filterData?.long,
                radiusInKm: 3,
              });
              setFuelStationFilterDataToLocalStorage({
                ...fuelStationSearchData,
                distance: 3,

                start_lat: distanceData?.minLat,
                end_lat: distanceData?.maxLat,

                start_long: distanceData?.minLon,
                end_long: distanceData?.maxLon,
              });
            }}
            size={18}
          />
        </div>
      )}

      {/* WIFI  */}
      {!!fuelStationSearchData?.wifi_available && (
        <div
          className={`inline-flex items-center justify-between gap-x-2 py-2 px-3 bg-primary-content border-2 border-primary rounded-full text-primary font-medium text-xs m-1`}
        >
          WIFI Available
          <FiX
            className={`cursor-pointer`}
            onClick={() => {
              setFuelStationFilterDataToLocalStorage({
                ...fuelStationSearchData,
                wifi_available: false,
              });
            }}
            size={18}
          />
        </div>
      )}

      {/* REMOTE GARAGE  */}
      {!!fuelStationSearchData?.is_mobile_garage && (
        <div
          className={`inline-flex items-center justify-between gap-x-2 py-2 px-3 bg-primary-content border-2 border-primary rounded-full text-primary font-medium text-xs m-1`}
        >
          Remote Garage
          <FiX
            className={`cursor-pointer`}
            onClick={() => {
              setFuelStationFilterDataToLocalStorage({
                ...fuelStationSearchData,
                is_mobile_garage: false,
              });
            }}
            size={18}
          />
        </div>
      )}
    </div>
  );
}
