import React, { useEffect, useState } from "react";
import CustomAutoComplete from "../../../components/CustomAutoComplete";
import { useData } from "../../../context/DataContext";
import CustomLoading from "../../../components/CustomLoading";

const Map = () => {
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

  return (
    <div className={`overflow-hidden pb-[56.25%] relative h-0`}>
      <div className={`w-auto max-w-[500px] mx-6`}>
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
      <iframe
        src={`https://www.google.com/maps/embed/v1/place?key=${
          import.meta.env.VITE_GOOGLE_MAP_API
        }&q=place_id:${placeId}`}
        className={`absolute left-0 top-20 h-full w-full border-0`}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      {/* {placeId ? (

      ) : (
        <CustomLoading />
      )} */}
    </div>
  );
};

export default Map;
