import { AdvancedMarker, Map, Pin } from "@vis.gl/react-google-maps";

import React, { useEffect, useState } from "react";
import CustomAutoComplete from "../../../components/CustomAutoComplete";
import { useData } from "../../../context/DataContext";
import {
  getAllFuelStationForMap,
  getAllGaragesForMap,
} from "../../../Apis/garage";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useGeoLocationData } from "../../../context/GeoLocationDataContext";
import { calculateLatLongBounds } from "../../../utils/map";

const FuelStationMap = ({ setActiveTab }) => {
  const navigate = useNavigate();
  const { defaultLocationProps, isGeoLocationLoading } = useGeoLocationData();

  const {
    setFuelStationSearchData,
    fuelStationSearchData,
    setFuelStationFilterDataToLocalStorage,
  } = useData();

  const onFormDataChange = (e) => {
    setFuelStationFilterDataToLocalStorage({
      ...fuelStationSearchData,
      address: e.target.value,
      distance: 3,
    });
  };

  useEffect(() => {
    setFuelStationFilterDataToLocalStorage({
      page: 1,
      perPage: 20,

      search_key: "",

      services: [],

      address: "",
      city: "",
      country_code: "",
      lat: "",
      long: "",
      start_lat: "",
      end_lat: "",
      start_long: "",
      end_long: "",

      wifi_available: false,
      is_mobile_garage: false,
      date_time: "",
    });
  }, []);

  // HANDLE FUEL STATION SEARCH
  const handleFuelStationSearch = () => {
    if (fuelStationSearchData?.address) {
      const distanceData = calculateLatLongBounds({
        lat: fuelStationSearchData?.lat,
        lon: fuelStationSearchData?.long,
        radiusInKm: 3,
      });

      setFuelStationFilterDataToLocalStorage({
        ...fuelStationSearchData,
        page: 1,
        search_key: "",
        distance: 3,
        services: [], //DONE
        lat: fuelStationSearchData?.lat, //DONE
        long: fuelStationSearchData?.long, //DONE
        start_lat: distanceData?.minLat, //DONE
        end_lat: distanceData?.maxLat, //DONE
        start_long: distanceData?.minLon, //DONE
        end_long: distanceData?.maxLon, //DONE
      });
    } else {
      setFuelStationFilterDataToLocalStorage({
        ...fuelStationSearchData,
        page: 1,
        search_key: "",
        distance: 0,
        services: [], //DONE
        lat: location?.latitude, //DONE
        long: location?.longitude, //DONE
        start_lat: "", //DONE
        start_long: "", //DONE
        end_lat: "", //DONE
        end_long: "", //DONE
      });
    }

    setTimeout(() => {
      setActiveTab("list");
    }, 10);
  };
  // GETTING FUEL STATIONS FOR MAP
  const { isPending: isFuelStationLoading, data } = useQuery({
    queryKey: ["map-fuel-stations"],
    queryFn: getAllFuelStationForMap,
  });

  return (
    <div data-auto={`container-fuelStationMap`} className={`relative`}>
      <div
        data-auto={`container-search-fuelStationMap`}
        className={`w-full flex justify-center items-center z-30 absolute top-5`}
      >
        <div
          data-auto={`container-searchBox-fuelStationMap`}
          className={`bg-base-300 shadow-lg rounded-md p-2 w-[calc(100vw-40px)] flex gap-3 md:w-1/2`}
        >
          <div
            data-auto={`container-locationInput-fuelStationMap`}
            className="flex-grow"
          >
            {/* LOCATION */}
            <CustomAutoComplete
              disable={false}
              className={`input input-bordered rounded-md w-full`}
              placeholder="Address"
              type="text"
              name="address"
              onChange={onFormDataChange}
              searchData={fuelStationSearchData}
              setFormData={setFuelStationSearchData}
              defaultValue={fuelStationSearchData?.address}
              dataAuto={`location-fuelStationMap`}
            />
          </div>
          <button
            data-auto={`button-search-fuelStationMap`}
            onClick={handleFuelStationSearch}
            className={`btn btn-primary`}
          >
            Search
          </button>
        </div>
      </div>
      <>
        {isFuelStationLoading || isGeoLocationLoading ? (
          <div
            data-auto={`loading-map-fuelStationMap`}
            className="w-full h-[calc(100vh-220px)] absolute outline-none border-none active:border-none bg-slate-300 animate-pulse"
          ></div>
        ) : (
          <Map
            data-auto={`map-fuelStationMap`}
            mapId={"ed79aa93f40c730c"}
            defaultCenter={defaultLocationProps?.center}
            defaultZoom={defaultLocationProps?.zoom}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            disableDoubleClickZoom={true}
            scaleControl={true}
            className="w-full h-[calc(100vh-220px)] absolute outline-none border-none active:border-none"
            defaultTilt={10}
          >
            {data?.data?.map((fuelStation) => {
              return (
                <AdvancedMarker
                  data-auto={`marker-${fuelStation?.id}-fuelStationMap`}
                  key={fuelStation?.id}
                  position={{
                    lat: Number(fuelStation?.lat),
                    lng: Number(fuelStation?.long),
                  }}
                  onClick={() =>
                    navigate(`/view-fuel-station-details/${fuelStation?.id}`)
                  }
                >
                  <div
                    data-auto={`tooltip-${fuelStation?.id}-fuelStationMap`}
                    data-tip={fuelStation?.name}
                    className={`tooltip tooltip-top tooltip-base-300 relative`}
                  >
                    <img
                      data-auto={`icon-marker-${fuelStation?.id}-fuelStationMap`}
                      src="/assets/Map/fuelstationpin.png"
                      className={`w-12`}
                      alt={fuelStation?.name}
                    />
                  </div>
                </AdvancedMarker>
              );
            })}
          </Map>
        )}
      </>
    </div>
  );
};

export default FuelStationMap;
