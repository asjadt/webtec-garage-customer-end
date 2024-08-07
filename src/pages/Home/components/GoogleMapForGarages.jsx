import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import { GiMechanicGarage } from "react-icons/gi";
import { useData } from "../../../context/DataContext";
import { Map, Marker } from "@vis.gl/react-google-maps";
import { CustomMarker } from "../../../components/Map/CustomMarker";

export default function GoogleMapForGarages({ defaultProps }) {
  const [isGarageLoading, setIsGarageLoading] = useState(true);
  const [garages, setGarages] = useState([]);

  useEffect(() => {
    setIsGarageLoading(true);
    setTimeout(() => {
      setIsGarageLoading(false);
      setGarages([
        {
          id: 1,
          name: "Lotus Repair",
          lat: 23.545032,
          lng: 90.502479,
        },
        {
          id: 2,
          name: "Badol Repair",
          lat: 23.539707,
          lng: 90.116769,
        },
        {
          id: 3,
          name: "Karim Repair",
          lat: 23.605743,
          lng: 90.143355,
        },
        {
          id: 4,
          name: "Falcon Repair",
          lat: 23.602128,
          lng: 90.324357,
        },
      ]);
    }, 5000);
  }, []);

  return (
    <>
      {isGarageLoading ? (
        <div className="w-full h-[400px] absolute outline-none border-none active:border-none bg-slate-300 animate-pulse"></div>
      ) : (
        <Map
          // style={{ width: "100%", height: "00px", position: "absolute" }}
          defaultCenter={{ lat: 23.7993984, lng: 90.3839744 }}
          defaultZoom={8}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          disableDoubleClickZoom={true}
          scaleControl={true}
          className="w-full h-[400px] absolute outline-none border-none active:border-none"
          defaultTilt={10}
        >
          {garages?.map((garage) => (
            <Marker
              key={garage?.id}
              position={{ lat: garage?.lat, lng: garage?.lng }}
            />
          ))}
        </Map>
      )}
    </>
    // <>
    //   {defaultProps?.center?.lat !== undefined &&
    //     defaultProps?.center?.lng !== undefined && (
    //       <div
    //         className={`h-[400px] md:h-[400px]`}
    //         style={{
    //           width: "100%",
    //           border: 0,
    //           position: "absolute",
    //         }}
    //       >
    //         <GoogleMapReact
    //           bootstrapURLKeys={{
    //             key: `${import.meta.env.VITE_REACT_APP_GOOGLE}`,
    //           }}
    //           defaultCenter={defaultProps?.center}
    //           defaultZoom={defaultProps?.zoom}
    //         >
    //           <AnyReactComponent lat={23.696998} lng={90.463029} text="" />
    //           <AnyReactComponent
    //             lat={23.69857967439486}
    //             lng={90.46072229726585}
    //             text={""}
    //           />
    //         </GoogleMapReact>
    //       </div>
    //     )}
    // </>
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
