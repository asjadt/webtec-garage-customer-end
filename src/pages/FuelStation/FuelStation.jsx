import React, { useState } from "react";
import CustomTab from "../../components/CustomTab";
import FuelStationList from "./FuelStationLists";
import Map from "./Components/FuelStationMap";
import Headings from "../../components/Headings/Headings";
import FuelStationMap from "./Components/FuelStationMap";

const FuelStation = () => {
  const [activeTab, setActiveTab] = useState("map");
  const [tabs, setTabs] = useState([
    { id: "map", title: "Map" },
    { id: "list", title: "List" },
  ]);
  return (
    <div>
      <div className={`flex flex-col justify-center items-center py-10 gap-10`}>
        <h1 className={`text-2xl font-bold text-primary`}>Fuel Stations</h1>
        <CustomTab
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          gridCol="grid-cols-2"
        />
      </div>
      <div>
        {activeTab === "map" && <FuelStationMap />}
        {activeTab === "list" && <FuelStationList />}
      </div>
    </div>
  );
};

export default FuelStation;