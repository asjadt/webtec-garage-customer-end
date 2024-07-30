import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { handleApiError } from "../utils/apiErrorHandler";

export default function useRecruitmentProcess({
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

  const recruitmentProcess = useQuery({
    queryKey: ["recruitment-process"],
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
        `/v1.0/recruitment-processes?${queryParams}`,
        config
      );
      return data;
    },
    select: (data) =>
      data.map((recruitment) => ({
        ...recruitment,
        id: recruitment?.id,
        label: recruitment?.name,
      })),
  }
  );

  if (recruitmentProcess.isError) {
    // const responseError = extractErrorsFromResponse(error);
    // setErrors(responseError);
    console.log({ error: recruitmentProcess.error });

    handleApiError(recruitmentProcess.error, "#00144");
  }

  return recruitmentProcess;
}
