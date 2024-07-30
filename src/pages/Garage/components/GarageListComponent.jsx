import { motion } from "framer-motion";
import { useData } from "../../../context/DataContext";
import { cardContainerVariant } from "../../../varients/GarageList";
import GarageCard from "./GarageCard";

export default function GarageListComponent() {
  const { garageList, totalGarageFound } = useData();
  return (
    <div className={`w-full h-full overflow-y-auto`}>
      {garageList?.length > 0 ? (
        <motion.div
          variants={cardContainerVariant}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-4`}
        >
          {garageList?.map((garage, index) => (
            <>
              <GarageCard key={index} garage={garage} />
            </>
          ))}
        </motion.div>
      ) : (
        <div>No Garage Found</div>
      )}
    </div>
  );
}
