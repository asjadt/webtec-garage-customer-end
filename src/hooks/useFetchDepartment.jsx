import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CustomToaster from "../components/CustomToaster";
import axios from "axios";
import { handleApiError } from "../utils/apiErrorHandler";

export default function useFetchDepartment({ isBusinessId }) {
  const [departmentLabel, setDepartmentLabel] = useState([]);
  // error state
  const [departmentErrors, setDepartmentErrors] = useState({});

  // fetching data
  const { data, isPending, error, isError } = useQuery({
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
      const { data } = await axios.get(`/v1.0/departments`, config);
      return data;
    },
    // The query will not execute until the businessId exists
    enabled: !!isBusinessId,
  });

  useEffect(() => {
    if (data) {
      setDepartmentLabel(
        data.map((department) => ({
          id: department?.id,
          label: department?.name,
        }))
      );
    }
  }, [data]);

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

      setDepartmentErrors(tempErrors);
    }

    handleApiError(error, "#00144");
  }

  // console.log("departmentLabel", departmentLabel);

  return {
    data,
    departmentLabel,
    departmentErrors,
    isPending,
    error,
  };
}
