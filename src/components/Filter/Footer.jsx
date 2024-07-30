export default function Footer({
  handleClear,
  handleApplyAllFilters,
  totalResult = 0,
}) {
  return (
    <div
      style={{
        boxShadow: "0px -2px 10px #eee",
      }}
      className={`py-2 px-2 flex justify-between items-center z-20`}
    >
      <button
        data-auto={`footer-clear-all-button-all-page`}
        onClick={handleClear}
        className={`btn btn-sm md:btn-md btn-error`}
      >
        Clear All
      </button>
      <span className={`text-sm md:text-md text-gray-400 w-full text-center`}>
        Total {totalResult} Result Found
      </span>
      <button
        data-auto={`footer-apply-all-button-all-page`}
        onClick={handleApplyAllFilters}
        className={`btn btn-sm md:btn-md btn-primary`}
      >
        Apply Filters
      </button>
    </div>
  );
}
