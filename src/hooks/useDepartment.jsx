import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { handleApiError } from "../utils/apiErrorHandler";

export function useDepartment(
  {
    is_active = "",
    not_in_rota = ""
  } = {} /* default value empty object if not pass any parameter */
) {
  // database query key
  const queryParams = new URLSearchParams({
    is_active: is_active || 1,
    not_in_rota: not_in_rota || "",
  });
  const { data, error, isError, isLoading, isPending, isRefetching } = useQuery(
    {
      queryKey: ["departments"],
      queryFn: async ({ signal }) => {
        const config = {
          signal,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
        const resp = await axios.get(
          `/v1.0/departments?${queryParams}`,
          config
        );
        return resp.data;
      },
      select: (data) =>
        data.map((department) => ({
          ...department,
          id: department?.id,
          label: department?.name,
        })),
    }
  );

  if (isError) {
    // const responseError = extractErrorsFromResponse(error);
    // setErrors(responseError);
    console.log({ error });

    handleApiError(error, "#00144");
  }

  return { data, error, isError, isLoading, isPending, isRefetching };
}
