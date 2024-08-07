import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

export const CustomMarker = ({ points }) => {
  // const map = useMap();
  // const [markers, setMarkers] = useState({});
  // const cluster = useRef(null);

  // useEffect(() => {
  //   if (!map) return;
  //   if (!cluster.current) {
  //     cluster.current = new MarkerClusterer({ map });
  //   }
  // }, [map]);

  // useEffect(() => {
  //   cluster.current?.clearMarkers();
  //   cluster.current?.addMarkers(Object.values(markers));
  // }, [markers]);

  // const setMarkerRef = (marker, key) => {
  //   if (marker && markers[key]) return;
  //   if (!marker && !markers[key]) return;

  //   setMarkers((prev) => {
  //     if (marker) {
  //       return { ...prev, [key]: marker };
  //     } else {
  //       const newMarkers = { ...prev };
  //       delete newMarkers[key];
  //       return newMarkers;
  //     }
  //   });
  // };

  return (
    <>
      {points.map((point) => (
        <AdvancedMarker
          position={{ lat: point.lat, lng: point?.lng }}
          key={point.id}
          ref={(marker) => setMarkerRef(marker, point.id)}
        >
          <span style={{ fontSize: "2rem" }}>🌳</span>
        </AdvancedMarker>
      ))}
    </>
  );
};
