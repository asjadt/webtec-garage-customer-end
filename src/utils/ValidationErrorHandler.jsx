import CustomToaster from "../components/CustomToaster";
import toast from "react-hot-toast";

export const ValidationErrorHandler = (validationErrors) => {
  if (Object.keys(validationErrors).length !== 0) {
    toast.custom((t) => (
      <CustomToaster
        t={t}
        type={"error"}
        errors={{
          validationErrors: Object.entries(validationErrors).map((error, i) => {
            if (Array.isArray(error[1])) {
              return Object.entries(error[1][0])
                ?.filter((error2, j) => error2[0] !== "id")
                ?.map((error2, j) => error2[1])
                ?.join(" & ");
            } else {
              return error[1];
            }
          }),
        }}
        text={`You are submitting invalid data`}
      />
    ));
  }
};
