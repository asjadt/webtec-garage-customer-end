import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import CustomToaster from "../components/CustomToaster";
import { handleApiError } from "../utils/apiErrorHandler";

export default function useBusinessTiming({
  isBusinessId
} = {} /* default value empty object if not pass any parameter */
) {
  // FETCH BUSINESS TIMING DATA
  const { data, isError, error, isPending } = useQuery({
    queryKey: ["businessTiming"],
    queryFn: async ({ signal }) => {
      const config = {
        signal,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const { data } = await axios.get(`/v1.0/business-times`, config);
      return data;
    },
    // The query will not execute until the BusinessId exists
    enabled: !!isBusinessId,
  });

  if (isError) {
    if (error.response && error.response.status === 422) {
      const tempErrors = {};
      const responseData = error.response.data;
      if (responseData && responseData.errors) {
        const errors = responseData.errors;
        // Iterate through error keys and map them
        Object.keys(errors).forEach((key) => {
          const errorMessage = errors[key][0]; // Assuming there's only one error message per field
          tempErrors[key] = errorMessage;
        });
      } else {
        console.log(
          "Validation error, but no specific error messages provided."
        );
      }
      // setErrors(tempErrors);
    }


    handleApiError(error, '#00137');






  }

  return { data, error, isPending };
}
