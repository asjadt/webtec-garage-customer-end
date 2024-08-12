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

const FuelStationMap = ({ setActiveTab }) => {
  const navigate = useNavigate();
  const { defaultLocationProps, isGeoLocationLoading } = useGeoLocationData();

  useEffect(() => {
    console.log({ isGeoLocationLoading });
  }, [isGeoLocationLoading]);
  const { homeSearchData, setHomeSearchData } = useData();
  const onFormDataChange = (e) => {
    setHomeSearchData((prev) => ({
      ...prev,
      address: e.target.value,
    }));
  };

  // GETTING FUEL STATIONS FOR MAP
  const { isPending: isFuelStationLoading, data } = useQuery({
    queryKey: ["map-fuel-stations"],
    queryFn: getAllFuelStationForMap,
  });

  return (
    <div className={`relative`}>
      <div
        className={`w-full flex justify-center items-center z-30 absolute top-5`}
      >
        <div
          className={`bg-base-300 shadow-lg rounded-md p-2 w-[calc(100vw-40px)] flex gap-3 md:w-1/2`}
        >
          <div className="flex-grow">
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
          </div>
          <button
            onClick={() => setActiveTab("list")}
            className={`btn btn-primary`}
          >
            Search
          </button>
        </div>
      </div>
      <>
        {isFuelStationLoading || isGeoLocationLoading ? (
          <div className="w-full h-[calc(100vh-220px)]  absolute outline-none border-none active:border-none bg-slate-300 animate-pulse"></div>
        ) : (
          <Map
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
                    data-tip={fuelStation?.name}
                    className={`tooltip tooltip-top tooltip-base-300 relative`}
                  >
                    <img
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
