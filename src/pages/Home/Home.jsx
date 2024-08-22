import { useEffect, useState } from "react";
import CustomLoading from "../../components/CustomLoading";
import { useAuth } from "../../context/AuthContextV2";
import { useData } from "../../context/DataContext";
import { useGeoLocationData } from "../../context/GeoLocationDataContext";
import GoogleMapForGarages from "./components/GoogleMapForGarages";
import SearchForm from "./components/SearchForm";
import ServiceList from "./components/ServiceList";
import HowItsWork from "./components/HowItsWork";
import { useParams } from "react-router-dom";

export default function Home() {
  const { is_login } = useParams();
  const { isLoading, handleOpenLoginPopup } = useAuth();
  const {
    setFilterDataToLocalStorage,
    setFuelStationFilterDataToLocalStorage,
  } = useData();
  const [isDataLoading, setIsDataLoading] = useState(true);
  useEffect(() => {
    setFilterDataToLocalStorage({
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

    setTimeout(() => {
      setIsDataLoading(false);
    }, 200);
  }, []);

  useEffect(() => {
    if (is_login) {
      handleOpenLoginPopup({
        customerRegistration: true,
        garageRegistration: true,
      });
    }
  }, [is_login]);
  if (isLoading || isDataLoading) {
    return <CustomLoading />;
  } else {
    return (
      <div data-auto={`container-home`} className={`w-full relative mb-10`}>
        {/* MAP  */}
        <GoogleMapForGarages />

        {/* SEARCH FORM  */}
        <div data-auto={`search-container-home`} className={`px-5 xl:px-0`}>
          <SearchForm />
        </div>
        {/* HOW ITS WORK SECTION  */}
        <HowItsWork />

        {/* SERVICES LIST  */}
        <div
          data-auto={`serviceList-container-home`}
          className={`px-5 xl:px-0 flex justify-center`}
        >
          <ServiceList />
        </div>
      </div>
    );
  }
}
