// ===========================================
// #00101
// ===========================================

import React, { createContext, useContext, useEffect, useState } from "react";
import { handleApiError } from "../utils/apiErrorHandler";

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
    // Function to fetch location using IP address as a fallback
    const fetchLocationByIP = async () => {
      try {
        const response = await fetch(
          `https://api.ip2location.io/?key=${
            import.meta.env.VITE_IP2LOCATION_API_KEY
          }`
        );
        const data = await response.json();
        setCurrentLat(
          llFromDistance({
            latitude: data.latitude,
            longitude: data.longitude,
            distance: Math.sqrt(2) * 31,
            bearing: 135,
          })
        );

        setLocation({
          latitude: data.latitude,
          longitude: data.longitude,
        });
      } catch (error) {
        console.error("Error fetching location by IP:", error);
      }
    };

    // Function to fetch location using Geolocation API
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
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
          (error) => {
            console.error(
              "Error fetching location using Geolocation API:",
              error
            );
            fetchLocationByIP(); // Fallback to IP-based location if Geolocation API fails
          }
        );
      } else {
        fetchLocationByIP(); // Fallback if Geolocation API is not supported
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    console.log({ location });
  }, [location.pathname, location]);
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
