import React, { useState } from "react";
import CustomTab from "../../components/CustomTab";
import FuelStationList from "./FuelStationLists";
import Map from "./Components/FuelStationMap";
import Headings from "../../components/Headings/Headings";
import FuelStationMap from "./Components/FuelStationMap";
import { RiMapPinLine } from "react-icons/ri";
import { FaListUl } from "react-icons/fa";
import { MdOutlineFormatListBulleted } from "react-icons/md";

const FuelStation = () => {
  const [activeTab, setActiveTab] = useState("map");
  const [tabs, setTabs] = useState([
    { id: "map", title: "Map", Icon: RiMapPinLine },
    { id: "list", title: "List", Icon: MdOutlineFormatListBulleted },
  ]);
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
        {activeTab === "list" && <FuelStationList />}
      </div>
    </div>
  );
};

export default FuelStation;
