import { motion } from "framer-motion";
import { useData } from "../../../context/DataContext";
import GarageCard from "./GarageCard";
import { useEffect } from "react";
import GarageCardLoading from "./GarageCardLoading";
import { useInView } from "react-intersection-observer";

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function GarageListComponent({
  setTab,
  fetchNextPage,
  hasNextPage,
  isLoading,
  status,
  totalPage,
  currentPage,
}) {
  const { ref, inView } = useInView();
  const { garageList, fuelStationList } = useData();

  useEffect(() => {
    if (inView && currentPage < totalPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  return (
    <>
      {/* GARAGE LIST  */}
      <div
        data-auto={`container-garageListComponent`}
        className={`w-full h-full`}
      >
        {garageList?.length > 0 ? (
          <>
            <motion.div
              data-auto={`card-container-garageListComponent`}
              variants={gridContainerVariants}
              initial="hidden"
              animate="visible"
              className={`grid grid-cols-1 xl:grid-cols-3 gap-4`}
            >
              {garageList?.map((garage, index) => (
                <GarageCard key={index} garage={garage} />
              ))}
              {isLoading && (
                <>
                  <GarageCardLoading />
                  <GarageCardLoading />
                </>
              )}
            </motion.div>

            {!isLoading && (
              <>
                {currentPage < totalPage ? (
                  <div
                    data-auto={`button-garageListComponent`}
                    ref={ref}
                    className={`flex justify-center items-center mt-5`}
                  >
                    <button
                      data-auto={`loadMore-garageListComponent`}
                      className={`btn btn-sm btn-primary`}
                      onClick={() => fetchNextPage()}
                    >
                      load more
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </>
            )}
          </>
        ) : (
          <div
            data-auto={`createJob-container-garageListComponent`}
            className={`flex justify-center items-center h-[400px] text-xl  flex-col`}
          >
            <img className={`w-32`} src="/assets/NoDataFound.svg" alt="" />
            <span
              data-auto={`noGarage-garageListComponent`}
              className={`font-medium text-3xl`}
            >
              No Garage Found!
            </span>
            <button
              data-auto={`createJob-garageListComponent`}
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
