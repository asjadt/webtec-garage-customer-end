import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import { GiMechanicGarage } from "react-icons/gi";
import { useData } from "../../../context/DataContext";
import { Map, Marker } from "@vis.gl/react-google-maps";
import { CustomMarker } from "../../../components/Map/CustomMarker";
import { useQuery } from "@tanstack/react-query";
import { getAllGaragesForMap } from "../../../Apis/garage";

export default function GoogleMapForGarages({ defaultProps }) {
  // GETTING GARAGES FOR MAP
  const { isPending: isGarageLoading, data } = useQuery({
    queryKey: ["map-garages"],
    queryFn: getAllGaragesForMap,
  });

  return (
    <>
      {isGarageLoading ? (
        <div className="w-full h-[600px] absolute outline-none border-none active:border-none bg-slate-300 animate-pulse"></div>
      ) : (
        <Map
          defaultCenter={{ lat: 23.7993984, lng: 90.3839744 }}
          defaultZoom={8}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          disableDoubleClickZoom={true}
          scaleControl={true}
          className="w-full h-[600px] absolute outline-none border-none active:border-none"
          defaultTilt={10}
        >
          {data?.data?.map((garage) => {
            console.log({ garage: Number(garage?.long) });
            return (
              <Marker
                key={garage?.id}
                position={{
                  lat: Number(garage?.lat),
                  lng: Number(garage?.long),
                }}
              />
            );
          })}
        </Map>
      )}
    </>
  );
}

const AnyReactComponent = ({ text, lat, lng }) => (
  <div
    style={{
      color: "black",
      fontWeight: "bold",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      transform: "translate(-50%, -50%)",
      fontSize: "15px",
    }}
    lat={lat}
    lng={lng}
  >
    <GiMechanicGarage style={{ fontSize: "30px" }} />
    {text}
  </div>
);
