import { FiX } from "react-icons/fi";
import { useData } from "../../../../context/DataContext";
import { useGeoLocationData } from "../../../../context/GeoLocationDataContext";

export default function SelectedFilters() {
  const { homeSearchData, setHomeSearchData, subServices, makes, models } =
    useData();
  const { llFromDistance, location } = useGeoLocationData();

  return (
    <div className={`w-full inline-block mt-5`}>
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
                setHomeSearchData({
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
                setHomeSearchData({
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
                setHomeSearchData({
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
              const distanceData = llFromDistance({
                latitude: location?.latitude,
                longitude: location?.longitude,
                distance: Math.sqrt(2) * (0 * 1),
                bearing: 135,
              });

              setHomeSearchData({
                ...homeSearchData,
                distance: 0,

                start_lat: location?.latitude,
                start_long: location?.longitude,
                end_lat: distanceData?.latitude,
                end_long: distanceData?.longitude,
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
              setHomeSearchData({
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
              setHomeSearchData({
                ...homeSearchData,
                is_mobile_garage: false,
              });
            }}
            size={18}
          />
        </div>
      )}

      {/* CLEAR ALL  */}
      {/* {!(
        homeSearchData?.sub_services?.length > 0 ||
        homeSearchData?.makes?.length > 0 ||
        homeSearchData?.models?.length > 0 ||
        homeSearchData?.distance > 0
      ) && (
        <div
          className={`inline-flex items-center justify-between gap-x-2 py-2 px-3 bg-primary-content border-2 border-primary rounded-full text-primary font-medium text-xs m-1`}
          onClick={() => {
            setHomeSearchData({
              ...homeSearchData,
              sub_services: [],
              makes: [],
              models: [],
              distance: 0,
            });
          }}
        >
          Clear All
        </div>
      )} */}
    </div>
  );
}
