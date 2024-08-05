import React, { useState } from "react";
import CustomTab from "../../components/CustomTab";
import FuelStationList from "./FuelStationLists";
import Map from "./Components/Map";
import Headings from "../../components/Headings/Headings";

const FuelStation = () => {
  const [activeTab, setActiveTab] = useState("map");
  const [tabs, setTabs] = useState([
    { id: "map", title: "Map" },
    { id: "list", title: "List" },
  ]);
  return (
    <div>
      <div className={`flex flex-col justify-center items-center my-10 gap-10`}>
        <Headings level={1} className={"text-primary"}>
          Fuel Stations
        </Headings>
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
