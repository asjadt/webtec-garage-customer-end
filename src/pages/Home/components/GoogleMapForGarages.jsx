import { useQuery } from "@tanstack/react-query";
import { AdvancedMarker, Map, Pin } from "@vis.gl/react-google-maps";
import { GiHomeGarage, GiMechanicGarage } from "react-icons/gi";
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
        <div className="w-full h-[650px] absolute outline-none border-none active:border-none bg-slate-300 animate-pulse"></div>
      ) : (
        <Map
          mapId={"ed79aa93f40c730c"}
          defaultCenter={{ lat: 23.7993984, lng: 90.3839744 }}
          defaultZoom={8}
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
