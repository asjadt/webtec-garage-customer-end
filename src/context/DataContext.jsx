// ===========================================
// #00101
// ===========================================

import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllFuelServices } from "../Apis/fuelStation";
import { getGarageCombinedData } from "../Apis/homepageapi";

// Create the authentication context
export const DataContext = createContext();

// Create the authentication provider component
export const DataContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [fuelLoading, setFuelLoading] = useState(true);

  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);
  const [fuelStationServices, setFuelStationServices] = useState([]);

  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);

  const [homeSearchData, setHomeSearchData] = useState({
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

    wifi_available: false,
    is_mobile_garage: false,
    date_time: "",

    distance: 0,
  });

  const [fuelStationSearchData, setFuelStationSearchData] = useState({
    page: 1,
    perPage: 20,

    search_key: "",

    services: [],

    address: "",
    city: "",
    country_code: "",

    start_lat: "",
    end_lat: "",
    start_long: "",
    end_long: "",

    wifi_available: false,
    is_mobile_garage: false,
    date_time: "",

    distance: 0,
  });

  const [totalGarageFound, setTotalGarageFound] = useState(0);
  const [totalFuelStationFound, setTotalFuelStationFound] = useState(0);

  const [fuelStationList, setFuelStationList] = useState([]);
  const [garageList, setGarageList] = useState([]);

  const [makeJob, setMakeJob] = useState(false);

  // SETTER FUNCTION FOR HOMEPAGE FILTER DATA
  const setFilterDataToLocalStorage = (value) => {
    let filterData = {
      ...value,
    };
    setHomeSearchData(filterData);
    localStorage.setItem("search_data", JSON.stringify(filterData));
  };

  const setFuelStationFilterDataToLocalStorage = (value) => {
    let filterData = {
      ...value,
    };
    setFuelStationSearchData(filterData);
    localStorage.setItem(
      "search_data_for_fuel_station",
      JSON.stringify(filterData)
    );
  };

  // GET ALL COMBINED DATA
  const { isPending: queryCombinedLoading, data: queryCombined } = useQuery({
    queryKey: ["combined"],
    queryFn: getGarageCombinedData,
  });

  // HANDLE LOADING AND SET STATE
  useEffect(() => {
    if (queryCombinedLoading) {
      setLoading(true);
    } else {
      setServices(queryCombined?.services);
      setSubServices(queryCombined?.sub_services);
      setMakes(queryCombined?.automobile_make);
      setModels(queryCombined?.automobile_model);

      setFuelStationServices(queryCombined?.fuel_station_services);

      setLoading(false);
    }
  }, [queryCombinedLoading]);

  // GETTING TOTAL NUMBER OF GARAGES FROM SEARCH
  useEffect(() => {
    setTotalGarageFound(garageList?.length || 0);
  }, [garageList]);

  return (
    <DataContext.Provider
      value={{
        homeSearchData,
        setHomeSearchData,
        setFilterDataToLocalStorage,

        loading,
        setLoading,
        fuelLoading,
        setFuelLoading,

        services,
        setServices,

        subServices,
        setSubServices,

        makes,
        setMakes,

        models,
        setModels,

        makeJob,
        setMakeJob,

        fuelStationList,
        setFuelStationList,
        fuelStationServices,
        setFuelStationServices,
        fuelStationSearchData,
        setFuelStationSearchData,
        totalFuelStationFound,
        setTotalFuelStationFound,
        setFuelStationFilterDataToLocalStorage,

        garageList,
        setGarageList,
        totalGarageFound,
        setTotalGarageFound,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const {
    homeSearchData,
    setHomeSearchData,
    setFilterDataToLocalStorage,

    loading,
    setLoading,
    fuelLoading,
    setFuelLoading,

    services,
    setServices,

    subServices,
    setSubServices,

    makes,
    setMakes,

    models,
    setModels,

    makeJob,
    setMakeJob,

    fuelStationList,
    setFuelStationList,
    fuelStationServices,
    setFuelStationServices,
    fuelStationSearchData,
    setFuelStationSearchData,
    totalFuelStationFound,
    setTotalFuelStationFound,
    setFuelStationFilterDataToLocalStorage,

    garageList,
    setGarageList,
    totalGarageFound,
    setTotalGarageFound,
  } = useContext(DataContext);

  return {
    homeSearchData,
    setHomeSearchData,
    setFilterDataToLocalStorage,

    loading,
    setLoading,
    fuelLoading,
    setFuelLoading,

    services,
    setServices,

    subServices,
    setSubServices,

    makes,
    setMakes,

    models,
    setModels,

    makeJob,
    setMakeJob,

    fuelStationList,
    setFuelStationList,
    fuelStationServices,
    setFuelStationServices,
    fuelStationSearchData,
    setFuelStationSearchData,
    totalFuelStationFound,
    setTotalFuelStationFound,
    setFuelStationFilterDataToLocalStorage,

    garageList,
    setGarageList,
    totalGarageFound,
    setTotalGarageFound,
  };
};
