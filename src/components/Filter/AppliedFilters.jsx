import { RxCrossCircled } from "react-icons/rx";
import { formatRole } from "../../utils/formatRole";

export default function AppliedFilters({ filters, setFilters }) {
  return (
    <div className={`flex-wrap`}>
      {filters.filter(
        (f) =>
          (f?.defaultValue !== undefined && f.defaultValue !== "") ||
          (f?.defaultSelectedValues !== undefined &&
            f?.defaultSelectedValues?.length > 0)
      )?.length > 0 ? (
        <span className={`text-lg font-semibold`}>Filters: </span>
      ) : (
        ""
      )}
      <br />
      {filters
        .filter(
          (f) =>
            (f?.defaultValue !== undefined && f.defaultValue !== "") ||
            (f?.defaultSelectedValues !== undefined &&
              f?.defaultSelectedValues?.length > 0)
        )
        .map((f, i) => (
          <span
            key={i}
            className={`bg-primary-content cursor-pointer z-10 px-5  py-[0.25rem] border-2 border-primary text-primary rounded-lg my-1 mx-1 inline-flex gap-2 items-center`}
          >
            {formatRole(f?.label)}:{" "}
            {f?.defaultValue !== undefined
              ? f?.defaultValue
              : f?.options
                  ?.filter((opt) =>
                    f?.defaultSelectedValues.some((dv) => opt?.value === dv)
                  )
                  ?.map((opt) => opt?.label)
                  ?.join(", ")}
            <button
              data-auto={`applied-filters-delete-button-all-page`}
              onClick={() => {
                setFilters((prev) => ({
                  ...prev,
                  [f?.id]: "",
                }));
              }}
            >
              <RxCrossCircled
                className={`text-primary text-xl hover:bg-red-500 rounded-full hover:text-base-300`}
              />
            </button>
          </span>
        ))}
    </div>
  );
}
