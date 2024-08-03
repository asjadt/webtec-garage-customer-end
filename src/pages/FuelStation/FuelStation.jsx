import React, { useState } from "react";
import CustomTab from "../../components/CustomTab";
import FuelStationList from "./FuelStationLists";
import Map from "./Components/Map";

const FuelStation = () => {
  const [activeTab, setActiveTab] = useState("map");
  const [tabs, setTabs] = useState([
    { id: "map", title: "Map" },
    { id: "list", title: "List" },
  ]);
  return (
    <div>
      <div className={`flex justify-center my-10`}>
        <CustomTab
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          gridCol="grid-cols-2"
        />
      </div>
      <div>
        {activeTab === "map" && <Map />}
        {activeTab === "list" && <FuelStationList />}
      </div>
    </div>
  );
};

export default FuelStation;
