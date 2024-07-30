import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import CustomToaster from "../components/CustomToaster";
import { handleApiError } from "../utils/apiErrorHandler";

export default function useDesignations({
  is_active = 1
} = {} /* default value empty object if not pass any parameter */
) {
  // database query key
  const queryParams = new URLSearchParams(Object.fromEntries(Object.entries(
    {
      is_active,
    }
  ).filter(([key, value]) => value)
  ));
  const designationsQuery = useQuery(
    {
      queryKey: ["designations"],
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
          `/v1.0/designations?${queryParams}`,
          config
        );
        return data;
      },
      select: (data) =>
        data.map((designation) => ({
          ...designation,
          id: designation?.id,
          label: designation?.name,
        })),
    }
  );

  if (designationsQuery.isError) {
    // const responseError = extractErrorsFromResponse(error);
    // setErrors(responseError);
    console.log({ error: designationsQuery.error });

    handleApiError(designationsQuery.error, "#00144");
  }

  return designationsQuery;
}
