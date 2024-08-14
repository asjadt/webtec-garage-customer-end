import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getGaragesV2 } from "../../Apis/garage";
import CustomLoading from "../../components/CustomLoading";
import { useData } from "../../context/DataContext";
import { useGeoLocationData } from "../../context/GeoLocationDataContext";
import { handleApiError } from "../../utils/apiErrorHandler";
import ActionBar from "./components/ActionBar";
import CreateAndUpdateJobForm from "./components/CreateAndUpdateJobForm";
import SelectedFilters from "./components/Filters/SelectedFilters";
import GarageListComponent from "./components/GarageListComponent";
import FilterSideBar from "./components/Filters/FilterSideBar";

export default function GarageList() {
  const { defaultLocationProps, isGeoLocationLoading } = useGeoLocationData();

  const {
    loading,
    homeSearchData,
    setHomeSearchData,
    totalGarageFound,
    setTotalGarageFound,
    setGarageList,
    garageList,
  } = useData();
  const [tab, setTab] = useState("garages"); // ACCEPT "garages" OR "job"
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // GET DATA
  const fetchGarages = async ({ pageParam }) => {
    const filterData = localStorage.getItem("search_data")
      ? JSON.parse(localStorage.getItem("search_data"))
      : homeSearchData;

    return getGaragesV2({
      ...filterData,
      page: pageParam,
      perPage: 10,
    });
  };

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    status,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["all-garages", homeSearchData],
    queryFn: fetchGarages,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      console.log({ lastPage: lastPage?.data?.length });
      return lastPage?.data?.length ? allPages?.length + 1 : undefined;
    },
  });

  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setTotalPage(data?.pages[data?.pages?.length - 1]?.last_page || 0);
    setCurrentPage(data?.pages[data?.pages?.length - 1]?.current_page || 0);
    setTotalGarageFound(data?.pages[0]?.total || 0);
    setGarageList(
      data?.pages?.flatMap((page) => page?.data?.map((item) => item)) || []
    );
  }, [data]);

  // HANDLE ERROR
  useEffect(() => {
    if (isError) {
      handleApiError(error);
    }
  }, [isError]);

  if (loading) {
    return <CustomLoading />;
  } else {
    return (
      <div
        data-auto={`container-garageList`}
        data-cy="dashboard"
        className={`w-full`}
      >
        <div
          data-auto={`sub-container-garageList`}
          className={`relative h-full md:min-h-[calc(100vh-130px)] flex items-start `}
        >
          <div
            data-auto={`filter-container-garageList`}
            className={`fixed md:sticky bg-base-300 left-0 top-20 bottom-0 z-30 md:z-20  ${
              isFilterOpen ? "w-full sm:w-[300px] md:w-[400px]" : "w-0"
            }`}
          >
            {/* FILTERS  */}
            <div
              data-auto={`filter-garageList`}
              className={`scrollbar-none min-h-[calc(100vh-245px)] max-h-[calc(100vh-245px)] md:h-screen overflow-y-auto overflow-x-hidden`}
            >
              <FilterSideBar
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
              />
            </div>
          </div>

          {/* GARAGES OR JOB FORM  */}
          <div
            data-auto={`garages-container-garageList`}
            className={`relative w-full duration-100 `}
          >
            <div
              className={` z-20 bg-base-300 top-0 right-0 w-full px-5 pt-5 pb-2 shadow-md`}
            >
              {/* ACTIONS  */}
              <ActionBar
                tab={tab}
                setTab={setTab}
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
                dataAuto={"garageList"}
              />

              {tab === "garages" && (
                <>
                  {/* SEARCH BAR  */}
                  <div
                    data-auto={`search-container-actionBar`}
                    className={`flex items-center justify-between`}
                  >
                    <div
                      className={`input flex input-primary py-1 pr-1 pl-5 border outline-none focus-visible:outline-none focus-within:outline-none bg-base-300 w-full h-[2.58rem] rounded-lg text-primary`}
                    >
                      <input
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                        }}
                        data-auto={`searchInput-garageList`}
                        type="text"
                        placeholder="Search Here..."
                        className={`w-full bg-transparent outline-none focus-visible:outline-none focus-within:outline-none focus:outline-none`}
                      />
                      <button
                        onClick={() => {
                          setHomeSearchData((prev) => ({
                            ...prev,
                            search_key: searchQuery,
                          }));
                        }}
                        data-auto={`searchButton-garageList`}
                        className={`btn  btn-sm  h-full btn-primary w-24 sm:w-24`}
                      >
                        Search
                      </button>
                    </div>
                  </div>

                  {/* SELECTED FILTERS  */}
                  <div
                    data-auto={`selected-filter-container-actionBar`}
                    className={`pt-[0.5rem]`}
                  >
                    <SelectedFilters />
                  </div>

                  {/* TOTAL GARAGE NUMBER  */}
                  <p
                    data-auto={`totalRestaurant-home`}
                    className={`font-bold pt-1`}
                  >
                    {totalGarageFound}{" "}
                    {totalGarageFound > 1 ? "Garages are" : "Garage is"} found
                  </p>
                </>
              )}
            </div>

            {/* MAIN SECTION  */}
            <div className={`${tab === "garages" ? "pt-5 px-5 " : ""}  pb-5`}>
              {isLoading ? (
                <CustomLoading h="h-[300px]" />
              ) : (
                <div data-auto={`tab-container-actionBar`}>
                  {tab === "garages" && (
                    <GarageListComponent
                      totalPage={totalPage}
                      currentPage={currentPage}
                      setTab={setTab}
                      fetchNextPage={fetchNextPage}
                      hasNextPage={hasNextPage}
                      isLoading={isFetchingNextPage}
                      status={status}
                    />
                  )}
                  {tab === "job" && <CreateAndUpdateJobForm />}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
