import { IoIosArrowBack, IoMdClose } from "react-icons/io";

export default function ActionBar({ isFilterOpen, setIsFilterOpen, dataAuto }) {
  return (
    <div
      data-auto={`container-actionBar-${dataAuto}`}
      className={`flex justify-start items-center mb-2`}
    >
      {/* FILTER TOGGLE BUTTON  */}
      <button
        data-auto={`filter-actionBar-${dataAuto}`}
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
    </div>
  );
}
