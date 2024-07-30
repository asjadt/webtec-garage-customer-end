// ===========================================
// #00101
// ===========================================

import React, { createContext, useContext, useEffect, useState } from "react";

// Create the authentication context
export const GeoLocationDataContext = createContext();

// Create the authentication provider component
export const GeoLocationDataContextProvider = ({ children }) => {
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });
  const [currentLat, setCurrentLat] = useState({});

  // HELPER FUNCTION
  let llFromDistance = function ({ latitude, longitude, distance, bearing }) {
    // const R = 6378.1; // Radius of the Earth

    // const brng = (bearing * Math.PI) / 180; // Convert bearing to radian

    // let lat = (latitude * Math.PI) / 180; // Current coords to radians
    // let lon = (longitude * Math.PI) / 180;

    // // Do the math magic
    // lat = Math.asin(
    //   Math.sin(lat) * Math.cos(distance / R) +
    //     Math.cos(lat) * Math.sin(distance / R) * Math.cos(brng)
    // );

    // lon += Math.atan2(
    //   Math.sin(brng) * Math.sin(distance / R) * Math.cos(lat),
    //   Math.cos(distance / R) - Math.sin(lat) * Math.sin(lat)
    // );

    // return {
    //   latitude: (lat * 180) / Math.PI,
    //   longitude: (lon * 180) / Math.PI,
    // };

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
    if (navigator?.geolocation) {
      navigator?.geolocation?.getCurrentPosition(
        function (position) {
          // Coords back to degrees and return
          setCurrentLat(
            llFromDistance({
              latitude: position?.coords?.latitude,
              longitude: position?.coords?.longitude,
              distance: Math.sqrt(2) * 31,
              bearing: 135,
            })
          );

          setLocation({
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude,
          });
        },
        function (error) {
          handleApiError(error);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <GeoLocationDataContext.Provider
      value={{
        location,
        setLocation,
        currentLat,
        setCurrentLat,
        llFromDistance,
      }}
    >
      {children}
    </GeoLocationDataContext.Provider>
  );
};

export const useGeoLocationData = () => {
  const { location, setLocation, currentLat, setCurrentLat, llFromDistance } =
    useContext(GeoLocationDataContext);

  return {
    location,
    setLocation,
    currentLat,
    setCurrentLat,
    llFromDistance,
  };
};
