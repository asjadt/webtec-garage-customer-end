import CustomToaster from "../components/CustomToaster";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export const handleApiError = (error, errorId = "#00143") => {
  let errorMessage = "An unexpected error occurred";
  let errors = [];

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    errorMessage =
      error.response.data?.message || "Server responded with an error";
    errors = error.response.data?.errors || [];
  } else if (error.request) {
    // The request was made but no response was received
    errorMessage = "No response received from the server";
  } else {
    // Something happened in setting up the request that triggered an Error
    errorMessage = error.message || "Error in setting up request";
  }

  if (error.code === "ECONNABORTED") {
    // Network error specific handling
    errorMessage =
      "A network error occurred. Please check your internet connection and try again.";
  }
  if (error.request && error.code !== "ECONNABORTED" && !error.response) {
    return;
  }

  if (error?.response?.status >= 400 && error?.response?.status < 500) {
    Swal.fire({
      title: "Warning!",
      text: error.response.data?.message,
      icon: "warning",
    });
  } else {
    toast.custom((t) => (
      <CustomToaster
        t={t}
        type={"error"}
        text={`ID: ${errorId} - ${errorMessage}`}
        errors={errors}
      />
    ));
  }
};
