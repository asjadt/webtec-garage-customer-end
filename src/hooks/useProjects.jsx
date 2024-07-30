import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import CustomToaster from "../components/CustomToaster";
import { formatRole } from "../utils/formatRole";
import { handleApiError } from "../utils/apiErrorHandler";

export default function useProjects({
  is_active,
  start_date = "",
  end_date = "",
  search_key = "",
  order_by = "",
  in_date = "",
  user_id = "",
  name = "",
  status = "",
} = {} /* default value empty object if not pass any parameter */
) {

  // database query key
  const queryParams = new URLSearchParams(Object.fromEntries(Object.entries(
    {
      is_active,
      start_date,
      end_date,
      search_key,
      order_by,
      in_date,
      user_id,
      name,
      status,
    }
  ).filter(([key, value]) => value !== undefined && value !== "" && value !== null)
  ));
  const { data, error, isError, isLoading, isPending, isRefetching } = useQuery(
    {
      queryKey: ["projects"],
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
          `/v1.0/projects?${queryParams}`,
          config
        );
        return resp.data;
      },
      select: (data) =>
        data?.map((element) => ({
          ...element,
          id: element?.id,
          label: formatRole(element?.name),
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
