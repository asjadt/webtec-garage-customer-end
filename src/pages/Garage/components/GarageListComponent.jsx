import { motion } from "framer-motion";
import { useData } from "../../../context/DataContext";
import GarageCard from "./GarageCard";

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function GarageListComponent({ setTab }) {
  const { garageList, fuelStations } = useData();

  return (
    <>
      {/* GARAGE LIST  */}
      <div className={`w-full h-full overflow-y-auto`}>
        {garageList?.length > 0 ? (
          <motion.div
            variants={gridContainerVariants}
            initial="hidden"
            animate="visible"
            className={`grid grid-cols-1 xl:grid-cols-2 gap-4`}
          >
            {garageList?.map((garage, index) => (
              <GarageCard key={index} garage={garage} />
            ))}
          </motion.div>
        ) : (
          <div
            className={`flex justify-center items-center h-[400px] text-xl  flex-col`}
          >
            <img className={`w-32`} src="/assets/NoDataFound.svg" alt="" />
            <span className={`font-medium text-3xl`}>No Garage Found!</span>
            <button
              onClick={() => {
                setTab("job");
              }}
              className={`btn btn-primary  btn-sm mt-5`}
            >
              Create Job
            </button>
          </div>
        )}
      </div>
    </>
  );
}
