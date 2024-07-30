import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { handleApiError } from '../utils/apiErrorHandler';
import toast from 'react-hot-toast';
import CustomToaster from '../components/CustomToaster';
import { useEffect } from 'react';

export default function useJobs() {
    // database query key
    const queryParams = new URLSearchParams();
    const jobsQuery = useQuery(
        {
            queryKey: ["jobs"],
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
                    `/v1.0/job-listings?${queryParams}`,
                    config
                );
                return data;
            },
            select: (resp) =>
                resp.map((data) => ({
                    ...data,
                    id: data?.id,
                    label: data?.title
                })),
        }
    );

    useEffect(() => {
        if (jobsQuery.isError) {
            // const responseError = extractErrorsFromResponse(error);
            // setErrors(responseError);
            console.log(jobsQuery.error);
            
           

            handleApiError(jobsQuery.error, "#00144");
        }
    }, [])

    return jobsQuery;
}
