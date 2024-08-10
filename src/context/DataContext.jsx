// ===========================================
// #00101
// ===========================================

import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getGarageCombinedData,
  getMakes,
  getModelsWithoutIds,
  getServices,
  getSubServicesWithoutIds,
} from "../Apis/homepageapi";
import { getAllFuelServices } from "../Apis/fuelStation";

// Create the authentication context
export const DataContext = createContext();

// Create the authentication provider component
export const DataContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [fuelLoading, setFuelLoading] = useState(true);

  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);

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

    locationDetails: {
      start_lat: "",
      start_long: "",
      end_lat: "",
      end_long: "",
    },

    wifi_available: false,
    is_mobile_garage: false,
    date_time: "",

    distance: 3,
  });
  const [fuelStationsFilter, setFuelStationsFilter] = useState({
    page: 1,
    perPage: 20,

    search_key: "",
    time: "",
    is_checked: "",

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
  const [totalGarageFound, setTotalGarageFound] = useState(0);
  const [fuelStations, setFuelStations] = useState({});

  const [garageList, setGarageList] = useState([]);
  const [makeJob, setMakeJob] = useState(false);
  const [fuelStationServices, setFuelStationServices] = useState([]);

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
      setLoading(false);
    }
  }, [queryCombinedLoading]);
  // GET ALL FUEL SERVICES
  const { isPending: fuelServiceLoading, data: fuelService } = useQuery({
    queryKey: ["fuelService"],
    queryFn: getAllFuelServices,
  });

  // HANDLE LOADING AND SET STATE
  useEffect(() => {
    if (fuelServiceLoading) {
      setFuelLoading(true);
    } else {
      setFuelStationServices(fuelService);
      setFuelLoading(false);
    }
  }, [fuelServiceLoading]);

  // GETTING TOTAL NUMBER OF GARAGES FROM SEARCH
  useEffect(() => {
    setTotalGarageFound(garageList?.length || 0);
  }, [garageList]);

  // SAVE ALL QUERIES TO THE LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("search_data", JSON.stringify(homeSearchData));
  }, [homeSearchData]);

  return (
    <DataContext.Provider
      value={{
        homeSearchData,
        setHomeSearchData,

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

        fuelStations,
        setFuelStations,
        fuelStationServices,
        setFuelStationServices,
        fuelStationsFilter,
        setFuelStationsFilter,

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

    fuelStations,
    setFuelStations,
    fuelStationServices,
    setFuelStationServices,
    fuelStationsFilter,
    setFuelStationsFilter,

    garageList,
    setGarageList,
    totalGarageFound,
    setTotalGarageFound,
  } = useContext(DataContext);

  return {
    homeSearchData,
    setHomeSearchData,

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

    fuelStations,
    setFuelStations,
    fuelStationServices,
    setFuelStationServices,
    fuelStationsFilter,
    setFuelStationsFilter,

    garageList,
    setGarageList,
    totalGarageFound,
    setTotalGarageFound,
  };
};
