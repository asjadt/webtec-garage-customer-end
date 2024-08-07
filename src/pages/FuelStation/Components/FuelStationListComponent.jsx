import { motion } from "framer-motion";
import { useData } from "../../../context/DataContext";
import FuelStationCard from "./FuelStationCard";

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function FuelStationListComponent() {
  const { fuelStations } = useData();
  console.log({ fuelStations });

  return (
    <>
      {/* GARAGE LIST  */}
      <div className={`w-full h-full overflow-y-auto`}>
        {fuelStations?.length > 0 ? (
          <motion.div
            variants={gridContainerVariants}
            initial="hidden"
            animate="visible"
            className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4`}
          >
            {fuelStations?.map((fuel, index) => (
              <FuelStationCard key={index} fuel={fuel} />
            ))}
          </motion.div>
        ) : (
          <div className={`flex justify-center items-center h-[400px] text-xl`}>
            No Fuel Station Found!
          </div>
        )}
      </div>
    </>
  );
}
