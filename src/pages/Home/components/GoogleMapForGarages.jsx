import { useQuery } from "@tanstack/react-query";
import { AdvancedMarker, Map, Pin } from "@vis.gl/react-google-maps";
import { GiHomeGarage, GiMechanicGarage } from "react-icons/gi";
import { getAllGaragesForMap } from "../../../Apis/garage";
import { useGeoLocationData } from "../../../context/GeoLocationDataContext";
import { useData } from "../../../context/DataContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GoogleMapForGarages() {
  const { defaultLocationProps, isGeoLocationLoading } = useGeoLocationData();
  const navigate = useNavigate();

  // GETTING GARAGES FOR MAP
  const { isPending: isGarageLoading, data } = useQuery({
    queryKey: ["map-garages"],
    queryFn: getAllGaragesForMap,
  });

  return (
    <div data-auto={`container-googleMapForGarages`}>
      {isGarageLoading || isGeoLocationLoading ? (
        <div className="w-full h-[650px] absolute outline-none border-none active:border-none bg-slate-300 animate-pulse"></div>
      ) : (
        <Map
          data-auto={`home-map-googleMapForGarages`}
          mapId={"ed79aa93f40c730c"}
          defaultCenter={defaultLocationProps?.center}
          defaultZoom={defaultLocationProps?.zoom}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          disableDoubleClickZoom={true}
          scaleControl={true}
          className="w-full h-[650px] absolute outline-none border-none active:border-none"
          defaultTilt={10}
        >
          {data?.data?.map((garage) => {
            return (
              <AdvancedMarker
                key={garage?.id}
                position={{
                  lat: Number(garage?.lat),
                  lng: Number(garage?.long),
                }}
                onClick={() => navigate(`/view-garage/${garage?.id}/details`)}
              >
                <div
                  data-auto={`garage-pin-googleMapForGarages`}
                  data-tip={garage?.name}
                  className={`relative tooltip tooltip-top tooltip-base-300`}
                >
                  <img
                    src="/assets/Map/garagepin.png"
                    className={`w-12`}
                    alt={garage?.name}
                  />
                </div>
              </AdvancedMarker>
            );
          })}
        </Map>
      )}
    </div>
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
