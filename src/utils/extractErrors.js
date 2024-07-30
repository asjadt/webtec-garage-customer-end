export const extractErrorsFromResponse = (error) => {
    if (error.response && error.response.status === 422) {
        if (error.response.data && error.response.data.errors) {
            const errors = error.response.data.errors;
            return Object.fromEntries(
                Object.entries(errors).map(([key, value]) => [key, value[0]])
            );
        }
    }
    return {};
};
