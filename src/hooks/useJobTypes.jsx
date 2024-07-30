import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { handleApiError } from '../utils/apiErrorHandler';

export default function useJobTypes({
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
    const jobTypes = useQuery(
        {
            queryKey: ["job-types"],
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
                    `/v1.0/job-types?${queryParams}`,
                    config
                );
                return data;
            },
            select: (data) =>
                data.map((jobTypes) => ({
                    ...jobTypes,
                    id: jobTypes?.id,
                    label: jobTypes?.name,
                })),
        }
    );

    if (jobTypes.isError) {
        // const responseError = extractErrorsFromResponse(error);
        // setErrors(responseError);
        console.log({ error: jobTypes.error });

        handleApiError(jobTypes.error, "#00144");
    }

    return jobTypes;
}

