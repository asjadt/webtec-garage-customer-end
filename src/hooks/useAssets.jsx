import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { handleApiError } from "../utils/apiErrorHandler";

export default function useAssets({
  not_in_user_id = 0,
  isUpdated = 0,
  status = '' } = {} /* default value empty object if not pass any parameter */
) {

  // database query key
  const queryParams = new URLSearchParams(Object.fromEntries(Object.entries({
    not_in_user_id,
    status,
  }).filter(([key, value]) => value)));
  //

  const queryClient = useQueryClient();
  const assetsQuery = useQuery({
    queryKey: ["assets", isUpdated],

    queryFn: async () => {
      const jwt = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      };

      const response = await axios.get(
        `/v1.0/user-assets?${queryParams}`,
        config
      );
      return response.data;
    },
    select: (resp) => {
      const assetLabels = resp.map((asset) => ({
        id: asset?.id,
        label: `${asset?.serial_number}-${asset?.name}-${asset?.code}`,
      }));
      return assetLabels;
    },
  });

  useEffect(() => {
    if (assetsQuery.isError) {
      const error = assetsQuery.error;

      if (error.response && error.response.status === 422) {
        const tempErrors = {};
        const responseData = error.response.data;
        if (responseData && responseData.errors) {
          const errors = responseData.errors;
          // Iterate through error keys and map them
          Object.keys(errors).forEach((key) => {
            const errorMessage = errors[key][0]; // Assuming there's only one error message per field
            tempErrors[key] = errors[key][0];
          });
        } else {
          console.log(
            "Validation error, but no specific error messages provided."
          );
        }

        // setErrors(tempErrors);
      }
      handleApiError(error, "#00121");
    }

    return () => {
      queryClient.cancelQueries({
        queryKey: ["assets"],
      });
    };
  }, []);

  return assetsQuery;
}
