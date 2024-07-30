import { useEffect, useState } from "react";
import CustomLoading from "../../components/CustomLoading";
import { useAuth } from "../../context/AuthContextV2";
import { useData } from "../../context/DataContext";
import { useGeoLocationData } from "../../context/GeoLocationDataContext";
import GoogleMapForGarages from "./components/GoogleMapForGarages";
import SearchForm from "./components/SearchForm";
import ServiceList from "./components/ServiceList";

export default function Home() {
  const { location } = useGeoLocationData();
  const { isLoading } = useAuth();
  const { setHomeSearchData } = useData();
  const [isDataLoading, setIsDataLoading] = useState(true);
  useEffect(() => {
    setHomeSearchData({
      page: 1,
      perPage: 20,

      search_key: "",

      services: [],
      sub_services: [],
      makes: [],
      models: [],

      address: "",
      city: "",
      country_code: "",
      start_lat: "",
      end_lat: "",
      start_long: "",
      end_long: "",
      locationDetails: {
        start_lat: "",
        start_long: "",
        end_lat: "",
        end_long: "",
      },

      wifi_available: false,
      is_mobile_garage: false,
      date_time: "",
    });

    setTimeout(() => {
      localStorage.removeItem("search_data");
    }, 100);
    setTimeout(() => {
      setIsDataLoading(false);
    }, 200);
  }, []);

  // MAD DEFAULT DATA
  const defaultProps = {
    center: {
      lat: location?.latitude,
      lng: location?.longitude,
    },
    zoom: 11,
  };

  if (isLoading || isDataLoading) {
    return <CustomLoading />;
  } else {
    return (
      <div data-cy="dashboard" className={`w-full relative mb-10`}>
        {/* MAP  */}
        <GoogleMapForGarages defaultProps={defaultProps} />

        {/* SEARCH FORM  */}
        <SearchForm />

        {/* SERVICES LIST  */}
        <ServiceList />
      </div>
    );
  }
}
