import { useState } from "react";
import CustomTab from "../../components/CustomTab";
import Customer from "./components/Registration/Customer/Customer";
import GarageOwner from "./components/Registration/GarageOwner/GarageOwner";

export default function Register() {
  const [activeTab, setActiveTab] = useState("customer");
  const registrationTabs = [
    { id: "customer", title: "As a customer" },
    { id: "garage_owner", title: "As a garage owner" },
  ];
  return (
    <div className={`mt-5 h-full`}>
      {/* TABS  */}
      <div className={`w-full flex justify-center items-center mb-5`}>
        <CustomTab
          gridCol={`grid-cols-2`}
          tabs={registrationTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      <>
        {!!(activeTab === "customer") && <Customer />}
        {!!(activeTab === "garage_owner") && <GarageOwner />}
      </>
    </div>
  );
}
