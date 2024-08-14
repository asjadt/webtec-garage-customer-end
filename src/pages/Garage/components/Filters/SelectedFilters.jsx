import { FiX } from "react-icons/fi";
import { useData } from "../../../../context/DataContext";
import { useGeoLocationData } from "../../../../context/GeoLocationDataContext";
import { calculateLatLongBounds } from "../../../../utils/map";

export default function SelectedFilters() {
  const {
    homeSearchData,
    setFilterDataToLocalStorage,
    subServices,
    makes,
    models,
  } = useData();

  const filterData = localStorage.getItem("search_data")
    ? JSON.parse(localStorage.getItem("search_data"))
    : homeSearchData;

  return (
    <div className={`w-full inline-block`}>
      {/* SERVICES  */}
      {subServices
        ?.filter((s) => homeSearchData?.sub_services?.some((s2) => s.id === s2))
        .map((item, index) => (
          <div
            key={index}
            className={`inline-flex items-center justify-between gap-x-2 py-2 px-3 bg-primary-content border-2 border-primary rounded-full text-primary font-medium text-xs m-1`}
          >
            {item?.name}{" "}
            <FiX
              className={`cursor-pointer`}
              onClick={() => {
                setFilterDataToLocalStorage({
                  ...homeSearchData,
                  sub_services: homeSearchData.sub_services.filter(
                    (sub) => sub !== item.id
                  ),
                });
              }}
              size={18}
            />
          </div>
        ))}

      {/* MAKES  */}
      {makes
        ?.filter((s) => homeSearchData?.makes?.some((s2) => s.id === s2))
        .map((item, index) => (
          <div
            key={index}
            className={`inline-flex items-center justify-between gap-x-2 py-2 px-3 bg-primary-content border-2 border-primary rounded-full text-primary font-medium text-xs m-1`}
          >
            {item?.name}{" "}
            <FiX
              className={`cursor-pointer`}
              onClick={() => {
                setFilterDataToLocalStorage({
                  ...homeSearchData,
                  makes: homeSearchData.makes.filter((sub) => sub !== item.id),
                });
              }}
              size={18}
            />
          </div>
        ))}

      {/* MODELS  */}
      {models
        ?.filter((s) => homeSearchData?.models?.some((s2) => s.id === s2))
        .map((item, index) => (
          <div
            key={index}
            className={`inline-flex items-center justify-between gap-x-2 py-2 px-3 bg-primary-content border-2 border-primary rounded-full text-primary font-medium text-xs m-1`}
          >
            {item?.name}{" "}
            <FiX
              className={`cursor-pointer`}
              onClick={() => {
                setFilterDataToLocalStorage({
                  ...homeSearchData,
                  models: homeSearchData.models.filter(
                    (sub) => sub !== item.id
                  ),
                });
              }}
              size={18}
            />
          </div>
        ))}

      {/* DISTANCE  */}
      {!!homeSearchData?.distance && (
        <div
          className={`inline-flex items-center justify-between gap-x-2 py-2 px-3 bg-primary-content border-2 border-primary rounded-full text-primary font-medium text-xs m-1`}
        >
          {homeSearchData?.distance} KM{" "}
          <FiX
            className={`cursor-pointer`}
            onClick={() => {
              const distanceData = calculateLatLongBounds({
                lat: filterData?.start_lat,
                lon: filterData?.end_lat,
                radiusInKm: 0,
              });

              setFilterDataToLocalStorage({
                ...homeSearchData,
                distance: 0,

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
      {!!homeSearchData?.wifi_available && (
        <div
          className={`inline-flex items-center justify-between gap-x-2 py-2 px-3 bg-primary-content border-2 border-primary rounded-full text-primary font-medium text-xs m-1`}
        >
          WIFI Available
          <FiX
            className={`cursor-pointer`}
            onClick={() => {
              setFilterDataToLocalStorage({
                ...homeSearchData,
                wifi_available: false,
              });
            }}
            size={18}
          />
        </div>
      )}

      {/* REMOTE GARAGE  */}
      {!!homeSearchData?.is_mobile_garage && (
        <div
          className={`inline-flex items-center justify-between gap-x-2 py-2 px-3 bg-primary-content border-2 border-primary rounded-full text-primary font-medium text-xs m-1`}
        >
          Remote Garage
          <FiX
            className={`cursor-pointer`}
            onClick={() => {
              setFilterDataToLocalStorage({
                ...homeSearchData,
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
