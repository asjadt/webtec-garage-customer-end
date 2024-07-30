import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { handleApiError } from '../utils/apiErrorHandler';

export default function useJobPlatforms({
    is_active = '',
    job_listing_id = ''
} = {} /* default value empty object if not pass any parameter */
) {
    // database query key
    const queryParams = new URLSearchParams(Object.fromEntries(Object.entries(
        {
            is_active,
            job_listing_id,
        }
    ).filter(([key, value]) => value)
    ));
    const jobPlatforms = useQuery(
        {
            queryKey: ["job-Platforms"],
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
                    `/v1.0/job-platforms?${queryParams}`,
                    config
                );
                return data;
            },
            select: (data) =>
                data.map((jobPlatforms) => ({
                    ...jobPlatforms,
                    id: jobPlatforms?.id,
                    label: jobPlatforms?.name,
                })),
        }
    );

    if (jobPlatforms.isError) {
        // const responseError = extractErrorsFromResponse(error);
        // setErrors(responseError);
        console.log({ error: jobPlatforms.error });

        handleApiError(jobPlatforms.error, "#00144");
    }

    return jobPlatforms;
}


