import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import CustomToaster from "../components/CustomToaster";
import { handleApiError } from "../utils/apiErrorHandler";

export default function useEmployee({
  role = "",
  not_in_rota,
  is_active
} = {} /* default value empty object if not pass any parameter */
) {
  const allRoles = Array.isArray(role) ? role.join(",") : role;
  // database query key
  const queryParams = new URLSearchParams({
    role: allRoles || "",
    is_active: is_active || 1,
    not_in_rota: not_in_rota || "",
  }).toString();
  const { data, error, isError, isLoading, isPending, isRefetching } = useQuery(
    {
      queryKey: ["employees"],
      queryFn: async ({ signal }) => {
        const config = {
          signal: signal,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
        const resp = await axios.get(`/v1.0/users?${queryParams}`, config);
        return resp.data;
      },
      select: (data) =>
        data?.map((employees) => ({
          ...employees,
          id: employees?.id,
          label: `${employees?.first_Name} ${employees?.middle_Name ? employees?.middle_Name : ""
            } ${employees?.last_Name}`,
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
