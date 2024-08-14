// ===========================================
// #00101
// ===========================================

import React, { createContext, useContext, useEffect, useState } from "react";
import { handleApiError } from "../utils/apiErrorHandler";
import { calculateLatLongBounds } from "../utils/map";

// Create the authentication context
export const GeoLocationDataContext = createContext();

// Create the authentication provider component
export const GeoLocationDataContextProvider = ({ children }) => {
  const [isGeoLocationLoading, setIsGeoLocationLoading] = useState(false);
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });
  const [currentLat, setCurrentLat] = useState({});

  // HELPER FUNCTION
  let llFromDistance = function ({ latitude, longitude, distance, bearing }) {
    const R = 6378.1; // Radius of the Earth in km

    const brng = (bearing * Math.PI) / 180; // Convert bearing to radian

    let lat1 = (latitude * Math.PI) / 180; // Current coords to radians
    let lon1 = (longitude * Math.PI) / 180;

    // Do the math magic
    let lat2 = Math.asin(
      Math.sin(lat1) * Math.cos(distance / R) +
        Math.cos(lat1) * Math.sin(distance / R) * Math.cos(brng)
    );

    let lon2 =
      lon1 +
      Math.atan2(
        Math.sin(brng) * Math.sin(distance / R) * Math.cos(lat1),
        Math.cos(distance / R) - Math.sin(lat1) * Math.sin(lat2)
      );

    return {
      latitude: (lat2 * 180) / Math.PI,
      longitude: (lon2 * 180) / Math.PI,
    };
  };

  // GETTING EXACT LOCATION
  useEffect(() => {
    // Function to fetch location using Geolocation API
    const fetchLocation = () => {
      if (navigator.geolocation) {
        setIsGeoLocationLoading(true);
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            setLocation({
              latitude: position?.coords?.latitude,
              longitude: position?.coords?.longitude,
            });
            setIsGeoLocationLoading(false);
          },
          (error) => {
            setIsGeoLocationLoading(false);
            handleApiError(error);
          }
        );
      }
    };

    fetchLocation();
  }, []);

  const [defaultLocationProps, setDefaultLocationProps] = useState({});
  useEffect(() => {
    // MAD DEFAULT DATA
    setDefaultLocationProps({
      center: {
        lat: location?.latitude,
        lng: location?.longitude,
      },
      zoom: 11,

      rangeData: calculateLatLongBounds({
        lat: location?.latitude,
        lon: location?.longitude,
        radiusInKm: 3,
      }),
    });
  }, [location.pathname, location, isGeoLocationLoading]);
  return (
    <GeoLocationDataContext.Provider
      value={{
        location,
        setLocation,
        currentLat,
        setCurrentLat,
        llFromDistance,
        isGeoLocationLoading,
        defaultLocationProps,
      }}
    >
      {children}
    </GeoLocationDataContext.Provider>
  );
};

export const useGeoLocationData = () => {
  const {
    location,
    setLocation,
    currentLat,
    setCurrentLat,
    llFromDistance,
    isGeoLocationLoading,
    defaultLocationProps,
  } = useContext(GeoLocationDataContext);

  return {
    location,
    setLocation,
    currentLat,
    setCurrentLat,
    llFromDistance,
    isGeoLocationLoading,
    defaultLocationProps,
  };
};
