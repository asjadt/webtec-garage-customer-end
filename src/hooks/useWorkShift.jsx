import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import CustomToaster from "../components/CustomToaster";
import { handleApiError } from "../utils/apiErrorHandler";

export default function useWorkShift({
  is_active = ""
} = {} /* default value empty object if not pass any parameter */
) {
  // database query key
  const queryParams = new URLSearchParams({
    is_active,
  });
  const { data, error, isError, isLoading, isPending, isRefetching } = useQuery(
    {
      queryKey: ["work-shifts"],
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
          `/v1.0/work-shifts?${queryParams}`,
          config
        );
        return data;
      },
      select: (data) =>
        data.map((workShift) => ({
          ...workShift,
          id: workShift?.id,
          label: workShift?.name,
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
