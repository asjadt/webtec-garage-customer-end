import { GiMechanicGarage } from "react-icons/gi";

export const GarageLocationIndicator = ({ text }) => (
  <div
    style={{
      position: "absolute",
      top: -25,
      left: -10,
      backgroundColor: "white",
      padding: "5px",
      borderRadius: "5px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      display:'flex',
      justifyContent:'center',
      alignItems:"center",
      flexDirection:'column'
    }}
  >
    <GiMechanicGarage className={`text-3xl`} />
    <p className={`text-left`}>{text}</p>
  </div>
);
