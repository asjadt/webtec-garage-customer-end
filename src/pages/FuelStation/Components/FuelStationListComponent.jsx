import { motion } from "framer-motion";
import { useData } from "../../../context/DataContext";
import FuelStationCard from "./FuelStationCard";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function FuelStationListComponent({
  setTab,
  fetchNextPage,
  hasNextPage,
  isLoading,
  status,
  totalPage,
  currentPage,
}) {
  const { ref, inView } = useInView();

  const { fuelStationList } = useData();
  console.log({ fuelStationList });

  useEffect(() => {
    if (inView && currentPage < totalPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  return (
    <>
      {/* GARAGE LIST  */}
      <div
        data-auto={`container-listComponent`}
        className={`w-full h-full overflow-y-auto`}
      >
        {fuelStationList?.length > 0 ? (
          <>
            <motion.div
              data-auto={`grid-listComponent`}
              variants={gridContainerVariants}
              initial="hidden"
              animate="visible"
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4`}
            >
              {fuelStationList?.map((fuel, index) => (
                <FuelStationCard key={index} fuel={fuel} />
              ))}
            </motion.div>
            {!isLoading && (
              <>
                {currentPage < totalPage ? (
                  <div
                    data-auto={`button-container-listComponent`}
                    ref={ref}
                    className={`flex justify-center items-center mt-5`}
                  >
                    <button
                      data-auto={`loadMore-listComponent`}
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
            data-auto={`noData-container-listComponent`}
            className={`flex justify-center items-center h-[400px] text-xl  flex-col`}
          >
            <img
              data-auto={`noData-image-listComponent`}
              className={`w-32`}
              src="/assets/NoDataFound.svg"
              alt=""
            />
            <span
              data-auto={`noData-message-listComponent`}
              className={`font-medium text-3xl`}
            >
              No Fuel Station Found!
            </span>
          </div>
        )}
      </div>
    </>
  );
}
