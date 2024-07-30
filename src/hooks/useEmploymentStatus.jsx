import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react'
import { handleApiError } from '../utils/apiErrorHandler';

export default function useEmploymentStatus({
    is_active = ''
} = {} /* default value empty object if not pass any parameter */
) {
    // database query key
    const queryParams = new URLSearchParams(Object.fromEntries(Object.entries({
        is_active,
    }).filter(([key, value]) => value)));
    //

    const queryClient = useQueryClient();
    const employmentStatus = useQuery({
        queryKey: ["employment-status"],

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
                `/v1.0/employment-statuses?${queryParams}`,
                config
            );
            return response.data;
        },
        select: (resp) =>
            resp.map((data) => ({
                ...data,
                id: data?.id,
                label: data?.name
            })),
    });

    useEffect(() => {
        if (employmentStatus.isError) {
            const error = employmentStatus.error;

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
                queryKey: ["employment-status"],
            });
        };
    }, []);

    return employmentStatus;
}
