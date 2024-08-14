import React, { useEffect, useState } from "react";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { RiMapPinLine } from "react-icons/ri";
import CustomTab from "../../components/CustomTab";
import FuelStationMap from "./Components/FuelStationMap";
import FuelStationList from "./FuelStationList";
import { useData } from "../../context/DataContext";
import { calculateLatLongBounds } from "../../utils/map";
import { useGeoLocationData } from "../../context/GeoLocationDataContext";
import CustomLoading from "../../components/CustomLoading";

const FuelStation = () => {
  const [activeTab, setActiveTab] = useState("map");
  const { location, isGeoLocationLoading } = useGeoLocationData();

  const { fuelStationSearchData, setFuelStationFilterDataToLocalStorage } =
    useData();

  useEffect(() => {
    if (!isGeoLocationLoading) {
      if (fuelStationSearchData?.address) {
        const distanceData = calculateLatLongBounds({
          lat: fuelStationSearchData?.lat,
          lon: fuelStationSearchData?.long,
          radiusInKm: 3,
        });
        setFuelStationFilterDataToLocalStorage({
          ...fuelStationSearchData,
          lat: fuelStationSearchData?.lat, //DONE
          long: fuelStationSearchData?.long, //DONE
          start_lat: distanceData?.minLat, //DONE
          end_lat: distanceData?.maxLat, //DONE
          start_long: distanceData?.minLon, //DONE
          end_long: distanceData?.maxLon, //DONE
        });
      } else {
        setFuelStationFilterDataToLocalStorage({
          ...fuelStationSearchData,
          lat: location?.latitude, //DONE
          long: location?.longitude, //DONE
          start_lat: "", //DONE
          start_long: "", //DONE
        });
      }
    }
  }, [location, isGeoLocationLoading]);
  const [tabs, setTabs] = useState([
    { id: "map", title: "Map", Icon: RiMapPinLine },
    { id: "list", title: "List", Icon: MdOutlineFormatListBulleted },
  ]);

  if (isGeoLocationLoading) {
    return <CustomLoading />;
  }
  return (
    <div>
      <div className={`flex flex-col justify-center items-center pt-10 gap-7`}>
        <h1 className={`text-2xl font-bold text-primary leading-3`}>
          Fuel Stations
        </h1>
        <CustomTab
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          gridCol="grid-cols-2"
        />
      </div>
      <div>
        {activeTab === "map" && <FuelStationMap setActiveTab={setActiveTab} />}
        {/* {activeTab === "list" && <FuelStationLists />} */}
        {activeTab === "list" && <FuelStationList />}
      </div>
    </div>
  );
};

export default FuelStation;
