import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import CustomToaster from "../components/CustomToaster";
import { handleApiError } from "../utils/apiErrorHandler";

export default function useWorkLocations({
  is_active = ""
} = {} /* default value empty object if not pass any parameter */
) {
  // database query key
  const queryParams = new URLSearchParams({
    is_active,
  });
  const workLocationsQuery = useQuery(
    {
      queryKey: ["work-locations"],
      queryFn: async ({ signal }) => {
        const config = {
          signal,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
        const { data } = await axios.get(
          `/v1.0/work-locations?${queryParams}`,
          config
        );
        return data;
      },
      select: (data) =>
        data?.length > 0
          ? data?.map((workSite) => ({
            ...workSite,
            id: workSite?.id,
            label: workSite?.name,
            is_default: workSite?.is_default,
            business_id: workSite?.business_id,
            latitude: workSite?.latitude,
            longitude: workSite?.longitude,
            max_radius: workSite?.max_radius,
            is_location_enabled: workSite?.is_location_enabled,
            is_geo_location_enabled: workSite?.is_geo_location_enabled,
            ip_address: workSite?.ip_address,
          }))
          : [],
    }
  );

  if (workLocationsQuery.isError) {
    // const responseError = extractErrorsFromResponse(error);
    // setErrors(responseError);
    console.log({ error: workLocationsQuery.error });
    handleApiError(workLocationsQuery.error, "#00144");
  }

  return workLocationsQuery;
}
