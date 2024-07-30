import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import { GiMechanicGarage } from "react-icons/gi";
import { useData } from "../../../context/DataContext";

export default function GoogleMapForGarages({ defaultProps }) {
  return (
    <>
      {defaultProps?.center?.lat !== undefined &&
        defaultProps?.center?.lng !== undefined && (
          <div
            className={`h-[400px] md:h-[400px]`}
            style={{
              width: "100%",
              border: 0,
              position: "absolute",
            }}
          >
            <GoogleMapReact
              bootstrapURLKeys={{
                key: `${import.meta.env.VITE_REACT_APP_GOOGLE}`,
              }}
              defaultCenter={defaultProps?.center}
              defaultZoom={defaultProps?.zoom}
            >
              <AnyReactComponent lat={23.696998} lng={90.463029} text="" />
              <AnyReactComponent
                lat={23.69857967439486}
                lng={90.46072229726585}
                text={""}
              />
            </GoogleMapReact>
          </div>
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
