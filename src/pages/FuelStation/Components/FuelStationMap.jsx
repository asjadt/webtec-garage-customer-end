import React, { useEffect, useState } from "react";
import CustomAutoComplete from "../../../components/CustomAutoComplete";
import { useData } from "../../../context/DataContext";
import CustomLoading from "../../../components/CustomLoading";
import { Map, Marker } from "@vis.gl/react-google-maps";
import axios from "axios";

const FuelStationMap = ({ setActiveTab }) => {
  const { homeSearchData, setHomeSearchData } = useData();
  console.log({ homeSearchData });
  const onFormDataChange = (e) => {
    setHomeSearchData((prev) => ({
      ...prev,
      address: e.target.value,
    }));
  };

  const [placeId, setPlaceId] = useState(null);
  useEffect(() => {
    const fetchPlaceDetails = async () => {
      if (homeSearchData?.address) {
        try {
          const response = await axios.get(
            "https://maps.googleapis.com/maps/api/place/textsearch/json",
            {
              params: {
                query: homeSearchData?.address,
                key: import.meta.env.VITE_GOOGLE_MAP_API,
              },
            }
          );
          console.log({ response });
          const place = response.data.results[0];
          setPlaceId(place.place_id);
        } catch (error) {
          console.error("Error fetching place details:", error);
        }
      }
    };

    fetchPlaceDetails();
  }, [homeSearchData]);

  const [isFuelStationLoading, setIsFuelStationLoading] = useState(true);
  const [fuelStations, setFuelStations] = useState([]);

  useEffect(() => {
    setIsFuelStationLoading(true);
    setTimeout(() => {
      setIsFuelStationLoading(false);
      setFuelStations([
        {
          id: 1,
          name: "Lotus Repair",
          lat: 23.545032,
          lng: 90.502479,
        },
        {
          id: 2,
          name: "Badol Repair",
          lat: 23.539707,
          lng: 90.116769,
        },
        {
          id: 3,
          name: "Karim Repair",
          lat: 23.605743,
          lng: 90.143355,
        },
        {
          id: 4,
          name: "Falcon Repair",
          lat: 23.602128,
          lng: 90.324357,
        },
      ]);
    }, 2000);
  }, []);

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
        {isFuelStationLoading ? (
          <div className="w-full h-[calc(100vh-220px)]  absolute outline-none border-none active:border-none bg-slate-300 animate-pulse"></div>
        ) : (
          <Map
            defaultCenter={{ lat: 23.7993984, lng: 90.3839744 }}
            defaultZoom={8}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            disableDoubleClickZoom={true}
            scaleControl={true}
            className="w-full h-[calc(100vh-220px)]  absolute outline-none border-none active:border-none"
            defaultTilt={10}
          >
            {fuelStations?.map((fuelStation) => (
              <Marker
                key={fuelStation?.id}
                position={{ lat: fuelStation?.lat, lng: fuelStation?.lng }}
              />
            ))}
          </Map>
        )}
      </>
    </div>
  );
};

export default FuelStationMap;
