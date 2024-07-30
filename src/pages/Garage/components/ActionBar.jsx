import { IoIosArrowBack, IoMdClose } from "react-icons/io";
import { useData } from "../../../context/DataContext";

export default function ActionBar({
  isFilterOpen,
  setIsFilterOpen,
  tab,
  setTab,
}) {
  const { totalGarageFound } = useData();
  return (
    <div className={`flex justify-between items-center mb-2`}>
      {/* FILTER TOGGLE BUTTON  */}
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className={`${
          isFilterOpen ? "btn-outline" : ""
        } btn-primary btn btn-sm`}
      >
        {isFilterOpen ? (
          <IoMdClose size={20} />
        ) : (
          <IoIosArrowBack className={`rotate-180`} size={20} />
        )}
        Filter
      </button>

      {/* CREATE JOB  */}
      {tab === "garage" && (
        <button
          onClick={() => {
            setTab("job");
          }}
          className={`btn btn-primary  btn-sm`}
        >
          {tab === "garage" ? "Create Job" : "Garage List"}
        </button>
      )}

      {/* GO TO GARAGE LIST  */}
      {totalGarageFound > 0 && tab === "job" && (
        <button
          onClick={() => {
            setTab("garage");
          }}
          className={`btn btn-primary  btn-sm`}
        >
          Garage List
        </button>
      )}
    </div>
  );
}
